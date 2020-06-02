/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default class SearchSettings {
    page: number;
    types: string[];
    states: string[];
    includedTagIds?: number[];
    excludedTagIds?: number[];
    includedContentCompanyIds?: number[];

    constructor(options: {
        page: number,
        types: string[],
        states: string[],
        includedTagIds?: number[],
        excludedTagIds?: number[],
        includedContentCompanyIds?: number[] }) {
            this.page = options.page;
            this.types = options.types;
            this.states = options.states;
            this.includedTagIds = options.includedTagIds;
            this.excludedTagIds = options.excludedTagIds;
            this.includedContentCompanyIds = options.includedContentCompanyIds;
        }
}
