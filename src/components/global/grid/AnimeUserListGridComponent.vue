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
import { Component, Prop } from "vue-property-decorator";
import BaseEntryGrid from "@/components/global/grid/BaseEntryGrid";
import AnimeTooltip from "@/common/tooltips/AnimeTooltip";
import GridCardComponent from "@/components/global/grid/GridCardComponent.vue";
import { UserListEntry } from "@sokkuri/common";

@Component({
    components: {
        GridCardComponent
    }
})
export default class AnimeUserListGridComponent extends BaseEntryGrid {
    @Prop() protected entries: UserListEntry[];

    protected entryType = "anime";

    /*
        ToDo: Investigate later
        The watch for the entries here don't get trigger on a change.
        I think it is because the entries come from a for and this doesn't trigger the watch.
        So I init the tooltips manually here.
    */
    mounted() {
        this.initTooltips();
    }

    protected initTooltips() {
        const elements = this.$el.querySelectorAll("div.grid-card-component div.tooltip");

        if (elements) {
            new AnimeTooltip(this.entries.map(x => x.anime)).createMany(elements);
        }
    }
}
</script>
