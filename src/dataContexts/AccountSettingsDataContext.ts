/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import AccountDataViewModel from "@/common/viewModels/AccountDataViewModel";

export default class AccountSettingsDataContext extends BaseDataContext {
    constructor() {
        super("accountSettings");
    }

    public async getAccountData(): Promise<RequestResult<AccountDataViewModel>> {
        return super.get<AccountDataViewModel>("getAccountData");
    }

    public async saveAccountData(userName: string, email: string): Promise<RequestResult<void>> {
        return super.post<void>("saveAccountData", { userName, email });
    }

    public async changePassword(password: string, currentPassword: string): Promise<RequestResult<void>> {
        return super.post<void>("changePassword", { password, currentPassword });
    }
}
