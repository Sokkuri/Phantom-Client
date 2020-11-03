<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import BaseUserListEditorComponent from "@/components/global/userListEditor/BaseUserListEditorComponent.vue";
import RecensionDataContext from "@/dataContexts/RecensionDataContext";
import RequestResult from "@/common/models/RequestResult";
import UserListDataContext from "@/dataContexts/UserListDataContext";
import { Recension } from "@sokkuri/common";

@Component
export default class AnimeUserListEditorComponent extends BaseUserListEditorComponent {
    @Prop() private animeId!: number;

    private userListDataContext: UserListDataContext = new UserListDataContext();
    private recensionDataContext = new RecensionDataContext();

    protected async saveRecensionData(): Promise<RequestResult<void>> {
        return this.recensionDataContext.saveAnimeRecension(
            this.animeId,
            this.recension);
    }

    protected async loadRecensionData(): Promise<RequestResult<Recension>> {
        return this.recensionDataContext.getAnimeRecension(this.animeId);
    }

    protected async deleteUserListEntry(): Promise<RequestResult<void>> {
        return this.userListDataContext.removeAnime(this.animeId);
    }

    protected async deleteUserRecension(): Promise<RequestResult<void>> {
        return this.recensionDataContext.removeAnimeRecension(this.animeId);
    }
}
</script>
