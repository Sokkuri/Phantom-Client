<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div>
        <img ref="imageElement" class="image clickable-image" v-bind:src="imageUrl" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Viewer from "viewerjs";

@Component
export default class ImageComponent extends Vue {
    @Prop() private imageUrl!: string;

    mounted() {
        const element: HTMLImageElement = this.$refs.imageElement as HTMLImageElement;

        if (element) {
            const viewer = new Viewer(element, {
                title: false,
                navbar: false,
                toolbar: false,
                movable: false
            });
        }
    }
}
</script>
