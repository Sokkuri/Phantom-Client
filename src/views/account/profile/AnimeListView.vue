<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="anime-list-view">
        <ProfileBaseView>
            <div class="column is-12">
                <div class="section"
                    v-for="pair in entries"
                    :key="pair.key">
                    <template v-if="pair.value.length > 0">
                        <h2 class="subtitle">{{ pair.key }}</h2>
                        <AnimeUserListGridComponent
                            :columnWidth="2"
                            :entries="pair.value">
                        </AnimeUserListGridComponent>
                    </template>
                </div>
            </div>
        </ProfileBaseView>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import ProfileBaseView from "@/views/account/profile/ProfileBaseView.vue";
import AnimeUserListGridComponent from "@/components/global/grid/AnimeUserListGridComponent.vue";
import UserListDataContext from "@/dataContexts/UserListDataContext";
import UserList from "@/common/models/UserList";
import Anime from "@/common/models/Anime";
import Constants from "@/common/Constants";
import StringUtils from "@/common/utilities/StringUtils";
import KeyValuePair from "@/common/models/KeyValuePair";

@Component({
    components: {
        ProfileBaseView,
        AnimeUserListGridComponent
    }
})
export default class AnimeListView extends Vue {
    private userListDataContext = new UserListDataContext();

    private loading = false;

    private entries: KeyValuePair<string, UserList[]>[] = [];

    created() {
        const userName = this.$route.params.userName;

        this.loading = true;

        this.userListDataContext.getAnimeEntries(userName).then(x => {
            if (x.successfully && x.data) {
                this.mapEntries(x.data);
            }
        }).finally(() => this.loading = false);
    }

    private mapEntries(entries: UserList[]) {
        Constants.UserList.EntryState.AnimeStates.forEach(state => {
            const filteredEntries = entries.filter(x => StringUtils.equalsIgnoreCase(x.status, state));
            this.entries.push(new KeyValuePair<string, UserList[]>({ key: TranslationUtils.translate(state), value: filteredEntries }));
        });
    }
}
</script>
