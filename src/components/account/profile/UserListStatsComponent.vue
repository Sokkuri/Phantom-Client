<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="userlist-stats-component">
        <nav class="level">
            <div class="level-item has-text-centered"
                v-for="entry in entries"
                :key="entry.title">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <p class="heading">{{ $t(entry.title) }}</p>
                    </div>
                    <div class="column is-12">
                        <p class="title">{{ entry.value }}</p>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import UserListStatsViewModel from "@/common/viewModels/UserListStatsViewModel";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class UserListStatsComponent extends Vue {
    @Prop() private stats: UserListStatsViewModel;

    private entries: object[] = [];

    mounted() {
        this.updateEntries();
    }

    @Watch("stats") onStatsChange() {
        this.updateEntries();
    }

    private updateEntries() {
        this.entries = [];

        const keyPrefix = "component.userlistStats.";

        this.entries.push({
            title: keyPrefix + "totalEntries",
            value: this.stats.totalEntries
        });

        this.entries.push({
            title: keyPrefix + "totalEpisodes",
            value: this.stats.totalEpisodes
        });

        this.entries.push({
            title: keyPrefix + "averageRating",
            value: this.stats.averageRating
        });

        this.entries.push({
            title: keyPrefix + "daysWatched",
            value: this.stats.daysWatched
        });
    }
}
</script>
