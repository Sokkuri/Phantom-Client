/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import UserDataContext from "@/dataContexts/UserDataContext";
import { UserInfo } from "@sokkuri/common";

export default class CurrentUser {
    public static getUserInfo(): UserInfo | null {
        const json = window.localStorage.getItem("CurrentUser");

        if (json) {
            return JSON.parse(json) as UserInfo;
        }

        return null;
    }

    public static async saveUserInfo() {
        const userDataContext: UserDataContext = new UserDataContext();

        await userDataContext.getCurrentUserInfo().then(x => {
            if (x.successfully && x.data) {
                window.localStorage.setItem("CurrentUser", JSON.stringify(x.data));
            }
        });
    }
}
