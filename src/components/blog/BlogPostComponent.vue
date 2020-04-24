<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="blog-post">
        <ImageComponent v-if="imageUrl" v-bind:imageUrl="imageUrl" />
        <h3 class="subtitle">
            <a v-bind:href="url">{{ title }}</a>
        </h3>
        <p class="content">{{ content }}</p>
        <p class="creation-date">{{ creationDate }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "@/components/global/ImageComponent.vue";

@Component({
  components: {
    ImageComponent
  }
})
export default class BlogPostComponent extends Vue {
    @Prop() private imageUrl!: string;
    @Prop() private url!: string;
    @Prop() private title!: string;
    @Prop() private content!: string;
    @Prop() private creationDate!: Date;
}
</script>
