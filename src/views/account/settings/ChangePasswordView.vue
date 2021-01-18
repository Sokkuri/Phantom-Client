<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="change-password-view">
        <SettingsBaseView>
            <div class="column is-12">
                <h2 class="subtitle">{{ $t("view.settings.changePassword.title") }}</h2>
                <ValidationObserver ref="observer" v-slot="{ invalid }">
                    <InputComponent
                        :name="'newPassword'"
                        :label="$t('view.settings.changePassword.newPassword')"
                        :type="'password'"
                        :focus="true"
                        :rules="'required|password'"
                        v-model="password"
                    />
                    <InputComponent
                        :name="'confirmNewPassword'"
                        :label="$t('view.settings.changePassword.confirmNewPassword')"
                        :type="'password'"
                        :rules="'required|password|confirmed:newPassword'"
                    />
                    <InputComponent
                        :name="'currentPassword'"
                        :label="$t('view.settings.changePassword.currentPassword')"
                        :type="'password'"
                        :rules="'required|password'"
                        v-model="currentPassword"
                    />
                    <button class="button is-primary is-fullwidth" :class="{ 'is-loading': loading }" v-bind:disabled="invalid" v-on:click="onSubmit">{{ $t("view.settings.changePassword.submit") }}</button>
                </ValidationObserver>
            </div>
        </SettingsBaseView>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SettingsBaseView from "@/views/account/settings/SettingsBaseView.vue";
import AccountSettingsDataContext from "@/dataContexts/AccountSettingsDataContext";
import { ValidationObserver } from "vee-validate";
import Notification from "@/common/Notification";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import AccountErrors from "@/common/AccountErrors";
import { InputComponent } from "keiryo";
import { UserSessionManager } from "kogitte";

@Component({
    components: {
        SettingsBaseView,
        InputComponent
    }
})
export default class ChangePasswordView extends Vue {
    private userSessionManager = new UserSessionManager();
    private accountSettingsDataContext: AccountSettingsDataContext = new AccountSettingsDataContext();

    private loading = false;

    private password = "";
    private currentPassword = "";

    private async onSubmit() {
        const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;

        if (await observer.validate()) {
            this.loading = true;

            const saveResult = await this.accountSettingsDataContext.changePassword(this.password, this.currentPassword);

            if (saveResult.successfully) {
                await this.userSessionManager.logout();
                this.$router.push({ name: "login" });

                Notification.addSuccess(TranslationUtils.translate("notification.savedSuccessfully")).show();
            } else {
                if (saveResult.data) {
                    let errorContentKey: string|undefined;

                    switch (saveResult.data) {
                        case AccountErrors.WrongPassword:
                            errorContentKey = "view.settings.changePassword.wrongPassword";
                            break;

                        case AccountErrors.InvalidToken:
                            errorContentKey = "view.settings.changePassword.invalidToken";
                            break;

                        default:
                            break;
                    }

                    if (errorContentKey) {
                        Notification.addError(TranslationUtils.translate(errorContentKey), false).show();
                    }
                }
            }

            this.loading = false;
        }
    }
}
</script>
