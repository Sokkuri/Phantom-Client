<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="anime-search-view">
        <div class="container">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title">{{ $t("search.anime.title")}}</h1>
                </div>
                <div class="column is-6">
                    <label class="label">{{ $t("search.anime.label.format") }}</label>
                    <MultiSelectComponent
                        v-bind:elements="selectableTypes"
                        v-model="searchSettings.types"
                    />

                    <label class="label">{{ $t("search.anime.label.includedTags") }}</label>
                    <MultiSelectComponent
                        v-bind:elements="selectableTags"
                        v-model="searchSettings.includedTagIds"
                    />

                    <label class="label">{{ $t("search.anime.label.includedContentCompanies") }}</label>
                    <MultiSelectComponent
                        v-bind:elements="selectableStreamingServices"
                        v-model="searchSettings.includedContentCompanyIds"
                    />
                </div>
                <div class="column is-6">
                    <label class="label">{{ $t("search.anime.label.state") }}</label>
                    <MultiSelectComponent
                        v-bind:elements="selectableStates"
                        v-model="searchSettings.states"
                    />

                    <label class="label">{{ $t("search.anime.label.includedTags") }}</label>
                    <MultiSelectComponent
                        v-bind:elements="selectableTags"
                        v-model="searchSettings.excludedTagIds"
                    />
                </div>
                <div class="column is-12">
                    <button class="button is-primary" v-on:click="submitSearch">{{ $t("search.anime.button.search") }}</button>
                </div>
                <div class="column is-12">
                    <h2 class="subtitle has-text-centered" v-if="searchResults.length == 0 && lastSearchResultCount == 0 && !initState">{{ $t("search.noResults") }}</h2>
                    <AnimeGridComponent
                        v-bind:colspan="2"
                        v-bind:entries="searchResults"
                    />
                    <SpinnerComponent v-if="loading" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MultiSelectComponent from "@/components/global/MultiSelectComponent.vue";
import SelecListItemUtils from "@/common/utilities/SelectListItemUtils";
import Constants from "@/common/Constants";
import SelectListItem from "@/common/models/SelectListItem";
import ConfigurationDataContext from "@/dataContexts/ConfigurationDataContext";
import SearchDataContext from "@/dataContexts/SearchDataContext";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import KeyValuePair from "@/common/models/KeyValuePair";
import SearchSettings from "@/common/models/SearchSettings";
import Anime from "@/common/models/Anime";
import _ from "lodash";
import AnimeGridComponent from "@/components/global/grid/AnimeGridComponent.vue";
import CompanyDataContext from "@/dataContexts/CompanyDataContext";

@Component({
    components: {
        AnimeGridComponent,
        MultiSelectComponent,
        SpinnerComponent
    }
})
export default class AnimeSearchView extends Vue {
    private loading: boolean = false;

    private selectableTypes: SelectListItem[] = [];
    private selectableStates: SelectListItem[] = [];
    private selectableTags: SelectListItem[] = [];
    private selectableStreamingServices: SelectListItem[] = [];
    private searchResults: Anime[] = [];

    private searchSettings: SearchSettings = new SearchSettings({ types: [], states: [], includedTagIds: [], excludedTagIds: [], page: 1 });

    private lastSearchResultCount: number = 0;
    private initState: boolean = true;

    created() {
        this.selectableTypes = SelecListItemUtils.getTranslatedItems(Constants.AnimeTypes.AnimeTypes, [Constants.AnimeTypes.Series]);
        this.selectableStates = SelecListItemUtils.getTranslatedItems(Constants.States.States, [Constants.States.Airing, Constants.States.Finished]);

        const configDataContext = new ConfigurationDataContext();
        configDataContext.getAvailableTags().then(x => {
            if (x.successfully && x.data) {
                let pairs: KeyValuePair<string, number>[] = [];

                x.data.forEach((y => {
                    pairs.push(new KeyValuePair<string, number>({ key: y.translationKey, value: y.id }))
                }));

                this.selectableTags = SelecListItemUtils.getTranslatedPairItems<number>(pairs);
            }
        });

        const companyDataContext = new CompanyDataContext();
        companyDataContext.getCompaniesByType(Constants.CompanyTypes.StreamingService).then(x => {
            if (x.successfully && x.data) {
                let items: SelectListItem[] = [];

                x.data.forEach(y => {
                    items.push(new SelectListItem({ label: y.name, value: y.id }))
                });

                this.selectableStreamingServices = items;
            }
        });

        // Infinity Scroll
        document.addEventListener("scroll", (x) => {
            this.$nextTick(() => {
                // Search only if search results are still possible.
                if (this.searchSettings.page == 1 || this.lastSearchResultCount >= 20) {
                    const lastEntry = document.querySelector("div.entry-grid div:last-of-type div.tooltip") as HTMLDivElement;

                    if (lastEntry && !this.loading) {
                        const elementOffset = lastEntry.offsetTop + lastEntry.clientHeight;
                        const windowOffset = window.pageYOffset + window.innerHeight;

                        if (windowOffset > elementOffset) {
                            this.loadNextPage();
                        }
                    }
                }
            });
        });
    }

    private submitSearch() {
        this.searchResults = [];
        this.searchSettings.page = 1;

        this.search().then(() => this.initState = false);
    }

    private loadNextPage() {
        this.searchSettings.page = this.searchSettings.page +1;
        this.search();
    }

    private async search() {
        const searchDataContext = new SearchDataContext();

        this.loading = true;

        await searchDataContext.animeSearch(this.searchSettings).then(x => {
            if (x.successfully && x.data) {
                this.loading = false;
                this.searchResults = _.unionBy(this.searchResults.concat(x.data), x => x.id);
                this.lastSearchResultCount = x.data.length;
            }
        });
    }
}
</script>
