/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import Anime from "@/common/models/Anime";
import RequestResult from "@/common/models/RequestResult";
import SeasonInfo from "@/common/models/SeasonInfo";

export default class SeasonDataContext extends BaseDataContext {
    constructor() {
        super("season");
    }

    public async getSeasonInfo(): Promise<RequestResult<SeasonInfo[]>> {
        return super.get<SeasonInfo[]>("getSeasonInfo").then(x => {
            return x;
        });
    }

    public async getSeasonAnimes(info: SeasonInfo): Promise<RequestResult<Anime[]>> {
        return super.post<Anime[]>("getSeasonAnimes", info).then(x => {
            return x;
        });
    }
}
