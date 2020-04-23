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
}
