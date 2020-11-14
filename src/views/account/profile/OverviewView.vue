<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="overview-view">
        <ProfileBaseView>
            <div class="column is-12">
                <UserListStatsComponent v-if="animeStats" :stats="animeStats" />
            </div>
            <div class="column is-6">
            </div>
            <div class="column is-6">
            </div>
        </ProfileBaseView>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProfileBaseView from "@/views/account/profile/ProfileBaseView.vue";
import UserListDataContext from "@/dataContexts/UserListDataContext";
import UserListStatsComponent from "@/components/account/profile/UserListStatsComponent.vue";
import UserListStatsViewModel from "@/common/viewModels/UserListStatsViewModel";

@Component({
    components: {
        ProfileBaseView,
        UserListStatsComponent
    }
})
export default class OverviewView extends Vue {
    private animeStats: UserListStatsViewModel = new UserListStatsViewModel();

    private userStatsDataContext = new UserListDataContext();

    mounted() {
      this.getUserStats();
    }

    private getUserStats() {
        const userName = this.$route.params.userName;

        if (userName) {
            this.userStatsDataContext.getAnimeUserListStats(userName).then(x => {
                if (x.successfully && x.data) {
                    this.animeStats = x.data;
                }
            });
        }
    }
}
</script>
