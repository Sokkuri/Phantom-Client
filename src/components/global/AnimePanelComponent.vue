<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="anime-panel">
        <div class="columns is-multiline">
            <div class="column is-12 panel-header">
                <div class="level">
                    <div class="level-item">
                        <router-link v-bind:to="'/anime/' + anime.id" :title="getPrimaryTitle(anime.titles)">
                            {{ getPrimaryTitle(anime.titles) }}
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="column is-12">
                <div class="level">
                    <div class="level-item">
                        <span class="tag is-rounded"
                            v-for="tag in getTagsToDisplay(anime.tags)"
                            v-bind:key="tag.id">{{ $t(tag.translationKey) }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="column is-5 panel-image">
                <ImageComponent v-bind:fileName="anime.systemFile.name" />
            </div>
            <div class="column is-7 panel-description">
                <p>{{ getPrimaryDescription(anime.descriptions) }}</p>
                <div v-if="userSessionManager.sessionExists()">
                    <span class="icon" v-if="userListEntry || addedToList">
                        <font-awesome-icon class="is-vcentered" :icon="['fas', 'check-circle']" />
                    </span>
                    <span class="icon" v-bind:title="$t('component.animePanel.addToListTooltip')" @click="addToList" v-else>
                        <font-awesome-icon class="is-vcentered" :icon="['fas', 'plus-circle']" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "@/components/global/ImageComponent.vue";
import EntryUtils from "@/common/utilities/EntryUtils";
import _ from "lodash";
import StringUtils from "@/common/utilities/StringUtils";
import UserListDataContext from "@/dataContexts/UserListDataContext";
import Notification from "@/common/Notification";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import { UserSessionManager } from "kogitte";
import { Anime, EntryTitle, Tag, Description, UserListEntry } from "@sokkuri/common";

@Component({
    components: {
        ImageComponent
    }
})
export default class AnimePanelComponent extends Vue {
    @Prop({ required: true }) private anime!: Anime;
    @Prop() private userListEntry: UserListEntry;

    private addedToList = false;

    private userListDataContext = new UserListDataContext();
    private userSessionManager = new UserSessionManager();

    private getPrimaryTitle(titles: EntryTitle[]) {
        return EntryUtils.getTitle(titles).title;
    }

    private getPrimaryDescription(descriptions: Description[]) {
        const description = EntryUtils.getDescription(descriptions);

        if (description.content.length > 100) {
            return `${StringUtils.shorten(description.content, 250)} ...`;
        }

        return description.content;
    }

    private getTagsToDisplay(tags: Tag[]) {
        return _.take(tags, 4);
    }

    private addToList() {
        this.userListDataContext.addAnime(this.anime.id).then(x => {
            if (x.successfully) {
                this.addedToList = true;
                Notification.addSuccess(TranslationUtils.translate("global.notification.savedSuccessfully")).show();
            }
        });
    }

    private translate(key: string) {
        return TranslationUtils.translate(key);
    }
}
</script>
