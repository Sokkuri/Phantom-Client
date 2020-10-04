/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Constants from "@/common/Constants";
import Settings from "@/settings.json";

export default {
    ApiUrl: Settings.ApiUrl,
    FilesUrl: Settings.FilesUrl,
    ClientId: Settings.ClientId,
    FallbackPrimaryLanguage: Constants.Languages.English,
    HCaptcha: {
        SiteKey: Settings.HCaptcha.SiteKey
    }
};
