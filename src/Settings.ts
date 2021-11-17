/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Constants } from "@sokkuri/common";

export default {
    Commit: process.env.VUE_APP_COMMIT,
    Name: "Sokkuri",
    ApiUrl: "/api/",
    FilesUrl: "/files/",
    ClientId: "phantom",
    Language: navigator.language?.startsWith("de") ? "de" : "en",

    // ToDo: Temporary!
    FallbackPrimaryLanguage: Constants.Languages.English,
    HCaptcha: {
        SiteKey: "8ee40008-1f08-4f31-b1df-dd67294cfaaa"
    },
};
