/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import { Anime, SeasonInfo } from "@sokkuri/common";

export default class SeasonDataContext extends BaseDataContext {
    constructor() {
        super("season");
    }

    public async getSeasonInfo(): Promise<RequestResult<SeasonInfo[]>> {
        return super.get<SeasonInfo[]>("getSeasonInfo");
    }

    public async getSeasonAnimes(season: string, year: string): Promise<RequestResult<Anime[]>> {
        return super.post<Anime[]>("getSeasonAnimes", {season, year});
    }
}
