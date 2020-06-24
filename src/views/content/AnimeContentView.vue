<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<script lang="ts">
import Content from "@/common/models/Content";
import RequestResult from "@/common/models/RequestResult";
import ContentDataContext from "@/dataContexts/ContentDataContext";
import BaseEntryContentView from "@/views/content/BaseEntryContentView.vue";
import { Component } from "vue-property-decorator";

@Component
export default class AnimeContentView extends BaseEntryContentView {
    private contentDataContext = new ContentDataContext();

    protected async loadContents(): Promise<RequestResult<Content[]>> {
        return this.contentDataContext.getAnimeContents(this.entryId);
    }
}
</script>
