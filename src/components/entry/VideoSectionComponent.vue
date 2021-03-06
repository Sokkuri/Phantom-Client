<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <section class="section video-section-component">
        <div class="container">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h2 class="subtitle">{{ $t("anime.heading.contents") }}</h2>
                </div>
                <template v-if="visible">
                    <div class="column is-4"
                        v-for="url in urls"
                        :key="url">
                        <VideoComponent
                            :youtubeUrl="url"
                        />
                    </div>
                </template>
                <template v-else>
                    <div class="column is-12 consent">
                        <p class="has-text-centered">{{ $t("component.videoSection.consent.title") }}</p>
                        <p class="has-text-centered">{{ $t("component.videoSection.consent.subtitle") }}</p>
                        <button class="button is-centered" @click="onConsentClick">{{ $t("component.videoSection.consent.allow") }}</button>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VideoComponent from "@/components/global/VideoComponent.vue";
import LocalStorageKeys from "@/constants/LocalStorageKeys";

@Component({
    components: {
        VideoComponent
    }
})
export default class VideoSectionComponent extends Vue {
    @Prop() private urls!: string[];

    private visible: boolean = false;

    created() {
        this.updateVisibility();
    }

    private onConsentClick() {
        localStorage.setItem(LocalStorageKeys.ShowYouTubeVideos, "true");
        this.updateVisibility();
    }

    private updateVisibility() {
        this.visible = localStorage.getItem(LocalStorageKeys.ShowYouTubeVideos) != null ? true : false;
    }
}
</script>

<style lang="scss" scoped>
.consent button {
    margin-top: 1rem;
}
</style>
