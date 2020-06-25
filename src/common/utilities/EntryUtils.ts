/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import EntryTitle from "@/common/models/EntryTitle";
import _ from "lodash";
import Settings from "../Settings";

export default class EntryUtils {
    public static getTitle(titles: EntryTitle[]) {
        return titles.some(x => x.language == Settings.FallbackPrimaryLanguage) ?
            (titles.find(x => x.language == Settings.FallbackPrimaryLanguage) as EntryTitle) : (_.first(titles) as EntryTitle);
    }
}