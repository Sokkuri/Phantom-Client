<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="grid-card-component" :class="getColumnWidth()">
        <div class="tooltip" :data-id="entry.id">
            <router-link :to="`/${entryType}/${entry.id}`">
                <ImageComponent :fileName="entry.systemFile.name" :viewer="false" />
            </router-link>

            <router-link class="link" :to="`/${entryType}/${entry.id}`">{{ getTitle() }}</router-link>
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import BaseEntry from "@/common/models/BaseEntry";
import EntryUtils from "@/common/utilities/EntryUtils";
import ImageComponent from "@/components/global/ImageComponent.vue";

@Component({
    components: {
        ImageComponent
    }
})
export default class GridCardComponent extends Vue {
    @Prop({ required: true }) private entry: BaseEntry;
    @Prop({ required: true }) private entryType: string;
    @Prop({ required: true }) private columnWidth: number;

    private getTitle() {
        return EntryUtils.getTitle(this.entry.titles).title;
    }

    private getColumnWidth() {
        return `column is-${this.columnWidth}`;
    }
}
</script>
