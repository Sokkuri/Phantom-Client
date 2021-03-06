<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="view login-view">
        <div class="container">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title has-text-centered">{{ $t("view.login.welcomeBack") }}</h1>
                    <ValidationObserver ref="observer" v-slot="{ invalid }">
                        <InputComponent
                            v-bind:name="'username'"
                            v-bind:label="$t('view.login.username')"
                            v-bind:focus="true"
                            v-bind:rules="'required|min:2'"
                            v-model="username"
                        />
                        <InputComponent
                            v-bind:name="'password'"
                            v-bind:label="$t('view.login.password')"
                            v-bind:type="'password'"
                            v-bind:rules="'required|password'"
                            v-model="password"
                        />
                        <div class="level">
                            <div class="level-item">
                                <CaptchaComponent v-model="captchaResponse" :siteKey="siteKey" />
                            </div>
                        </div>
                        <button class="button is-primary is-fullwidth" :class="{ 'is-loading': loading }" v-bind:disabled="invalid" v-on:click="onSubmit">{{ $t("view.login.login") }}</button>
                        <div class="level">
                            <div class="level-item">
                                <router-link class="link" v-bind:to="'/register'">{{ $t("view.login.register") }}</router-link>
                                <router-link class="link" v-bind:to="'/forgotPassword'">{{ $t("view.login.forgotPassword") }}</router-link>
                            </div>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserSessionManager } from "kogitte";
import { InputComponent } from "keiryo";
import { ValidationObserver } from "vee-validate";
import Notification from "@/common/Notification";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import GlobalEventBus from "@/common/GlobalEventBus";
import { CaptchaComponent } from "keiryo";
import UserDataContext from "@/dataContexts/UserDataContext";
import CurrentUser from "@/common/CurrentUser";
import Settings from "@/Settings";
import Router from "@/router/Router";
import Routes from "@/router/Routes";
import GlobalEvents from "@/constants/GlobalEvents";

@Component({
    components: {
        InputComponent,
        CaptchaComponent
    }
})
export default class LoginView extends Vue {
    private sessionManager: UserSessionManager = new UserSessionManager();
    private userDataContext: UserDataContext = new UserDataContext();

    private loading = false;

    private username = "";
    private password = "";
    private captchaResponse = "";

    private siteKey = Settings.HCaptcha.SiteKey;

    private async onSubmit() {
        const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;

        if (this.captchaResponse && await observer.validate()) {
            this.loading = true;

            const authResult = await this.sessionManager.login(this.username, this.password, this.captchaResponse);

            if (authResult.successfully && authResult.data) {
                await CurrentUser.loadUserInfo();

                GlobalEventBus.$emit(GlobalEvents.UpdateLoginState, "login");
                Router.navigate(Routes.Home);
            } else {
                Notification.addError(TranslationUtils.translate("view.login.wrongLoginData")).show();
            }

            this.loading = false;
        }
    }
}
</script>
