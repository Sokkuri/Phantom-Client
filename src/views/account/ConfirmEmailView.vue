<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="view confirm-email-view">
        <div class="container">
            <SpinnerComponent v-if="loading" />
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title has-text-centered">{{ $t(title) }}</h1>
                    <h2 class="subtitle has-text-centered">{{ $t(subtitle) }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import AccountDataContext from "@/dataContexts/AccountDataContext";
import StringUtils from "@/common/utilities/StringUtils";
import AccountErrors from "@/common/AccountErrors";

@Component({
    components: {
        SpinnerComponent
    },
})
export default class ConfirmEmailView extends Vue {
    private accountDataContext: AccountDataContext = new AccountDataContext();

    private loading = false;
    private title = "";
    private subtitle = "";

    created() {
        const id = this.$route.query.id as string;
        const token = this.$route.query.token as string;
        const email = this.$route.query.email as string;

        if (id && token) {
            this.loading = true;

            this.accountDataContext.confirmEmail(id, token, email).then(x => {
                this.loading = false;

                if (x.successfully) {
                    this.title = "view.confirmEmail.successfully";
                } else {
                    this.title = "view.confirmEmail.errored";

                    if (x.data && StringUtils.equalsIgnoreCase(x.data, AccountErrors.InvalidToken)) {
                        this.subtitle = "view.confirmEmail.invalidToken";
                    }
                }
            });
        }
    }
}
</script>
