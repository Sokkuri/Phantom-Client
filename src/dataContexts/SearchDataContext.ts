/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import Anime from "@/common/models/Anime";
import RequestResult from "@/common/models/RequestResult";
import SearchResult from "@/common/models/SearchResult";
import SearchSettings from "@/common/models/SearchSettings";

export default class SearchDataContext extends BaseDataContext {
    constructor() {
        super("search");
    }

    public async globalSearch(searchTerm: string): Promise<RequestResult<SearchResult[]>> {
        return super.get(`globalSearch?searchTerm=${searchTerm}`);
    }

    public async animeSearch(settings: SearchSettings): Promise<RequestResult<Anime[]>> {
        return super.post<Anime[]>("animeSearch", settings);
    }
}
