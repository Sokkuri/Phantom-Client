/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import { VersionInfo } from "@sokkuri/common";

export default class ConfigurationContext extends BaseDataContext {
    constructor() {
        super("configuration");
    }

    public getVersion(): Promise<RequestResult<VersionInfo>> {
        return super.get<VersionInfo>("getVersion");
    }
}
