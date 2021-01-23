<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="view anime-search-view">
        <div class="container">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title">{{ $t("search.anime.title")}}</h1>
                </div>
                <ValidationObserver ref="observer" tag="div" class="column is-12">
                    <div class="columns is-multiline">
                        <div class="column is-6">
                            <label class="label">{{ $t("search.anime.label.format") }}</label>
                            <SelectComponent
                                :name="'types'"
                                :multiple="true"
                                :elements="selectableTypes"
                                :rules="'required'"
                                @input="onFilterChange"
                                v-model="searchSettings.types"
                            />

                            <label class="label">{{ $t("search.anime.label.includedTags") }}</label>
                            <SelectComponent
                                :name="'includedTagIds'"
                                :multiple="true"
                                :elements="selectableTags"
                                @input="onFilterChange"
                                v-model="searchSettings.includedTagIds"
                            />

                            <label class="label">{{ $t("search.anime.label.includedContentCompanies") }}</label>
                            <SelectComponent
                                :name="'includedContentCompanyIds'"
                                :multiple="true"
                                :elements="selectableStreamingServices"
                                @input="onFilterChange"
                                v-model="searchSettings.includedContentCompanyIds"
                            />
                        </div>
                        <div class="column is-6">
                            <label class="label">{{ $t("search.anime.label.state") }}</label>
                            <SelectComponent
                                :name="'states'"
                                :multiple="true"
                                :elements="selectableStates"
                                :rules="'required'"
                                @input="onFilterChange"
                                v-model="searchSettings.states"
                            />

                            <label class="label">{{ $t("search.anime.label.excludedTags") }}</label>
                            <SelectComponent
                                :name="'excludedTagIds'"
                                :multiple="true"
                                :elements="selectableTags"
                                @input="onFilterChange"
                                v-model="searchSettings.excludedTagIds"
                            />
                        </div>
                    </div>
                </ValidationObserver>
                <div class="column is-12">
                    <h2 class="subtitle has-text-centered" v-if="searchResults.length == 0 && !loading">{{ $t("search.noResults") }}</h2>
                    <AnimeGridComponent
                        v-bind:columnWidth="2"
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
import SearchDataContext from "@/dataContexts/SearchDataContext";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import _ from "lodash";
import AnimeGridComponent from "@/components/global/grid/AnimeGridComponent.vue";
import CompanyDataContext from "@/dataContexts/CompanyDataContext";
import { SelectComponent, SelectListItem, SelectListItemUtils } from "keiryo";
import TagDataContext from "@/dataContexts/TagDataContext";
import { Constants, Anime, SearchSettings, Tag, Company } from "@sokkuri/common";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import { ValidationObserver } from "vee-validate";

@Component({
    components: {
        AnimeGridComponent,
        SelectComponent,
        SpinnerComponent
    }
})
export default class AnimeSearchView extends Vue {
    private loading = false;

    private selectableTypes: SelectListItem[] = [];
    private selectableStates: SelectListItem[] = [];
    private selectableTags: SelectListItem[] = [];
    private selectableStreamingServices: SelectListItem[] = [];
    private searchResults: Anime[] = [];

    private searchSettings: SearchSettings =  { types: [], states: [], includedTagIds: [], excludedTagIds: [], page: 1 } as SearchSettings;

    private lastSearchResultCount = 0;

    created() {
        this.selectableTypes = SelectListItemUtils.getItems(Constants.AnimeTypes.AnimeTypes, TranslationUtils.translate, (x) => x, [ Constants.AnimeTypes.Series ]);
        this.selectableStates = SelectListItemUtils.getItems(Constants.States.States, TranslationUtils.translate, (x) => x, [ Constants.States.Airing, Constants.States.Finished ]);

        const tagDataContext = new TagDataContext();
        tagDataContext.getAvailableTags().then(x => {
            if (x.successfully && x.data) {
                this.selectableTags = SelectListItemUtils.getItems<Tag>(x.data, (y) => TranslationUtils.translate(y.translationKey), (y) => y.id.toString());
            }
        });

        const companyDataContext = new CompanyDataContext();
        companyDataContext.getCompaniesByType(Constants.CompanyTypes.StreamingService).then(x => {
            if (x.successfully && x.data) {
                this.selectableStreamingServices = SelectListItemUtils.getItems<Company>(x.data, (y) => y.name, (y) => y.id.toString());
            }
        });

        document.addEventListener("scroll", this.onScroll);
    }

    beforeDestroy() {
        document.removeEventListener("scroll", this.onScroll);
    }

    // Infinity Scroll
    private onScroll() {
        this.$nextTick(() => {
            // Search only if search results are still possible.
            if (this.searchSettings.page == 1 || this.lastSearchResultCount >= 20) {
                const lastEntry = document.querySelector("div.anime-grid-component .grid-card-component:last-of-type") as HTMLDivElement;

                if (lastEntry && !this.loading) {
                    const elementOffset = lastEntry.offsetTop + lastEntry.clientHeight;
                    const windowOffset = window.pageYOffset + window.innerHeight;

                    if (windowOffset > elementOffset) {
                        this.loadNextPage();
                    }
                }
            }
        });
    }

    // Prevent multiple parallel running request.
    private onFilterChange = _.debounce(() => this.submitSearch(), 400);

    private submitSearch() {
        this.searchResults = [];
        this.searchSettings.page = 1;

        this.search();
    }

    private loadNextPage() {
        this.searchSettings.page = this.searchSettings.page +1;
        this.search();
    }

    private async search() {
        const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;
        const searchDataContext = new SearchDataContext();

        if (await observer.validate()) {
            this.loading = true;

            searchDataContext.animeSearch(this.searchSettings).then(x => {
                if (x.successfully && x.data) {
                    this.searchResults = _.unionBy(this.searchResults.concat(x.data), x => x.id);
                    this.lastSearchResultCount = x.data.length;
                }
            }).finally(() => this.loading = false);
        }
    }
}
</script>
