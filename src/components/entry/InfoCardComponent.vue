<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="info-card">
        <b v-if="title">{{ title }}</b>
        <p>{{ content }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class InfoCardComponent extends Vue {
    @Prop() private title!: string;
    @Prop() private content!: string;
}
</script>
