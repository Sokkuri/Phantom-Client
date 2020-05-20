<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div ref="modalElement" class="modal">
        <div class="modal-background"></div>

        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }}</p>
                <button v-on:click="onClose" class="delete"></button>
            </header>
            <section class="modal-card-body">
                <slot></slot>
            </section>
            <footer class="modal-card-foot">

            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class ModalComponent extends Vue {
    @Prop() private title!: string;
    @Prop() private visible!: boolean;

    @Watch("visible") onElementChange() {
        this.setModalVisibility(this.visible);
    }

    private onClose() {
        this.setModalVisibility(false);
    }

    private setModalVisibility(visible: boolean) {
        const element: HTMLDivElement = this.$refs.modalElement as HTMLDivElement;

        if (visible) {
            element.classList.add("is-active");
        } else {
            element.classList.remove("is-active");
        }
    }
}
</script>
