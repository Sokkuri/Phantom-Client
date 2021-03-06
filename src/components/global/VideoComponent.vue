<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="video-component">
        <iframe :src="youtubeUrl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VideoComponent extends Vue {
    @Prop() private youtubeUrl!: string;
}
</script>

<style lang="scss" scoped>
.video-component {
    iframe {
        width: 100%;
        height: 100%;
        min-height: 14.1rem;
    }
}
</style>
