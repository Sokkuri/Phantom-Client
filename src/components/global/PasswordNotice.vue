<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="notification">
        <p>{{ $t("component.passwordNotice.content") }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PasswordNotice extends Vue {
}
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.notification {
    background-color: $color-background-lighter;
}
</style>
