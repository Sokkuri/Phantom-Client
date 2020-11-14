<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="view entry-content-view">
        <div class="container">
            <SpinnerComponent v-if="loading" />
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title">{{ entryTitle.title }}</h1>
                </div>
            </div>
            <div class="columns is-multiline">
                <div class="column is-6"
                    v-for="linkContent in streamLinkages"
                    v-bind:key="linkContent.id">
                    <button class="button is-fullwidth" @click="openExternalLink(linkContent)">{{ linkContent.company.name }}</button>
                </div>
            </div>
            <div class="columns is-multiline"
                v-if="firstEpisode.id">
                <div class="column is-12">
                    <h2 class="subtitle">{{ $t("view.content.firstEpisode") }}</h2>
                </div>
                <div class="column is-12">
                    <VideoComponent v-bind:youtubeUrl="firstEpisode.url" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RequestResult from "@/common/models/RequestResult";
import VideoComponent from "@/components/global/VideoComponent.vue";
import _ from "lodash";
import StringUtils from "@/common/utilities/StringUtils";
import { EntryTitle } from "@sokkuri/common";
import AnimeDataContext from "@/dataContexts/AnimeDataContext";
import EntryUtils from "@/common/utilities/EntryUtils";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import { Content,  Constants } from "@sokkuri/common";

@Component({
    components: {
        SpinnerComponent,
        VideoComponent
    }
})
export default class BaseEntryContentView extends Vue {
    private loading = false;
    private animeDataContext: AnimeDataContext = new AnimeDataContext();

    protected entryId: number;
    private entryTitle: EntryTitle = new EntryTitle();
    private streamLinkages: Content[] = [];
    private firstEpisode: Content = new Content();

    created() {
        this.entryId = +this.$route.params.id;

        if (this.entryId) {
            this.loading = true;

            const getTitles = this.animeDataContext.getTitles(this.entryId);
            getTitles.then(x => {
                if (x.successfully && x.data) {
                    this.entryTitle = EntryUtils.getTitle(x.data);
                }
            });

            const getContents = this.loadContents();
            getContents.then((x: RequestResult<Content[]>) => {
                if (x.successfully && x.data) {
                    this.streamLinkages = x.data.filter(y => StringUtils.equalsIgnoreCase(y.type, Constants.ContentTypes.Streamlinking));

                    const episode = _.first(x.data.filter(y => StringUtils.equalsIgnoreCase(y.type, Constants.ContentTypes.Episode)));

                    if (episode) {
                        this.firstEpisode = episode;
                    }
                }
            });

            Promise.all([ getTitles, getContents ]).finally(() => this.loading = false);
        }
    }

    private openExternalLink(content: Content) {
        window.open(content.url, "_blank");
    }

    protected async loadContents(): Promise<any> {}
}
</script>

