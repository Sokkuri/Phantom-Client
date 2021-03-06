<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <ModalComponent
        ref="modal">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-4">
                        <label class="label">{{ $t("userListEntryEditor.label.state") }}</label>
                        <SelectComponent
                            :name="'editorState'"
                            :elements="selectableWatchingStates"
                            :searchEnabled="false"
                            :placeholder="true"
                            v-model="editedUserListEntry.status"
                        />
                    </div>
                    <div class="column is-4">
                        <label class="label">{{ $t("userListEntryEditor.label.rating") }}</label>
                        <SelectComponent
                            :name="'editorRating'"
                            :elements="selectableRatings"
                            :searchEnabled="false"
                            :placeholder="true"
                            v-model="editedUserListEntry.overallRating"
                        />
                    </div>
                    <div class="column is-4">
                        <label class="label">{{ $t("userListEntryEditor.label.episode") }}</label>
                        <input class="input" v-model="editedUserListEntry.currentEpisode" type="number" min="0" max="100">
                    </div>
                    <div class="column is-12">
                        <label class="label">{{ $t("userListEntryEditor.label.review") }}</label>
                        <textarea class="textarea is-fullwidth" v-model="recension"></textarea>
                    </div>
                    <div class="column is-12">
                        <button class="button is-primary" v-on:click="onSaveClick">{{ $t("userListEntryEditor.button.save") }}</button>
                        <button class="button danger" v-on:click="onDeleteClick">
                            <font-awesome-icon :icon="['far', 'trash-alt']" size="2x" />
                        </button>
                    </div>
                </div>
            </div>
    </ModalComponent>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ModalComponent from "@/components/global/ModalComponent.vue";
import { SelectComponent, SelectListItem, SelectListItemUtils } from "keiryo";
import UserListDataContext from "@/dataContexts/UserListDataContext";
import RequestResult from "@/common/models/RequestResult";
import Notification from "@/common/Notification";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import { Constants, Recension, UserListEntry } from "@sokkuri/common";

@Component({
    components: {
        ModalComponent,
        SelectComponent
    }
})
export default class BaseUserListEditorComponent extends Vue {
    @Prop() private userListEntry!: UserListEntry;

    private selectableRatings: SelectListItem[] = [];
    private selectableWatchingStates: SelectListItem[] = [];

    private editedUserListEntry: UserListEntry = new UserListEntry();
    protected recension = "";

    mounted() {
        this.selectableRatings = SelectListItemUtils.getItems<number>([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], (x) => x.toString(), (x) => x.toString());
        this.selectableWatchingStates = SelectListItemUtils.getItems(Constants.UserList.EntryState.AnimeStates, TranslationUtils.translate, (x) => x);

        this.setData();
    }

    @Watch("userListEntry", { deep: true }) onUserListEntryChange() {
        this.setData();
    }

    private setData() {
        this.editedUserListEntry = this.userListEntry;

        this.overrideWatchingStateWithUserlistData();
        this.overrideRatingWithUserlistData();

        this.loadRecensionData().then((x: RequestResult<Recension>) => {
            if (x.successfully && x.data) {
                this.recension = x.data.content;
            }
        });
    }

    private toggleVisibility() {
        const element = this.$refs.modal as ModalComponent;
        element.toggleVisibility();
    }

    private overrideWatchingStateWithUserlistData() {
        SelectListItemUtils.updateSelection(this.selectableWatchingStates, [ this.userListEntry.status ]);
    }

    private overrideRatingWithUserlistData() {
        SelectListItemUtils.updateSelection(this.selectableRatings, [ this.userListEntry.overallRating?.toString() ]);
    }

    private async onSaveClick() {
        const userListSaveResult: RequestResult<void> = await this.saveUserListData();

        if (this.recension != "") {
            const recensionSaveResult: RequestResult<void> = await this.saveRecensionData();

            if (userListSaveResult.successfully && recensionSaveResult.successfully) {
                this.handleSuccessfullySave();
                return;
            }
        }

        if (userListSaveResult.successfully) {
            this.handleSuccessfullySave();
        }
    }

    private async onDeleteClick() {
        const userListEntryDeleteResult: RequestResult<void> = await this.deleteUserListEntry();
        const userRecensionDeleteResult: RequestResult<void> = await this.deleteUserRecension();

        if (userListEntryDeleteResult.successfully && userRecensionDeleteResult.successfully) {
            this.$emit("deleted-entry");
            Notification.addSuccess(TranslationUtils.translate("notification.deletedSuccessfully")).show();
            this.toggleVisibility();
        }
    }

    private handleSuccessfullySave() {
        this.$emit("saved-changes", this.editedUserListEntry);
        Notification.addSuccess(TranslationUtils.translate("notification.savedSuccessfully")).show();
    }

    private async saveUserListData(): Promise<RequestResult<void>> {
        const userListDataContext = new UserListDataContext();

        return userListDataContext.saveChanges(
            this.userListEntry.id,
            this.editedUserListEntry.overallRating,
            this.editedUserListEntry.status,
            this.editedUserListEntry.currentEpisode);
    }

    protected async saveRecensionData(): Promise<any> {}
    protected async loadRecensionData(): Promise<any> {}
    protected async deleteUserListEntry(): Promise<any> {}
    protected async deleteUserRecension(): Promise<any> {}
}
</script>
