/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import KeyValuePair from "@/common/models/KeyValuePair";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import { SelectListItem } from "keiryo";
import { Vue } from "vue-property-decorator";

export default class SelectListItemUtils {
    public static getTranslatedItems(translationKeys: string[], preselectedKeys?: string[]): SelectListItem[] {
        const items: SelectListItem[] = [];

        translationKeys.forEach((x) => {
            if (preselectedKeys && preselectedKeys.some(y => y == x)) {
                items.push(new SelectListItem({label: TranslationUtils.translate(x), value: x, selected: true }));
            } else {
                items.push(new SelectListItem({label: TranslationUtils.translate(x), value: x }));
            }
        });

        return items;
    }

    public static getItemsWithSameContent<T extends string | number>(values: T[]): SelectListItem[] {
        const items: SelectListItem[] = [];

        values.forEach((x: T) => {
            items.push(new SelectListItem({label: x.toString(), value: x}));
        });

        return items;
    }

    public static getTranslatedPairItems<T>(pairs: KeyValuePair<string, T>[]): SelectListItem[] {
        const items: SelectListItem[] = [];

        pairs.forEach((x: KeyValuePair<string, T>) => {
            items.push(new SelectListItem({label: TranslationUtils.translate(x.key), value: x.value }));
        });

        return items;
    }

    public static updateSingleSelectSelection(items: SelectListItem[], selectedItem: SelectListItem) {
        items.forEach(x => {
            if (x === selectedItem) {
                x.selected = true;
            } else {
                x.selected = false;
            }
        });

        const selectedItemIndex = items.findIndex(x => x === selectedItem);
        const updatedElement = items[selectedItemIndex];

        Vue.set(items, selectedItemIndex, updatedElement);
    }
}
