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
                            v-bind:imageUrl="'/api/files/' + anime.systemFile.name"
                        />
                        <router-link class="button is-primary is-fullwidth" v-bind:to="'/anime/content/' + anime.id" tag="button">
                            <font-awesome-icon :icon="['far', 'play-circle']" size="2x" />
                            {{ $t("anime.button.watchNow") }}
                        </router-link>
                    </div>
                    <div class="column is-10">
                        <div class="info-header-content">
                            <h1 class="title">{{ entryMainTitle.title }}</h1>
                            <RatingComponent v-bind:selected="anime.overallRating" />
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
                            v-bind:elements="selectableWatchingStates"
                            v-bind:searchEnabled="false"
                            v-bind:placeholder="true"
                            v-model="userListEntry.status"
                            @selection="saveUserListWatchingState"
                        />

                        <label class="label">{{ $t("anime.label.rating") }}</label>
                        <SelectComponent
                            v-bind:elements="selectableRatings"
                            v-bind:searchEnabled="false"
                            v-bind:placeholder="true"
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
                            v-bind:colspan="2"
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
                        <h2 class="title">{{ $t("anime.heading.contents") }}</h2>
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
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AnimeDataContext from "@/dataContexts/AnimeDataContext";
import Constants from "@/common/Constants";
import _ from "lodash";
import EntryTitle from "@/common/models/EntryTitle";
import ImageComponent from "@/components/global/ImageComponent.vue";
import DescriptionComponent from "@/components/entry/DescriptionComponent.vue";
import Description from "@/common/models/Description";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import RatingComponent from "@/components/entry/RatingComponent.vue";
import Anime from "@/common/models/Anime";
import SelectListItem from "@/common/models/SelectListItem";
import SelectListItemUtils from "@/common/utilities/SelectListItemUtils";
import Notification from "@/common/Notification";
import UserListDataContext from "@/dataContexts/UserListDataContext";
import RequestResult from "@/common/models/RequestResult";
import UserList from "@/common/models/UserList";
import { UserSessionManager } from "kogitte";
import InfoCardComponent from "@/components/entry/InfoCardComponent.vue";
import KeyValuePair from "@/common/models/KeyValuePair";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import Tag from "@/common/models/Tag";
import VideoComponent from "@/components/global/VideoComponent.vue";
import ContentDataContext from "@/dataContexts/ContentDataContext";
import Content from "@/common/models/Content";
import AnimeGridComponent from "@/components/global/grid/AnimeGridComponent.vue";
import BaseEntry from "@/common/models/BaseEntry";
import EntryUtils from "@/common/utilities/EntryUtils";
import AnimeUserListEditorComponent from "@/components/global/userListEditor/AnimeUserListEditorComponent.vue";
import SelectComponent from "@/components/global/SelectComponent.vue";
import StringUtils from "@/common/utilities/StringUtils";

@Component({
    components: {
        ImageComponent,
        DescriptionComponent,
        SpinnerComponent,
        RatingComponent,
        InfoCardComponent,
        VideoComponent,
        AnimeGridComponent,
        AnimeUserListEditorComponent,
        SelectComponent
    }
})
export default class AnimeView extends Vue {
    private loading: boolean = false;
    private animeDataContext: AnimeDataContext = new AnimeDataContext();
    private userListDataContext: UserListDataContext = new UserListDataContext();
    private contentDataContext: ContentDataContext = new ContentDataContext();

    private anime: Anime = new Anime();
    private entryVideoContents: Content[] = [];
    private userListEntry: UserList = new UserList();
    private entryMainTitle: EntryTitle = new EntryTitle();
    private entryMainDescription: Description = new Description();
    private entryTags: Tag[] = [];
    private entryDetails: Array<KeyValuePair<string, string>> = [];
    private additionalEntryInfos: KeyValuePair<string, string[]>[] = [];
    private similiarAnimes: Anime[] = [];

