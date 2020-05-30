<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="columns is-multiline entry-grid">
        <div v-bind:class="elementClasses"
            v-for="content in contents"
            v-bind:key="content.value.id">

            <div class="tooltip" v-bind:data-id="content.value.id">
                <a v-bind:href="'/' + entryType +'/' + content.value.id">
                    <img class="image" v-bind:src="'/api/files/' + content.value.systemFile.name">
                </a>

                <a class="link" v-bind:href="'/' + entryType + '/' + content.value.id">{{ content.key }}</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import BaseEntry from "@/common/models/BaseEntry";
import KeyValuePair from "@/common/models/KeyValuePair";
import EntryUtils from "@/common/utilities/EntryUtils";
import ImageComponent from "@/components/global/ImageComponent.vue";
import TranslationUtils from "@/common/utilities/TranslationUtils";

@Component({
    components: {
        ImageComponent
    }
})
export default class BaseEntryGridComponent extends Vue {
    @Prop() protected colspan!: number;
    @Prop() protected entries!: BaseEntry[];

    protected entryType!: string;

    private elementClasses: string = "";
    private contents: KeyValuePair<string, BaseEntry>[] = [];

    created() {
        this.elementClasses = `column is-${this.colspan}`;
    }

    mounted() {
        this.updateGrid();
    }

    @Watch("entries") onElementChange() {
        this.updateGrid();
    }

    private updateGrid() {
        this.contents = [];

        this.entries.forEach(x => {
            this.contents.push(new KeyValuePair<string, BaseEntry>({
                key: EntryUtils.getTitle(x.titles).title,
                value: x
                })
            );
        });

        this.$nextTick(() => {
            this.initTooltips();
        });
    }

    protected initTooltips() {}
}
</script>
