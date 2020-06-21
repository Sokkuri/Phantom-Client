<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <select @choice="onSelection" v-model="selected" class="dropdown-component" ref="dropdownElement" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SelectListItem from "@/common/models/SelectListItem";
import Choices from "choices.js";
import _ from "lodash";

@Component
export default class SelectComponent extends Vue {
    @Prop({default: true}) private searchEnabled!: boolean;
    @Prop({default: false}) protected multiple!: boolean;
    @Prop() private placeholder!: boolean;
    @Prop() private elements!: SelectListItem[];

    private selected: any = null;
    private dropdown: Choices;

    mounted() {
        const element: HTMLSelectElement = this.$refs.dropdownElement as HTMLSelectElement;
        element.multiple = this.multiple;

        if (element) {
            let choices: SelectListItem[] = this.prepareElements();

            this.dropdown = new Choices(element, {
                searchEnabled: this.searchEnabled,
                choices: choices,
                items: [],
                itemSelectText: "",
                loadingText: "",
                removeItemButton: this.multiple
            });
        }

        // When elements are present on creation then map the selection and add it to the v-model.
        if (this.elements.length > 0) {
            this.mapElementSelectionToSelection();
            this.$emit("input", this.selected);
        }
    }

    @Watch("elements") onElementChange() {
        this.mapElementSelectionToSelection();
        this.updateChoices(this.updateElementSelection(this.elements));
    }

    private mapElementSelectionToSelection() {
        const selectedItems = this.elements.filter(x => x.selected && x.value);

        if (!this.multiple) {
            this.selected = _.first(selectedItems)?.value;
        } else {
            this.selected = selectedItems.map(x => x.value);
        }
    }

    private onSelection() {
        this.$nextTick(() => {
            if (!this.multiple) {
                const updatedElements = this.updateElementSelection(this.elements);
                this.updateChoices(updatedElements);
            }

            this.$emit("input", this.selected);
            this.$emit("selection", this.selected);
        });
    }

    private updateElementSelection(elements: SelectListItem[]): SelectListItem[] {
        let updatedElements: SelectListItem[] = [];

        elements.forEach(x =>{
            if (x.value == this.selected) {
                x.selected = true;
                updatedElements.push(x)
            } else {
                x.selected = false;
                updatedElements.push(x)
            }
        });

        return updatedElements;
    }

    private updateChoices(elements: SelectListItem[]) {
        const newElements = this.prepareElements(elements);

        this.dropdown.clearChoices();
        this.dropdown.setChoices(newElements);
    }

    private prepareElements(elements: SelectListItem[] = this.elements): SelectListItem[] {
        let choices = elements;

        // Add placeholder when there is no selected item.
        if (this.placeholder) {
            if (!choices.some(x => x.selected)) {
                choices.unshift(new SelectListItem({label: "", value: null, selected: true, disabled: true}));

                if (this.dropdown) {
                    this.dropdown.setValue([""]);
                }
            }
        }

        return choices;
    }
}
</script>
