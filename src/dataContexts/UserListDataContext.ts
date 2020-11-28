/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import UserListStatsViewModel from "@/common/viewModels/UserListStatsViewModel";
import { UserListEntry } from "@sokkuri/common";

export default class UserListDataContext extends BaseDataContext {
    constructor() {
        super("userList");
    }

    public async getAnimeEntry(animeId: number): Promise<RequestResult<UserListEntry>> {
        return super.get(`getAnimeEntry?id=${animeId}`);
    }

    public async getAnimeEntriesBySeason(season: string, year: string): Promise<RequestResult<UserListEntry[]>> {
        return super.post("getAnimeEntriesBySeason", { season, year });
    }

    public async getAnimeEntries(userName: string): Promise<RequestResult<UserListEntry[]>> {
        return super.get(`getAnimeEntries?userName=${userName}`);
    }

    public async addAnime(animeId: number): Promise<RequestResult<void>> {
        return super.post(`addAnime?id=${animeId}`, null);
    }

    public async deleteAnimeEntry(animeId: number): Promise<RequestResult<void>> {
        return super.delete(`deleteAnimeEntry?animeId=${animeId}`);
    }

    public async setAnimeState(id: number, state: string): Promise<RequestResult<void>> {
        return super.post("setAnimeState", { id, state });
    }

    public async setAnimeRating(id: number, rating: number): Promise<RequestResult<void>> {
        return super.post("setAnimeRating", { id, rating });
    }

    public async saveChanges(id: number, overallRating: number, state: string, currentEpisode: number): Promise<RequestResult<void>> {
        return super.post("saveChanges", { id, overallRating, state, currentEpisode });
    }

    public async getAnimeUserListStats(userName: string): Promise<RequestResult<UserListStatsViewModel>> {
        return super.get(`getAnimeUserListStats?userName=${userName}`);
    }
}
