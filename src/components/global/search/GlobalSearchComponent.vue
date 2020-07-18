<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseSearchComponent from "@/components/global/search/BaseSearchComponent.vue";
import SearchResult from "@/common/models/SearchResult";
import SearchDataContext from "@/dataContexts/SearchDataContext";

@Component
export default class GlobalSearchComponent extends BaseSearchComponent {
    private searchDataContext = new SearchDataContext();

    protected async executeSearch(searchTerm: string): Promise<SearchResult[] | undefined> {
        const result = await this.searchDataContext.globalSearch(searchTerm);
        return result.data;
    }
}
</script>
