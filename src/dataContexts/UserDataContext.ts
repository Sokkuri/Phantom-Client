/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import UserInfo from "@/common/models/UserInfo";

export default class UserDataContext extends BaseDataContext {
    constructor() {
        super("user");
    }

    public async getUserInfo(userName: string): Promise<RequestResult<UserInfo>> {
        return super.get(`getUserInfo?userName=${userName}`);
    }

    public async getCurrentUserInfo(): Promise<RequestResult<UserInfo>> {
        return super.get("getCurrentUserInfo");
    }
}
