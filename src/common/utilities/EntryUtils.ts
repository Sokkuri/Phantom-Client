/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Settings from "@/Settings";
import { Description, EntryTitle } from "@sokkuri/common";
import _ from "lodash";

export default class EntryUtils {
    public static getTitle(titles: EntryTitle[]) {
        return titles.some(x => x.language == Settings.FallbackPrimaryLanguage) ?
            (titles.find(x => x.language == Settings.FallbackPrimaryLanguage) as EntryTitle) : (_.first(titles) as EntryTitle);
    }

    public static getDescription(descriptions: Description[]) {
        return descriptions.some(x => x.language == Settings.FallbackPrimaryLanguage) ?
            (descriptions.find(x => x.language == Settings.FallbackPrimaryLanguage) as Description) : (_.first(descriptions) as Description);
    }
}
