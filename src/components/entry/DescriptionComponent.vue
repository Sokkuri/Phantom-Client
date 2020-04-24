<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="description">
        <p>{{ content }}</p>
        <p v-if="source" class="source">{{ $t("components.description.source") }}: {{ source }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DescriptionComponent extends Vue {
    @Prop() private content!: string;
    @Prop() private source!: string;
}
</script>
