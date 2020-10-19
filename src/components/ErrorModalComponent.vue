<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <ModalComponent ref="modal">
        <div class="container">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title is-spaced has-text-centered">=(</h1>
                    <h2 class="subtitle has-text-centered">{{ $t("error.title") }}</h2>
                    <p class="has-text-centered">{{ $t("error.description") }}</p>
                </div>
            </div>
        </div>
    </ModalComponent>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Viewer from "viewerjs";
import Settings from "@/Settings";
import GlobalEventBus from "@/common/GlobalEventBus";
import ModalComponent from "@/components/global/ModalComponent.vue";

@Component({
    components: {
        ModalComponent
    }
})
export default class ErrorModalComponent extends Vue {
    created() {
        GlobalEventBus.$on("server-error", this.showModal);
    }

    private showModal() {
        const element = this.$refs.modal as ModalComponent;

        if (!element.isVisible()) {
            element.toggleVisibility();
        }
    }
}
</script>
