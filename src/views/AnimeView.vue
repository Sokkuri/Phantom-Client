<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="view anime-view">
        <section class="section info-header">
            <div class="container">
                <SpinnerComponent v-if="loading" />
                <div class="columns is-multiline">
                    <div class="column is-2">
                        <ImageComponent
                            v-if="anime.systemFile"
                            v-bind:fileName="anime.systemFile.name"
                        />
                        <router-link class="button is-primary is-fullwidth" :to="'/anime/' + anime.id + '/content'" tag="button">
                            <font-awesome-icon :icon="['far', 'play-circle']" size="2x" />
                            {{ $t("anime.button.watchNow") }}
                        </router-link>
                    </div>
                    <div class="column is-10">
                        <div class="info-header-content">
                            <h1 class="title">{{ entryMainTitle.title }}</h1>
                            <DescriptionComponent
                                v-bind:content="entryMainDescription.content"
                                v-bind:source="entryMainDescription.source"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-2">
                        <button v-if="userListEntry.status" class="button is-fullwidth" v-on:click="$refs.userListEditor.toggleVisibility()">{{ $t("anime.button.editListEntry") }}</button>
                        <button v-else class="button is-fullwidth" v-on:click="onAddAnimeToListClick">{{ $t("anime.button.addToList") }}</button>

                        <AnimeUserListEditorComponent ref="userListEditor" @saved-changes="setUserListData" @deleted-entry="clearUserListData" v-if="userListEntry.status" v-bind:animeId="anime.id" v-bind:userListEntry="userListEntry" />

                        <label class="label">{{ $t("anime.label.state") }}</label>
                        <SelectComponent
                            :name="'state'"
                            :elements="selectableWatchingStates"
                            :searchEnabled="false"
                            :placeholder="true"
                            v-model="userListEntry.status"
                            @selection="saveUserListWatchingState"
                        />

                        <label class="label">{{ $t("anime.label.rating") }}</label>
                        <SelectComponent
                            :name="'rating'"
                            :elements="selectableRatings"
                            :searchEnabled="false"
                            :placeholder="true"
                            v-model="userListEntry.overallRating"
                            @selection="saveUserListRating"
                        />

                        <div class="additional-information"
                            v-if="additionalEntryInfos.length > 0">
                            <div
                                v-for="info in additionalEntryInfos"
                                v-bind:key="info.key">

                                <h6>{{ $t(info.key) }}</h6>
                                <p
                                    v-for="val in info.value"
                                    v-bind:key="val">{{ val }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="column is-10">
                        <h2 class="subtitle">{{ $t("anime.heading.tags") }}</h2>
                        <div class="columns is-multiline"
                            v-if="anime.tags">
                            <div class="column is-10">
                                <div class="tags">
                                    <span class="tag is-rounded"
                                        v-for="tag in anime.tags"
                                        v-bind:key="tag.id">
                                        {{ $t(tag.translationKey) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <h2 class="subtitle">{{ $t("anime.heading.details") }}</h2>
                        <div class="columns is-multiline">
                            <div class="column is-4"
                                v-for="detail in entryDetails"
                                v-bind:key="detail.key">
                                <InfoCardComponent
                                    v-bind:title="detail.key"
                                    v-bind:content="detail.value"
                                />
                            </div>
                        </div>
                        <h2 class="subtitle">{{ $t("anime.heading.similiarAnimes") }}</h2>
                        <AnimeGridComponent
                            v-bind:columnWidth="2"
                            v-bind:entries="similiarAnimes"
                        />
                    </div>
                </div>
            </div>
        </section>
        <section class="section contents">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <h2 class="subtitle">{{ $t("anime.heading.contents") }}</h2>
                    </div>
                    <div class="column is-4"
                        v-for="content in entryVideoContents"
                        v-bind:key="content.id">

                        <VideoComponent
                            v-bind:youtubeUrl="content.url"
                        />
                    </div>
                </div>
            </div>
        </section>
        <section class="section recensions" v-if="recensions.length > 0">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <h2 class="subtitle">{{ $t("anime.heading.recensions") }}</h2>
                    </div>
                    <div class="column is-6"
                        v-for="recension in recensions"
                        v-bind:key="recension.id">
                        <RecensionComponent v-bind:username="recension.username" v-bind:stars="recension.overallRating" v-bind:content="recension.content" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnimeDataContext from "@/dataContexts/AnimeDataContext";
import _ from "lodash";
import ImageComponent from "@/components/global/ImageComponent.vue";
import DescriptionComponent from "@/components/entry/DescriptionComponent.vue";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import Notification from "@/common/Notification";
import UserListDataContext from "@/dataContexts/UserListDataContext";
import RequestResult from "@/common/models/RequestResult";
import { UserSessionManager } from "kogitte";
import InfoCardComponent from "@/components/entry/InfoCardComponent.vue";
import KeyValuePair from "@/common/models/KeyValuePair";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import VideoComponent from "@/components/global/VideoComponent.vue";
import ContentDataContext from "@/dataContexts/ContentDataContext";
import AnimeGridComponent from "@/components/global/grid/AnimeGridComponent.vue";
import EntryUtils from "@/common/utilities/EntryUtils";
import AnimeUserListEditorComponent from "@/components/global/userListEditor/AnimeUserListEditorComponent.vue";
import { SelectComponent, SelectListItem, SelectListItemUtils } from "keiryo";
import RecensionComponent from "@/components/entry/RecensionComponent.vue";
import RecensionViewModel from "@/common/viewModels/RecensionViewModel";
import RecensionDataContext from "@/dataContexts/RecensionDataContext";
import { Constants, EntryTitle, Description, Anime, UserListEntry, Tag, Content } from "@sokkuri/common";
import SeoUtils from "@/common/utilities/SeoUtils";
import Settings from "@/Settings";
import Routes from "@/router/Routes";

@Component({
    components: {
        ImageComponent,
        DescriptionComponent,
        SpinnerComponent,
        InfoCardComponent,
        VideoComponent,
        AnimeGridComponent,
        AnimeUserListEditorComponent,
        SelectComponent,
        RecensionComponent
    }
})
export default class AnimeView extends Vue {
    private loading = false;
    private animeDataContext: AnimeDataContext = new AnimeDataContext();
    private userListDataContext: UserListDataContext = new UserListDataContext();
    private contentDataContext: ContentDataContext = new ContentDataContext();
    private recensionDataContext: RecensionDataContext = new RecensionDataContext();

    private anime: Anime = new Anime();
    private entryVideoContents: Content[] = [];
    private userListEntry: UserListEntry = new UserListEntry();
    private entryMainTitle: EntryTitle = new EntryTitle();
    private entryMainDescription: Description = new Description();
    private entryTags: Tag[] = [];
    private entryDetails: Array<KeyValuePair<string, string>> = [];
    private additionalEntryInfos: KeyValuePair<string, string[]>[] = [];
    private similiarAnimes: Anime[] = [];
    private recensions: RecensionViewModel[] = [];

    private selectableRatings: SelectListItem[] = [];
    private selectableWatchingStates: SelectListItem[] = [];
    private selectedValue = "";

    created() {
        const animeId: number = +this.$route.params.id;

        this.selectableRatings = SelectListItemUtils.getItems<number>([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], (x) => x.toString(), (x) => x.toString());
        this.selectableWatchingStates = SelectListItemUtils.getItems(Constants.UserList.EntryState.AnimeStates, TranslationUtils.translate, (x) => x);

        if (animeId) {
            this.loading = true;

            const getAnime = this.animeDataContext.getAnime(animeId);
            getAnime.then(x => {
                if (x.successfully && x.data) {
                    this.anime = x.data;

                    this.entryMainTitle = EntryUtils.getTitle(this.anime.titles);
                    this.setMainDescription();
                    this.setEntryDetails();
                    this.setAdditionalInformation();
                    this.setUserListData();
                    this.setSeoInfo();
                }
            });

            const getContents = this.contentDataContext.getAnimeContents(animeId);
            getContents.then(x => {
                if (x.successfully && x.data) {
                    this.entryVideoContents = x.data.filter(x => x.type == Constants.ContentTypes.Video);
                }
            });

            const getAllAnimeRecensions = this.recensionDataContext.getAnimeRecensions(animeId);
            getAllAnimeRecensions.then(x => {
                if (x.successfully && x.data) {
                    this.recensions = x.data;
                }
            });

            Promise.all([ getAnime, getContents, getAllAnimeRecensions ]).finally(() => this.loading = false);

            this.animeDataContext.getSimilarAnimes(animeId).then((similiarAnimesResult: RequestResult<Anime[]>) => {
                if (similiarAnimesResult.successfully && similiarAnimesResult.data) {
                    this.similiarAnimes = similiarAnimesResult.data;
                }
            });
        }
    }

    private setSeoInfo() {
        // Add searchengine metadata
        SeoUtils.updateTitle(this.entryMainTitle.title);
        SeoUtils.updateMeta("description", this.entryMainDescription.content);

        // Add open graph metadata
        SeoUtils.updateMeta("og:site_name", Settings.Name);
        SeoUtils.updateMeta("og:title", this.entryMainTitle.title);
        SeoUtils.updateMeta("og:image", `https://sokkuri.eu${Settings.FilesUrl}${this.anime.systemFile.name}`);
        SeoUtils.updateMeta("og:url", `https://sokkuri.eu${Routes.Anime.Anime(this.anime.id)}`);
        SeoUtils.updateMeta("og:description", this.entryMainDescription.content);

        // Add twitter card metadata
        SeoUtils.updateMeta("twitter:card", "summary");
    }

    private setMainDescription() {
        if (this.anime.descriptions && this.anime.descriptions.length > 0) {
            this.entryMainDescription = this.anime.descriptions
                .some(x => x.language == Constants.Languages.German) ?
                    (this.anime.descriptions.find(x => x.language == Constants.Languages.German) as Description) : (_.first(this.anime.descriptions) as Description);
        }
    }

    private setEntryDetails() {
        if (this.anime) {
            let details: Array<KeyValuePair<string, string>> = [
                new KeyValuePair<string, string>({
                    key: "anime.details.format",
                    value: TranslationUtils.translate(this.anime.type) }),
                new KeyValuePair<string, string>({
                    key: "anime.details.state",
                    value: TranslationUtils.translate(this.anime.status) }),
                new KeyValuePair<string, string>({
                    key: "anime.details.episodes",
                    value: this.anime.episodes.toString() }),
                new KeyValuePair<string, string>({
                    key: "anime.details.adaption",
                    value: TranslationUtils.translate(this.anime.adaptation) }),
                new KeyValuePair<string, string>({
                    key: "anime.details.airedSeason",
                    value: `${TranslationUtils.translate(this.anime.airedSeason)} ${this.anime.airedYear}` }),
            ];

            if (this.anime.endingSeason && this.anime.endingYear) {
                details.push(new KeyValuePair<string, string>({
                    key: "anime.details.endingSeason",
                    value: `${TranslationUtils.translate(this.anime.endingSeason)} ${this.anime.endingYear}` })
                );
            }

            details.forEach((x: KeyValuePair<string, string>) => {
                x.key = TranslationUtils.translate(x.key);
            });

            this.entryDetails = this.entryDetails.concat(details);
        }
    }

    private setUserListData() {
        // Only load the userlist date when there is a session.
        new UserSessionManager().getCurrentSession().then((session => {
            if (session) {
                this.userListDataContext.getAnimeEntry(this.anime.id).then((userListResult: RequestResult<UserListEntry>) => {
                    if (userListResult.successfully && userListResult.data) {
                        this.userListEntry = userListResult.data;

                        this.overrideRatingWithUserlistData();
                        this.overrideWatchingStateWithUserlistData();
                    }
                });
            }
        }));
    }

    private clearUserListData() {
        this.selectableRatings = SelectListItemUtils.getItems<number>([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], (x) => x.toString(), (x) => x.toString());
        this.selectableWatchingStates = SelectListItemUtils.getItems(Constants.UserList.EntryState.AnimeStates, TranslationUtils.translate, (x) => x);
        this.userListEntry = new UserListEntry();
    }

    private setAdditionalInformation() {
        let infos: KeyValuePair<string, string[]>[] = [];

        const otherTitles = this.anime.titles.filter(x => x != this.entryMainTitle);

        otherTitles.forEach(x => {
            infos.push(new KeyValuePair<string, string[]> ({
                key: x.language,
                value: [ x.title ]
            }));
        });

        const synonyms = this.anime.synonyms.map(x => x.title);

        if (synonyms && synonyms.length > 0) {
            infos.push(new KeyValuePair<string, string[]>({
                key: "anime.heading.synonyms",
                value: synonyms
            }));
        }

        const companyTitles = this.anime.companies.map(x => x.name);

        if (companyTitles && companyTitles.length > 0) {
            infos.push(new KeyValuePair<string, string[]>({
                key: "anime.heading.companies",
                value: companyTitles
            }));
        }

        this.additionalEntryInfos = this.additionalEntryInfos.concat(infos);
    }

    private overrideRatingWithUserlistData() {
        SelectListItemUtils.updateSelection(this.selectableRatings, [ this.userListEntry.overallRating?.toString() ]);
    }

    private overrideWatchingStateWithUserlistData() {
        SelectListItemUtils.updateSelection(this.selectableWatchingStates, [ this.userListEntry.status ]);
    }

    private saveUserListWatchingState(value: string): void {
        if (value) {
            this.userListDataContext.setAnimeState(this.anime.id, value).then((x: RequestResult<void>) => {
                if (x.successfully) {
                    this.setUserListData();
                    this.showSuccessfullySaveNotification();
                }
            });
        }
    }

    private saveUserListRating(value: number): void {
        if (value) {
            this.userListDataContext.setAnimeRating(this.anime.id, value).then((x: RequestResult<void>) => {
                if (x.successfully) {
                    this.setUserListData();
                    this.showSuccessfullySaveNotification();
                }
            });
        }
    }

    private onAddAnimeToListClick() {
        this.userListDataContext.addAnime(this.anime.id).then((x: RequestResult<void>) => {
            if (x.successfully) {
                this.setUserListData();
                this.showSuccessfullySaveNotification();
            }
        });
    }

    private showSuccessfullySaveNotification() {
        Notification.addSuccess(TranslationUtils.translate("notification.savedSuccessfully")).show();
    }
}
</script>
