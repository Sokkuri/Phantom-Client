<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div>
        <select @change="$emit('input', selected)" v-model="selected" class="dropdown-component" ref="dropdownElement" multiple />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SelectListItem from "@/common/models/SelectListItem";
import Choices from "choices.js";

@Component
export default class MultiSelectComponent extends Vue {
    @Prop() private searchEnabled!: boolean;
    @Prop() private placeholder!: boolean;
    @Prop() private elements!: SelectListItem[];

    private selected: any[] = [];
    private dropdown: Choices;

    created() {
        // Return preselected elements to the v-model
        this.selected = this.elements.filter(x => x.selected).map(x => x.value);

        if (this.selected.length > 0) {
            this.$emit("input", this.selected);
        }
    }

    mounted() {
        const element: HTMLSelectElement = this.$refs.dropdownElement as HTMLSelectElement;

        if (element) {
            let choices: SelectListItem[] = this.prepareElements();

            this.dropdown = new Choices(element, {
                searchEnabled: this.searchEnabled != undefined ? this.searchEnabled : true,
                choices: choices,
                items: [],
                itemSelectText: "",
                loadingText: "",
                removeItemButton: true
            });
        }
    }

    @Watch("elements") onElementChange() {
        this.dropdown.clearChoices();
        this.dropdown.setChoices(this.prepareElements);
    }

    private prepareElements(): SelectListItem[] {
        let choices = this.elements;

        // Add placeholder when no selected item exists.
        if (this.placeholder && !this.elements.some(x => x.selected)) {
            choices.unshift(new SelectListItem({label: "", value: null, selected: true, disabled: true}))
        }

        return choices;
    }
}
</script>
