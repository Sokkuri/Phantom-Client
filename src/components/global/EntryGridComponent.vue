<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="columns is-multiline entry-grid">
        <div v-bind:class="elementClasses"
            v-for="pair in pairElements"
            v-bind:key="pair.key">

            <a v-bind:href="'/anime/' + pair.value.id">
                <img class="image" v-bind:src="'/api/files/' + pair.value.systemFile.name">
            </a>

            <a class="link" v-bind:href="'/anime/' + pair.value.id">{{ pair.key }}</a>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import BaseEntry from "@/common/models/BaseEntry";
import KeyValuePair from "@/common/models/KeyValuePair";
import EntryUtils from "@/common/utilities/EntryUtils";
import Constants from "@/common/Constants";
import ImageComponent from "@/components/global/ImageComponent.vue";

@Component({
    components: {
        ImageComponent
    }
})
export default class EntryGridComponent extends Vue {
    @Prop() private colspan!: number;
    @Prop() private entries!: BaseEntry[];

    private elementClasses: string = "";
    private pairElements: KeyValuePair<string, BaseEntry>[] = [];

    mounted() {
        this.elementClasses = `column is-${this.colspan}`;

        this.setPairElements();
    }

    @Watch("entries") onElementChange() {
        this.setPairElements();
    }

    private setPairElements() {
        this.entries.forEach(x => {
            this.pairElements.push(new KeyValuePair<string, BaseEntry>({
                key: EntryUtils.getPrimaryTitle(x.titles, Constants.Languages.German).title,
                value: x
                })
            );
        });
    }
}
</script>
