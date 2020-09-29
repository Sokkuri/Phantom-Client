<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="anime-grid-component">
        <div class="columns is-multiline">
            <GridCardComponent
                v-for="entry in entries"
                :key="entry.id"
                :entry="entry"
                :entryType="entryType"
                :columnWidth="columnWidth"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseEntryGrid from "@/components/global/grid/BaseEntryGrid";
import Anime from "@/common/models/Anime";
import AnimeTooltip from "@/common/tooltips/AnimeTooltip";
import GridCardComponent from "@/components/global/grid/GridCardComponent.vue";

@Component({
    components: {
        GridCardComponent
    }
})
export default class AnimeGridComponent extends BaseEntryGrid {
    @Prop() protected entries: Anime[];

    protected entryType: string = "anime";

    protected initTooltips() {
        const elements = document.querySelectorAll("div.anime-grid-component div.tooltip");

        if (elements) {
            new AnimeTooltip(this.entries).createMany(elements);
        }
    }
}
</script>
