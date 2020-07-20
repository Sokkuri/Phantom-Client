<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <ValidationProvider
        v-bind:rules="rules"
        v-slot="{ errors }">
        <input @input="onInput()" v-model="value" class="input is-error" v-bind:class="{ errored: errors.length > 0 }" v-bind:type="type" v-bind:maxlength="maxlength" />
    </ValidationProvider>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class InputComponent extends Vue {
    @Prop({default: "text"}) private type: string;
    @Prop({default: 255}) private maxlength: number;
    @Prop({default: ""}) private rules: string;

    private value: unknown = null;

    private onInput() {
        this.$emit("input", this.value);
    }
}
</script>
