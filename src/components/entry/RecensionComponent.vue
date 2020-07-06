<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="recension">
        <a>{{ username }}</a>
        <RatingComponent v-if="stars" v-bind:selected="stars" />
        <p>{{ content }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RatingComponent from "@/components/entry/RatingComponent.vue";

@Component({
    components: {
        RatingComponent
    }
})
export default class RecensionComponent extends Vue {
    @Prop() private username: string;
    @Prop() private stars: number;
    @Prop() private content: string;
}
</script>
