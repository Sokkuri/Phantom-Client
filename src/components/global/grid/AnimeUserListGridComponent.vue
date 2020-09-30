<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="anime-user-list-grid-component">
        <div class="columns is-multiline">
            <GridCardComponent
                v-for="entry in entries"
                :key="entry.id"
                :entry="entry.anime"
                :entryType="entryType"
                :columnWidth="columnWidth">
                <div class="columns user-list-details">
                    <div class="column is-12">
                        <div class="columns is-mobile">
                            <div class="column is-6" :title="$t('view.profile.animeList.rating')">
                                <font-awesome-icon :icon="['fas', 'star']" />
                                <span>{{ entry.overallRating }}</span>
                            </div>
                            <div class="column is-6" :title="$t('view.profile.animeList.progress')">
                                <p class="is-pulled-right">{{ `${entry.currentEpisode}/${entry.anime.episodes}` }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </GridCardComponent>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import BaseEntryGrid from "@/components/global/grid/BaseEntryGrid";
import Anime from "@/common/models/Anime";
import AnimeTooltip from "@/common/tooltips/AnimeTooltip";
import GridCardComponent from "@/components/global/grid/GridCardComponent.vue";
import UserList from "@/common/models/UserList";
import _ from "lodash";

@Component({
    components: {
        GridCardComponent
    }
})
export default class AnimeUserListGridComponent extends BaseEntryGrid {
    @Prop() protected entries: UserList[];

    protected entryType: string = "anime";

    protected initTooltips() {
        const elements = document.querySelectorAll("div.anime-user-list-grid-component div.tooltip");

        if (elements) {
            new AnimeTooltip(this.entries.map(x => x.anime)).createMany(elements);
        }
    }
}
</script>
