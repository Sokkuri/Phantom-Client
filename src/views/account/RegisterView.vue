<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="view register-view">
        <div class="container">
            <div class="columns is-is-multiline">
                <div class="column is-12">
                    <template v-if="confirmEmail">
                        <h1 class="subtitle has-text-centered">{{ $t("view.register.confirmEmail.title") }}</h1>
                        <p class="has-text-centered">{{ $t("view.register.confirmEmail.subtitle") }}</p>
                    </template>
                    <template v-else>
                        <h1 class="title has-text-centered">{{ $t("view.register.heading") }}</h1>
                        <ValidationObserver ref="observer" v-slot="{ invalid }">
                            <InputComponent
                                v-bind:name="'username'"
                                v-bind:label="$t('view.register.username')"
                                v-bind:focus="true"
                                v-bind:rules="'required|min:2'"
                                v-model="username"
                            />
                            <InputComponent
                                v-bind:name="'email'"
                                v-bind:label="$t('view.register.email')"
                                v-model="email"
                                v-bind:rules="'required|email'"
                            />
                            <InputComponent
                                v-bind:name="'password'"
                                v-bind:label="$t('view.register.password')"
                                v-bind:type="'password'"
                                v-bind:rules="'required|password'"
                                v-model="password"
                            />
                            <InputComponent
                                v-bind:name="'confirmPassword'"
                                v-bind:label="$t('view.register.confirmPassword')"
                                v-bind:type="'password'"
                                v-bind:rules="'required|password|confirmed:password'"
                                v-model="confirmPassword"
                            />
                            <div class="notification">
                                <p>{{ $t("view.register.passwordNotice") }}</p>
                            </div>
                            <div class="level">
                                <div class="level-item">
                                    <CaptchaComponent v-model="captchaResponse" />
                                </div>
                            </div>
                            <button class="button is-primary is-fullwidth" :class="{ 'is-loading': loading }" v-bind:disabled="invalid" v-on:click="onSubmit">{{ $t("view.register.register") }}</button>
                        </ValidationObserver>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InputComponent from "@/components/global/InputComponent.vue";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import { ValidationObserver } from "vee-validate";
import AccountDataContext from "@/dataContexts/AccountDataContext";
import Notification from "@/common/Notification";
import StringUtils from "@/common/utilities/StringUtils";
import CaptchaComponent from "@/components/global/CaptchaComponent.vue";
import AccountErrors from "@/common/AccountErrors";

@Component({
    components: {
        InputComponent,
        CaptchaComponent
    },
})
export default class RegisterView extends Vue {
    private accountDataContext: AccountDataContext = new AccountDataContext();

    private loading = false;
    private confirmEmail = false;

    private username = "";
    private email = "";
    private password = "";
    private confirmPassword = "";
    private captchaResponse = "";

    private async onSubmit() {
        const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;

        if (await observer.validate() && this.captchaResponse) {
            this.loading = true;

            this.accountDataContext.register(this.username, this.email, this.password, this.captchaResponse).then(x => {
                if (x.successfully) {
                    this.confirmEmail = true;
                } else {
                    if (x.data) {
                        let errorContentKey: string|undefined;

                        switch (x.data) {
                            case AccountErrors.DuplicateUserName:
                                errorContentKey = "view.register.duplicateUserName";
                                break;

                            case AccountErrors.FaultyEmail:
                                errorContentKey = "view.register.faultyEmail";
                                break;

                            case AccountErrors.InvalidCaptcha:
                                errorContentKey = "view.register.invalidCaptcha";
                                break;

                            default:
                                break;
                        }

                        if (errorContentKey) {
                            Notification.addError(TranslationUtils.translate(errorContentKey), false).show();
                        }
                    }
                }
            }).finally(() => this.loading = false);
        }
    }
}
</script>
