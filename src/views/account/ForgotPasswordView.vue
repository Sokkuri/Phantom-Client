<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="view forgot-password-view">
        <div class="container">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <template v-if="changePassword">
                        <h1 class="subtitle has-text-centered">{{ $t("view.forgotPassword.changePassword.title") }}</h1>
                        <p class="has-text-centered">{{ $t("view.forgotPassword.changePassword.subtitle") }}</p>
                    </template>
                    <template v-else>
                        <h1 class="title has-text-centered">{{ $t('view.forgotPassword.heading') }}</h1>
                        <ValidationObserver ref="observer" v-slot="{ invalid }">
                            <InputComponent
                                    v-bind:name="'email'"
                                    v-bind:label="$t('view.register.email')"
                                    v-bind:focus="true"
                                    v-bind:rules="'required|email'"
                                    v-model="email"
                            />
                            <div class="level">
                                <div class="level-item">
                                    <CaptchaComponent v-model="captchaResponse" />
                                </div>
                            </div>
                            <button class="button is-primary is-fullwidth" :class="{ 'is-loading': loading }" v-bind:disabled="invalid" v-on:click="onSubmit">{{ $t("view.forgotPassword.forgotPassword") }}</button>
                        </ValidationObserver>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountDataContext from "@/dataContexts/AccountDataContext";
import CaptchaComponent from "@/components/global/CaptchaComponent.vue";
import InputComponent from "@/components/global/InputComponent.vue";
import { ValidationObserver } from "vee-validate";

@Component({
    components: {
        CaptchaComponent,
        InputComponent
    },
})
export default class ForgotPasswordView extends Vue {
    private accountDataContext: AccountDataContext = new AccountDataContext();

    private loading = false;
    private changePassword = false;

    private email = "";
    private captchaResponse = "";

    created() {
        const id = this.$route.query.id as string;
        const token = this.$route.query.token as string;
    }

    private async onSubmit() {
        const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;

        if (this.captchaResponse && await observer.validate()) {
            this.loading = true;

            this.accountDataContext.forgotPassword(this.email, this.captchaResponse).then(x => {
                if (x.successfully) {
                    this.changePassword = true;
                }
            }).finally(() => this.loading = false);
        }
    }
}
</script>
