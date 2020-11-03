/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import { Anime, EntryTitle } from "@sokkuri/common";

export default class AnimeDataContext extends BaseDataContext {
    constructor() {
        super("anime");
    }

    public async getAnime(id: number): Promise<RequestResult<Anime>> {
        return super.get<Anime>(`getAnime/${id}`);
    }

    public async getSimilarAnimes(id: number): Promise<RequestResult<Anime[]>> {
        return super.get<Anime[]>(`getSimilarAnimes/${id}`);
    }

    public async getTitles(id: number): Promise<RequestResult<EntryTitle[]>> {
        return super.get<EntryTitle[]>(`getTitles/${id}`);
    }
}
