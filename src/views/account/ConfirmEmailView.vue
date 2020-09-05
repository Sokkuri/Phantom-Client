<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="view confirm-email-view">
        <div class="container">
            <SpinnerComponent v-if="loading" />
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title has-text-centered">{{ $t(result) }}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import AccountDataContext from "@/dataContexts/AccountDataContext";

@Component({
    components: {
        SpinnerComponent
    },
})
export default class ConfirmEmailView extends Vue {
    private accountDataContext: AccountDataContext = new AccountDataContext();

    private loading: boolean = false;
    private result: string = "";

    created() {
        const id = this.$route.query.id as string;
        const token = this.$route.query.token as string;

        if (id && token) {
            this.loading = true;

            this.accountDataContext.confirmEmail(id, token).then(x => {
                this.loading = false;

                if (x.successfully) {
                    this.result = "view.confirmEmail.successfully";
                } else {
                    this.result = "view.confirmEmail.errored";
                }
            });
        }
    }
}
</script>
