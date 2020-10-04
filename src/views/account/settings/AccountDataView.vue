<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="account-data-view">
        <SettingsBaseView>
            <div class="column is-12">
                <h2 class="subtitle">{{ $t("view.settings.accountData.title") }}</h2>
                <ValidationObserver ref="observer" v-slot="{ invalid }">
                    <InputComponent
                        :name="'userName'"
                        :label="$t('view.settings.accountData.userName')"
                        :focus="true"
                        :rules="'required|min:2'"
                        v-model="userName"
                    />
                    <InputComponent
                        :name="'email'"
                        :label="$t('view.settings.accountData.email')"
                        :rules="'required|email'"
                        v-model="email"
                    />
                    <button class="button is-primary is-fullwidth" :class="{ 'is-loading': loading }" v-bind:disabled="invalid" v-on:click="onSubmit">{{ $t("view.settings.accountData.submit") }}</button>
                </ValidationObserver>
            </div>
        </SettingsBaseView>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TabsHubTab from "@/common/models/TabsHubTab";
import SettingsBaseView from "@/views/account/settings/SettingsBaseView.vue";
import AccountSettingsDataContext from "@/dataContexts/AccountSettingsDataContext";
import { ValidationObserver } from "vee-validate";
import Notification from "@/common/Notification";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import AccountErrors from "@/common/AccountErrors";
import { InputComponent } from "keiryo";

@Component({
    components: {
        SettingsBaseView,
        InputComponent
    }
})
export default class AccountDataView extends Vue {
    private accountSettingsDataContext: AccountSettingsDataContext = new AccountSettingsDataContext();

    private loading = false;

    private userName = "";
    private email = "";

    mounted() {
        this.loading = true;

        this.accountSettingsDataContext.getAccountData().then(x => {
            if (x.successfully && x.data) {
                this.userName = x.data.userName;
                this.email = x.data.email;
            }
        }).finally(() => this.loading = false);
    }

    private async onSubmit() {
        const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;

        if (await observer.validate()) {
            this.loading = true;

            this.accountSettingsDataContext.saveAccountData(this.userName, this.email).then(x => {
                if (x.successfully) {
                    Notification.addSuccess(TranslationUtils.translate("view.settings.accountData.savedSuccessfully")).show();
                } else {
                    if (x.data) {
                        let errorContentKey: string|undefined;

                        switch (x.data) {
                            case AccountErrors.DuplicateUserName:
                                errorContentKey = "view.settings.accountData.duplicateUserName";
                                break;

                            case AccountErrors.FaultyEmail:
                                errorContentKey = "view.settings.accountData.faultyEmail";
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
