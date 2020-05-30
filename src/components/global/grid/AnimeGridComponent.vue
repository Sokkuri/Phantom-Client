<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseEntryGridComponent from "@/components/global/grid/BaseEntryGridComponent.vue";
import Anime from "@/common/models/Anime";
import AnimeTooltip from "@/common/tooltips/AnimeTooltip";

@Component
export default class AnimeGridComponent extends BaseEntryGridComponent {
    @Prop() protected entries!: Anime[];

    protected entryType: string = "anime";

    protected initTooltips() {
        let elements = document.querySelectorAll("div.entry-grid div div.tooltip");

        if (elements) {
            new AnimeTooltip(this.entries).createMany(elements);
        }
    }
}
</script>
