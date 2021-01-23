<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="view reset-password-view">
        <div class="container">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title has-text-centered">{{ $t("view.resetPassword.heading")}}</h1>
                    <ValidationObserver ref="observer" v-slot="{ invalid }">
                        <InputComponent
                            v-bind:name="'password'"
                            v-bind:label="$t('view.resetPassword.password')"
                            v-bind:type="'password'"
                            v-bind:focus="true"
                            v-bind:rules="'required|password'"
                            v-model="password"
                        />
                        <InputComponent
                            v-bind:name="'confirmPassword'"
                            v-bind:label="$t('view.resetPassword.confirmPassword')"
                            v-bind:type="'password'"
                            v-bind:rules="'required|password|confirmed:password'"
                            v-model="confirmPassword"
                        />
                        <PasswordNotice />
                        <button class="button is-primary is-fullwidth" :class="{ 'is-loading': loading }" v-bind:disabled="invalid" v-on:click="onSubmit">{{ $t("view.resetPassword.submit") }}</button>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountDataContext from "@/dataContexts/AccountDataContext";
import { ValidationObserver } from "vee-validate";
import { InputComponent } from "keiryo";
import PasswordNotice from "@/components/global/PasswordNotice.vue";
import Router from "@/router/Router";
import Routes from "@/router/Routes";

@Component({
    components: {
        InputComponent,
        PasswordNotice
    }
})
export default class ResetPasswordView extends Vue {
    private accountDataContext: AccountDataContext = new AccountDataContext();

    private loading = false;

    private password = "";
    private confirmPassword = "";

    public async onSubmit() {
        const id = this.$route.query.id as string;
        const token = this.$route.query.token as string;
        const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;

        console.log(id);
        console.log(token);

        if (id && token && await observer.validate()) {
            this.loading = true;

            this.accountDataContext.resetPassword(id, token, this.password).then(x => {
                if (x.successfully) {
                    Router.navigate(Routes.Login);
                }
            }).finally(() => this.loading = false);
        }
    }
}
</script>
