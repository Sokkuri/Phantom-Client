<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="captcha-component">
        <vue-hcaptcha ref="captcha" @verify="onVerify" :sitekey="sitekey" :theme="'dark'" :size="size"></vue-hcaptcha>
        <div class="notification" v-if="!visible">
            <p class="has-text-centered">{{ $t("component.captcha.notification.title") }}</p>
            <div class="level">
                <div class="level-item">
                    <a href="https://hcaptcha.com/privacy" target="_blank" rel="noopener noreferrer">{{ $t("component.captcha.notification.privacyPolicy") }}</a>
                    <a href="https://hcaptcha.com/terms" target="_blank" rel="noopener noreferrer">{{ $t("component.captcha.notification.termsOfService") }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueHcaptcha, { HCaptchaMethods } from "@hcaptcha/vue-hcaptcha";
import Settings from "@/Settings";

@Component({
    components: {
        VueHcaptcha
    },
})
export default class CaptchaComponent extends Vue {
    @Prop({default: true}) private visible: boolean;

    private sitekey = Settings.HCaptcha.SiteKey;
    private size = "normal";

    created() {
        if (!this.visible) {
            this.size = "invisible";
        }
    }

    public execute() {
        (this.$refs.captcha as unknown as HCaptchaMethods).execute();
    }

    private onVerify(response: string) {
        this.$emit("verify", response);
        this.$emit("input", response);
    }
}
</script>
