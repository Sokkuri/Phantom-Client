/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import LocalTranslations from "@/translations/Translations";
import { Translations } from "@sokkuri/common";
import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";

Vue.use(VueI18n);

function getTranslations() {
    const translations: LocaleMessages = {
        "de": Object.assign({}, Translations.DE, LocalTranslations.DE)
    };

    return translations;
}

export default new VueI18n({
    locale: "de",
    fallbackLocale: "de",
    messages: getTranslations()
});
