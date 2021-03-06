<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div ref="modalElement" class="modal">
        <div class="modal-background" @click="onCloseClick"></div>

        <div class="modal-content">
            <div class="columns">
                <div class="column is-12">
                    <button class="delete" @click="onCloseClick" />
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, } from "vue-property-decorator";

@Component
export default class ModalComponent extends Vue {
    private onCloseClick() {
        this.toggleVisibility();
    }

    public toggleVisibility() {
        const element: HTMLDivElement = this.$refs.modalElement as HTMLDivElement;

        if (element.classList.contains("is-active")) {
            element.classList.remove("is-active");
        } else {
            element.classList.add("is-active");
        }
    }

    public isVisible() {
        const element: HTMLDivElement = this.$refs.modalElement as HTMLDivElement;

        return element.classList.contains("is-active");
    }
}
</script>
