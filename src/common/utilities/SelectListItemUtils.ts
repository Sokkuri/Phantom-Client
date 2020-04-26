/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import SelectListItem from "../models/SelectListItem";
import TranslationUtils from "./TranslationUtils";

export default class SelectListItemUtils {
    public static getTranslatedItems(translationKeys: string[]): SelectListItem[] {
        let items: SelectListItem[] = [];

        translationKeys.forEach((x) => {
            items.push(new SelectListItem({label: TranslationUtils.translate(x), value: x }));
        });

        return items;
    }

    public static getItemsWithSameContent<T extends string | number>(values: T[]): SelectListItem[] {
        let items: SelectListItem[] = [];

        values.forEach((x: T) => {
            items.push(new SelectListItem({label: x.toString(), value: x}));
        });

        return items;
    }
}
