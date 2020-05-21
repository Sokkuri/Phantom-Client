<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="columns is-multiline entry-grid">
        <div v-bind:class="elementClasses"
            v-for="pair in pairElements"
            v-bind:key="pair.key">

            <div class="tooltip" v-bind:data-id="pair.value.id">
                <a v-bind:href="'/anime/' + pair.value.id">
                    <img class="image" v-bind:src="'/api/files/' + pair.value.systemFile.name">
                </a>

                <a class="link" v-bind:href="'/anime/' + pair.value.id">{{ pair.key }}</a>
            </div>
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
import Tippy, { Instance } from "tippy.js";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import _ from "lodash";

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

    updated() {
        this.initTooltip();
    }

    @Watch("entries") onElementChange() {
        this.setPairElements();
        this.initTooltip();
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

    private initTooltip() {
        this.$nextTick(() => {
            const entries = this.entries;

            Tippy(document.querySelectorAll("div.entry-grid div div.tooltip"), {
                placement: "right-start",
                allowHTML: true,
                theme: "entryGrid",
                onCreate(instance: Instance) {
                    const id = instance.reference.getAttribute("data-id");
                    const data = entries.find(x => x.id.toString() === id) as BaseEntry;

                    const tags = _.take(data.tags, 3);
                    let tagElements: string = "";

                    tags.forEach(x => {
                        tagElements += `<span class="tag is-rounded">${_.escape(TranslationUtils.translate(x.translationKey))}</span>`;
                    });

                    let template = `
                        <p>${_.escape(TranslationUtils.translate(data.type))}</p>
                        <p>${_.escape(TranslationUtils.translate(data.status))}</p>
                        <div class="tags">${tagElements}</div>`;

                    instance.setContent(template);
                }
            });
        });
    }
}
</script>
