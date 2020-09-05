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
                                <CaptchaComponent v-model="captchaResponse" />
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
import AnimeDataContext from "@/dataContexts/AnimeDataContext";
import { UserSessionManager } from "kogitte";
import InputComponent from "@/components/global/InputComponent.vue";
import { ValidationObserver } from "vee-validate";
import Main from "@/main";
import Notification from "@/common/Notification";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import GlobalEventBus from "@/common/GlobalEventBus";
import CaptchaComponent from "@/components/global/CaptchaComponent.vue";

@Component({
    components: {
        InputComponent,
        CaptchaComponent
    }
})
export default class LoginView extends Vue {
    private sessionManager: UserSessionManager = new UserSessionManager();

    private loading: boolean = false;

    private username: string = "";
    private password: string = "";
    private captchaResponse: string = "";

    private async onSubmit() {
        const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;

        if (this.captchaResponse && await observer.validate()) {
            this.loading = true;

            this.sessionManager.login(this.username, this.password, this.captchaResponse).then(x => {
                if (x.successfully) {
                    GlobalEventBus.$emit("updateLoginState", "login");
                    Main.router.push({ name: "home" });
                } else {
                    Notification.addError(TranslationUtils.translate("view.login.wrongLoginData")).show();
                }
            }).finally(() => this.loading = false)
        }
    }
}
</script>
