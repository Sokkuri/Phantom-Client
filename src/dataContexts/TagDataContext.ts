/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import Tag from "@/common/models/Tag";

export default class TagDataContext extends BaseDataContext {
    constructor() {
        super("tag");
    }

    public getAvailableTags(): Promise<RequestResult<Tag[]>> {
        return super.get<Tag[]>("getAvailableTags");
    }
}
