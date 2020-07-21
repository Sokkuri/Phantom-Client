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
                        <div class="field">
                            <label class="label">{{ $t("view.login.username") }}</label>
                            <InputComponent
                                v-model="username"
                                v-bind:rules="'required'"
                            />
                        </div>
                        <div class="field">
                            <label class="label">{{ $t("view.login.password") }}</label>
                            <InputComponent
                                v-model="password"
                                v-bind:type="'password'"
                                v-bind:rules="'required'"
                            />
                        </div>
                        <button class="button is-primary is-fullwidth" v-bind:disabled="invalid" v-on:click="onSubmit">{{ $t("view.login.login") }}</button>
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

@Component({
    components: {
        InputComponent
    }
})
export default class LoginView extends Vue {
    private sessionManager: UserSessionManager = new UserSessionManager();

    private username: string = "";
    private password: string = "";

    private async onSubmit() {
        const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;

        if (await observer.validate()) {
            const result = await this.sessionManager.login(this.username, this.password);

            if (result.successfully) {
                Main.router.push({ name: "home" });
            } else {
                Notification.addError(TranslationUtils.translate("view.login.wrongLoginData")).show();
            }
        }
    }
}
</script>
