<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div v-if="selected || selected > -1" class="rating">
        <span class="icon selected"
            v-for="n in selected"
            v-bind:key="n">
            <font-awesome-icon :icon="['fas', 'star']" />
        </span>
        <span class="icon"
            v-for="n in (10-selected)"
            v-bind:key="uuid + n">
            <font-awesome-icon :icon="['far', 'star']" />
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { v1 } from "uuid";

@Component
export default class RatingComponent extends Vue {
    @Prop() private selected!: number;
    private uuid: string;

    created() {
        this.uuid = v1();
    }
}
</script>
