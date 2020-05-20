/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import Content from "@/common/models/Content";
import RequestResult from "@/common/models/RequestResult";

export default class ContentDataContext extends BaseDataContext {
    constructor() {
        super("Content");
    }

    public async getAnimeContents(animeId: number): Promise<RequestResult<Array<Content>>> {
        return super.get("getAnimeContents/" + animeId);
    }
}
