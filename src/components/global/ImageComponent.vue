<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <img ref="imageElement" class="image" v-bind:class="{ 'clickable-image': viewer }" v-bind:src="getUrl()" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Viewer from "viewerjs";
import Settings from "@/Settings";

@Component
export default class ImageComponent extends Vue {
    @Prop() private imageUrl!: string;
    @Prop() private fileName!: string;
    @Prop({ default: true }) private viewer!: boolean;

    mounted() {
        const element: HTMLImageElement = this.$refs.imageElement as HTMLImageElement;

        if (element && this.viewer) {
            new Viewer(element, {
                title: false,
                navbar: false,
                toolbar: false,
                movable: false
            });
        }
    }

    private getUrl() {
        return this.fileName ? Settings.FilesUrl + this.fileName : this.imageUrl;
    }
}
</script>
