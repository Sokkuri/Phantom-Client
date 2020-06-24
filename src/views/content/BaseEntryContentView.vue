<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="anime-content">
        <div class="container">
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import RequestResult from "@/common/models/RequestResult";
import Content from "@/common/models/Content";
import Constants from "@/common/Constants";
import VideoComponent from "@/components/global/VideoComponent.vue";
import _ from "lodash";
import StringUtils from "@/common/utilities/StringUtils";
import EntryTitle from "@/common/models/EntryTitle";
import AnimeDataContext from "@/dataContexts/AnimeDataContext";
import EntryUtils from "@/common/utilities/EntryUtils";

@Component({
    components: {
        VideoComponent
    }
})
export default class BaseEntryContentView extends Vue {
    protected entryId: number;
    private entryTitle: EntryTitle = new EntryTitle();
    private streamLinkages: Content[] = [];
    private firstEpisode: Content = new Content();

    created() {
        this.entryId = +this.$route.params.id;

        if (this.entryId) {
            this.getTitles();
            this.filterContents();
        }
    }

    private getTitles() {
        const animeDataContext: AnimeDataContext = new AnimeDataContext();

        animeDataContext.getTitles(this.entryId).then(x => {
            if (x.successfully && x.data) {
                this.entryTitle = EntryUtils.getTitle(x.data);
            }
        });
    }

    private filterContents() {
        this.loadContents().then((x: RequestResult<Content[]>) => {
            if (x.successfully && x.data) {
                this.streamLinkages = x.data.filter(y => StringUtils.equalsIgnoreCase(y.type, Constants.ContentTypes.Streamlinking));

                const episode = _.first(x.data.filter(y => StringUtils.equalsIgnoreCase(y.type, Constants.ContentTypes.Episode)));

                if (episode) {
                    this.firstEpisode = episode;
                }
            }
        });
    }

    private openExternalLink(content: Content) {
        window.open(content.url, "_blank");
    }

    protected async loadContents(): Promise<any> {}
}
</script>

