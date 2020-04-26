<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="anime-view">
        <section class="section info-header">
            <div class="container">
                <SpinnerComponent v-if="loading" />
                <div class="columns is-multiline">
                    <div class="column is-2">
                        <ImageComponent
                            v-if="anime.systemFile"
                            v-bind:imageUrl="'/api/files/' + anime.systemFile.name"
                        />
                        <button class="button is-primary is-fullwidth">Loading</button>
                    </div>
                    <div class="column is-10">
                        <h1 class="title">{{ entryMainTitle.title }}</h1>
                        <RatingComponent v-bind:selected="anime.overallRating" />
                        <DescriptionComponent
                            v-bind:content="entryMainDescription.content"
                            v-bind:source="entryMainDescription.source"
                        />
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-2">
                        <DropdownComponent
                            v-bind:elements="selectableRatings"
                            v-bind:searchEnabled="false"
                            v-bind:placeholder="true"
                            @selectionChange="onEntryRatingChange"
                        />
                        <DropdownComponent
                            v-bind:elements="watchingStates"
                            v-bind:searchEnabled="false"
                            v-bind:placeholder="true"
                            @selectionChange="onEntryStateChange"
                        />
                        <button class="button is-fullwidth" v-on:click="onAddAnimeToListClick">{{ $t("anime.button.addToList") }}</button>
                    </div>
                    <div class="column is-10">
                        <h2 class="title">{{ $t("anime.heading.tags") }}</h2>
                        <div class="columns is-multiline"
                            v-if="anime.tags">
                            <div class="column is-10">
                                <TagComponent
                                    v-for="tag in anime.tags"
                                    v-bind:key="tag.id"
                                    v-bind:content="$t(tag.translationKey)"
                                />
                            </div>
                        </div>
                        <h2 class="title">{{ $t("anime.heading.details") }}</h2>
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
                        <h2 class="title">{{ $t("anime.heading.companies") }}</h2>
                        <div class="columns is-multiline">
                            <div class="column is-is-2"
                                v-for="company in anime.companies"
                                v-bind:key="company.name">
                                <InfoCardComponent
                                    v-bind:content="company.name"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
import DropdownComponent from "@/components/global/DropdownComponent.vue";
import SelectListItem from "@/common/models/SelectListItem";
import SelectListItemUtils from "@/common/utilities/SelectListItemUtils";
import Notification from "@/common/Notification";
import UserListDataContext from "@/dataContexts/UserListDataContext";
import RequestResult from "@/common/models/RequestResult";
import UserList from "@/common/models/UserList";
import UserSessionManager from "@/common/security/UserSessionManager";
import InfoCardComponent from "@/components/entry/InfoCardComponent.vue";
import KeyValuePair from "@/common/models/KeyValuePair";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import TagComponent from "@/components/entry/TagComponent.vue";
import Tag from "@/common/models/Tag";

@Component({
    components: {
        ImageComponent,
        DescriptionComponent,
        SpinnerComponent,
        RatingComponent,
        DropdownComponent,
        InfoCardComponent,
        TagComponent
    }
})
export default class AnimeView extends Vue {
    private loading: boolean = false;
    private animeDataContext: AnimeDataContext = new AnimeDataContext();
    private userListDataContext: UserListDataContext = new UserListDataContext();

    private anime: Anime = new Anime();
    private userListEntry: UserList = new UserList();
    private entryMainTitle: EntryTitle = new EntryTitle();
    private entryMainDescription: Description = new Description();
    private entryTags: Tag[] = [];
    private entryDetails: Array<KeyValuePair<string, string>> = [];

    private selectableRatings: SelectListItem[] = [];
    private watchingStates: SelectListItem[] = [];
    private selectedValue: string = "";

    created() {
        const animeId: number = +this.$route.params.id;

        this.selectableRatings = SelectListItemUtils.getItemsWithSameContent([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        this.watchingStates = SelectListItemUtils.getTranslatedItems(Constants.WatchingStates.WatchingStates);

        if (animeId) {
            this.loading = true;

            this.animeDataContext.getAnime(animeId).then((animeResult: RequestResult<Anime>) => {
                if (animeResult.successfully && animeResult.data) {
                    this.anime = animeResult.data;

                    this.setMainTitle();
                    this.setMainDescription();
                    this.setEntryDetails();

                    // Only load the userlist date when there is a session.
                    new UserSessionManager().getCurrentSession().then((session => {
                        if (session) {
                            this.userListDataContext.getAnimeEntry(animeId).then((userListResult: RequestResult<UserList>) => {
                                if (userListResult.successfully && userListResult.data) {
                                    this.userListEntry = userListResult.data;

                                    this.overrideRatingWithUserlistData();
                                    this.overrideWatchingStateWithUserlistData();
                                }
                            });
                        }
                    }));
                }
            }).finally(() => {
                this.loading = false;
            });
        }
    }

    private setMainTitle() {
        if (this.anime.titles && this.anime.titles.length > 0) {
            this.entryMainTitle = this.anime.titles
                .some(x => x.language == Constants.Languages.German) ?
                    (this.anime.titles.find(x => x.language == Constants.Languages.German) as EntryTitle) : (_.first(this.anime.titles) as EntryTitle)
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

    private overrideWatchingStateWithUserlistData() {
        let element = this.selectableRatings.find(x => (+x.value) == this.userListEntry.overallRating) as SelectListItem;
        const index = this.selectableRatings.indexOf(element);

        element.selected = true;

        Vue.set(this.selectableRatings, index, element);
    }

    private overrideRatingWithUserlistData() {
        let element = this.watchingStates.find(x => x.value == this.userListEntry.status) as SelectListItem;
        const index = this.watchingStates.indexOf(element);

        element.selected = true;

        Vue.set(this.watchingStates, index, element);
    }

    private onEntryRatingChange(value: number): void {
        if (value) {
            this.userListDataContext.setAnimeRating(this.anime.id, value).then((x: RequestResult<void>) => {
                if (x.successfully) {
                    this.showSuccessfullySaveNotification();
                }
            })
        }
    }

    private onEntryStateChange(value: string): void {
        if (value) {
            this.userListDataContext.setAnimeState(this.anime.id, value).then((x: RequestResult<void>) => {
                if (x.successfully) {
                    this.showSuccessfullySaveNotification();
                }
            });
        }
    }

    private onAddAnimeToListClick() {
        this.userListDataContext.addAnime(this.anime.id).then((x: RequestResult<void>) => {
            if (x.successfully) {
                this.showSuccessfullySaveNotification();
            }
        });
    }

    private showSuccessfullySaveNotification() {
        Notification.addSuccess(TranslationUtils.translate("global.notification.savedSuccessfully")).show();
    }
}
</script>
