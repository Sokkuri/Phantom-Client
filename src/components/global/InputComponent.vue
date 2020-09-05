<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="field">
        <ValidationProvider
            v-bind:rules="rules"
            v-slot="{ errors }"
            v-bind:vid="name">
            <label class="label" v-if="label">{{ label }}</label>
            <input ref="inputElement" @input="onInput()" v-model="value" class="input is-error" v-bind:class="{ errored: errors.length > 0 }" v-bind:type="type" v-bind:name="name" v-bind:maxlength="maxlength" />
        </ValidationProvider>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class InputComponent extends Vue {
    @Prop({required: true}) private name: string;
    @Prop({default: ""}) private label: string;
    @Prop({default: "text"}) private type: string;
    @Prop({default: 255}) private maxlength: number;
    @Prop({default: false}) private focus: boolean;
    @Prop({default: ""}) private rules: string;

    private value: unknown = null;

    mounted() {
        if (this.focus) {
            const element = this.$refs.inputElement as HTMLInputElement;
            element.focus();
        }
    }

    private onInput() {
        this.$emit("input", this.value);
    }
}
</script>
