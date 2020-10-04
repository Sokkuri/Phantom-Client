<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="profile-base-view">
        <section class="section tabs-hub">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <h1 class="title">{{ userInfo.userName }}</h1>
                        <TabsHubComponent :tabs="tabs" />
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="columns is-multiline">
                    <slot />
                    <SpinnerComponent v-if="loading" />
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TabsHubTab from "@/common/models/TabsHubTab";
import TabsHubComponent from "@/components/global/TabsHubComponent.vue";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import UserDataContext from "@/dataContexts/UserDataContext";
import UserInfo from "@/common/models/UserInfo";
import SpinnerComponent from "@/components/SpinnerComponent.vue";

@Component({
    components: {
        TabsHubComponent,
        SpinnerComponent
    }
})
export default class ProfileBaseView extends Vue {
    private userDataContext: UserDataContext = new UserDataContext();

    private loading = false;

    private tabs: TabsHubTab[] = [];
    private userInfo: UserInfo = new UserInfo();

    created() {
        const userName = this.$route.params.userName;

        this.tabs = [
            new TabsHubTab({label: TranslationUtils.translate("view.profile.tabsHub.overview"), url: `/profile/${userName}`}),
            new TabsHubTab({label: TranslationUtils.translate("view.profile.tabsHub.animeList"), url: `/profile/${userName}/animeList`})
        ];

        if (userName) {
            this.loading = true;

            this.userDataContext.getUserInfo(userName).then(x => {
                if (x.successfully && x.data) {
                    this.userInfo = x.data;
                }
            }).finally(() => this.loading = false);
        }
    }
}
</script>
