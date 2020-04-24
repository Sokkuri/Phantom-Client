/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Main from "@/main";

export default class TranslationUtils {
    public static translate(key: string): string {
        return Main.i18n.t(key).toString();
    }
}
