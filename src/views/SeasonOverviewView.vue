<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="view season-overview-view">
        <section class="section">
            <div class="container">
                <div class="columns is-multiline anime-seasons">
                    <div class="column is-3"
                        v-for="season in seasons"
                        v-bind:key="season.season">
                        <div class="season-select" @click="changeSeason(season)">
                            <a>
                                <template v-if="currentSeason == season">
                                    <p class="has-text-centered is-hoverable has-text-weight-bold has-text-primary">{{ $t(season.season) }}</p>
                                    <p class="has-text-primary">{{ season.year }}</p>
                                </template>
                                <template v-else>
                                    <p class="has-text-weight-bold">{{ $t(season.season) }}</p>
                                    <p>{{ season.year }}</p>
                                </template>
                            </a>
                        </div>
                    </div>
                    <div class="column is-12">
                        <SpinnerComponent v-if="loading" />
                    </div>
                </div>
            </div>
        </section>
        <section class="section" v-if="series.length > 0">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <h2 class="subtitle">{{ $t("view.season.series") }}</h2>
                    </div>
                    <div class="column is-4"
                        v-for="anime in series"
                        v-bind:key="anime.id">
                        <AnimePanelComponent v-if="anime" v-bind:anime="anime" v-bind:userListEntry="getAnimeUserListEntry(anime.id)" />
                    </div>
                </div>
            </div>
        </section>
        <section class="section" v-if="movies.length > 0">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <h2 class="subtitle">{{ $t("view.season.movies") }}</h2>
                    </div>
                    <div class="column is-4"
                        v-for="anime in movies"
                        v-bind:key="anime.id">
                        <AnimePanelComponent v-if="anime" v-bind:anime="anime" v-bind:userListEntry="getAnimeUserListEntry(anime.id)" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SeasonDataContext from "@/dataContexts/SeasonDataContext";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import ImageComponent from "@/components/global/ImageComponent.vue";
import AnimePanelComponent from "@/components/global/AnimePanelComponent.vue";
import { UserSessionManager } from "kogitte";
import UserListDataContext from "@/dataContexts/UserListDataContext";
import { SeasonInfo, Anime, Constants, UserListEntry } from "@sokkuri/common";

@Component({
    components: {
        SpinnerComponent,
        ImageComponent,
        AnimePanelComponent
    }
})
export default class SeasonOverviewView extends Vue {
    private loading = false;
    private initState = true;

    private seasons: SeasonInfo[] = [];
    private currentSeason: SeasonInfo = new SeasonInfo();
    private series: Anime[] = [];
    private movies: Anime[] = [];

    private userListAnimes: UserListEntry[] = [];

    private seasonDataContext = new SeasonDataContext();
    private userListDataContext = new UserListDataContext();

    created() {
        this.loading = true;

        this.seasonDataContext.getSeasonInfo().then(x => {
            if (x.successfully && x.data) {
                this.seasons = x.data;

                const currentSeason = this.seasons.find(y => y.current);

                if (currentSeason) {
                    this.currentSeason = currentSeason;
                }

                this.loadSeasonAnimes(this.currentSeason).then(() => {
                    this.loading = false;
                });
            }
        });
    }

    private async changeSeason(season: SeasonInfo) {
        this.currentSeason = season;
        this.clearAnimes();
        this.loading = true;

        await this.loadSeasonAnimes(season);

        this.loading = false;
    }

    private clearAnimes() {
        this.series = [];
        this.movies = [];
    }

    private async loadSeasonAnimes(season: SeasonInfo) {
        return this.seasonDataContext.getSeasonAnimes(season.season, season.year).then(x => {
            if (x.successfully && x.data) {
                this.series = x.data.filter(y => y.type == Constants.AnimeTypes.Series);
                this.movies = x.data.filter(y => y.type == Constants.AnimeTypes.Movie);

                if (new UserSessionManager().sessionExists()) {
                    this.userListDataContext.getSeasonalAnimeEntries(season.season, season.year).then(y => {
                        if (y.successfully && y.data) {
                            this.userListAnimes = y.data;
                        }
                    });
                }

                this.initState = false;
            }
        });
    }

    private getAnimeUserListEntry(animeId: number) {
        return this.userListAnimes.find(x => x.anime.id == animeId);
    }
}
</script>
