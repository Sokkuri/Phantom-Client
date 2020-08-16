<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <vue-hcaptcha @verify="onVerify" :sitekey="sitekey" :theme="'dark'"></vue-hcaptcha>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueHcaptcha from "@hcaptcha/vue-hcaptcha";
import Settings from "@/Settings";

@Component({
    components: {
        VueHcaptcha
    },
})
export default class CaptchaComponent extends Vue {
    private sitekey = Settings.HCaptcha.SiteKey;

    private onVerify(response: string) {
        this.$emit("input", response);
    }
}
</script>