    private selectableRatings: SelectListItem[] = [];
    private selectableWatchingStates: SelectListItem[] = [];
    private selectedValue: string = "";

    created() {
        const animeId: number = +this.$route.params.id;

        this.selectableRatings = SelectListItemUtils.getItemsWithSameContent([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        this.selectableWatchingStates = SelectListItemUtils.getTranslatedItems(Constants.WatchingStates.WatchingStates);

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
                }
            });

            const getContents = this.contentDataContext.getAnimeContents(animeId);
            getContents.then(x => {
                if (x.successfully && x.data) {
                    this.entryVideoContents = x.data.filter(x => x.type == Constants.ContentTypes.Video);
                }
            });

            Promise.all([getAnime, getContents]).finally(() => this.loading = false);

            this.animeDataContext.getSimilarAnimes(animeId).then((similiarAnimesResult: RequestResult<Anime[]>) => {
                if (similiarAnimesResult.successfully && similiarAnimesResult.data) {
                    this.similiarAnimes = similiarAnimesResult.data;
                }
            });
        }
    }

    private setMainDescription() {
        if (this.anime.descriptions && this.anime.descriptions.length > 0) {
            this.entryMainDescription = this.anime.descriptions
                .some(x => x.language == Constants.Languages.German) ?
                    (this.anime.descriptions.find(x => x.language == Constants.Languages.German) as Description) : (_.first(this.anime.descriptions) as Description)
        }
    }

    private setEntryDetails() {
        if (this.anime) {
            let details: Array<KeyValuePair<string, string>> = [
                new KeyValuePair<string, string>({
                    key: "anime.details.format",
                    value: TranslationUtils.translate(this.anime.type)}),
                new KeyValuePair<string, string>({
                    key: "anime.details.state",
                    value: TranslationUtils.translate(this.anime.status)}),
                new KeyValuePair<string, string>({
                    key: "anime.details.episodes",
                    value: this.anime.episodes.toString()}),
                new KeyValuePair<string, string>({
                    key: "anime.details.adaption",
                    value: TranslationUtils.translate(this.anime.adaptation)}),
                new KeyValuePair<string, string>({
                    key: "anime.details.airedSeason",
                    value: `${TranslationUtils.translate(this.anime.airedSeason)} ${this.anime.airedYear}`}),
                new KeyValuePair<string, string>({
                    key: "anime.details.endingSeason",
                    value: `${TranslationUtils.translate(this.anime.endingSeason)} ${this.anime.endingYear}`}),
            ];

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
                this.userListDataContext.getAnimeEntry(this.anime.id).then((userListResult: RequestResult<UserList>) => {
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
        this.selectableRatings = SelectListItemUtils.getItemsWithSameContent([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        this.selectableWatchingStates = SelectListItemUtils.getTranslatedItems(Constants.WatchingStates.WatchingStates);
        this.userListEntry = new UserList();
    }

    private setAdditionalInformation() {
        let infos: KeyValuePair<string, string[]>[] = [];

        const otherTitles = this.anime.titles.filter(x => x != this.entryMainTitle);

        otherTitles.forEach(x => {
            infos.push(new KeyValuePair<string, string[]> ({
                key: x.language,
                value: [x.title]
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
        let element = this.selectableRatings.find(x => (+x.value) == this.userListEntry.overallRating) as SelectListItem;

        if (element) {
            SelectListItemUtils.updateSingleSelectSelection(this.selectableRatings, element);
        }
    }

    private overrideWatchingStateWithUserlistData() {
        let element = this.selectableWatchingStates.find(x => StringUtils.equalsIgnoreCase(x.value, this.userListEntry.status)) as SelectListItem;

        if (element) {
            SelectListItemUtils.updateSingleSelectSelection(this.selectableWatchingStates, element);
        }
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
            })
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
        Notification.addSuccess(TranslationUtils.translate("global.notification.savedSuccessfully")).show();
    }
}
</script>
