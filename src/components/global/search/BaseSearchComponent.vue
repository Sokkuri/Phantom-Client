<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="search">
        <div ref="inputContainer" class="control">
            <input ref="inputElement" class="input" type="search" autocomplete="off" v-on:input="onInput()" v-on:focus="resultVisibility(true)" v-on:blur="resultVisibility(false)">
        </div>
        <div ref="searchResults" class="search-results">
            <ol>
                <li v-if="searchResults.length == 0 && !initState">{{ $t("components.search.noResults") }}</li>
                <li
                    v-for="result in searchResults"
                    v-bind:key="getUrl(result)">
                    <router-link v-bind:to="getUrl(result)">
                        {{ result.label }}
                    </router-link>
                </li>
            </ol>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SearchResult from "@/common/models/SearchResult";
import _ from "lodash";
import { CancelTokenSource } from "axios";

export default abstract class BaseSearchComponent extends Vue {
    private searchResults: SearchResult[] = [];
    private initState: boolean = true;

    private getUrl(result: SearchResult): string {
        return `/${result.dataType}/${result.dataId}`;
    }

    private resultVisibility(visibility: boolean) {
        const element = this.$refs.searchResults as HTMLDivElement;

        if (element) {
            if (visibility) {
                element.style.display = "";
            } else {
                setTimeout(() => element.style.display="none", 250);
            }
        }
    }

    private onInput = _.debounce(this.search, 700);

    private search() {
        const inputContainer = this.$refs.inputContainer as HTMLDivElement;
        const inputElement = this.$refs.inputElement as HTMLInputElement;
        const searchTerm = inputElement.value;

        if (searchTerm && /\S/.test(searchTerm) && searchTerm.length >= 3) {
            inputContainer.classList.add("is-loading");

            this.executeSearch(searchTerm).then(x => {
                if (x) {
                    this.searchResults = x;
                }
            }).finally(() => {
                inputContainer.classList.remove("is-loading")
                this.initState = false;
            });
        }
    }

    protected abstract async executeSearch(searchTerm: string): Promise<SearchResult[] | undefined>;
}
</script>
