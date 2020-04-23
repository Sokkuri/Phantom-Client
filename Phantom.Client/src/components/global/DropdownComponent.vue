<template>
    <select @change="$emit('selectionChange', $event.target.value)" class="dropdown-component" ref="dropdownElement" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SelectListItem from "@/common/models/SelectListItem";
import Choices from "choices.js";

@Component
export default class DropdownComponent extends Vue {
    @Prop() private searchEnabled!: boolean;
    @Prop() private placeholder!: boolean;
    @Prop() private elements!: SelectListItem[];

    private dropdown: Choices;

    mounted() {
        const element: HTMLSelectElement = this.$refs.dropdownElement as HTMLSelectElement;

        if (element) {
            let choices: SelectListItem[] = this.prepareElements();

            this.dropdown = new Choices(element, {
                searchEnabled: this.searchEnabled != undefined ? this.searchEnabled : true,
                choices: choices,
                items: [],
                itemSelectText: "",
                loadingText: ""
            });
        }
    }

    beforeUpdate() {
        console.log("UPDATE!!!");
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
