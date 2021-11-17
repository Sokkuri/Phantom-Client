/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Settings from "@/Settings";
import dayjs from "dayjs";

export default class TimeUtils {
    public static formatDate(date: string) {
        return dayjs(date).format(Settings.Language == "de" ? "DD.MM.YYYY" : "YYYY-MM-DD");
    }

    public static formatDateTime(date: string) {
        return dayjs(date).format(Settings.Language == "de" ? "DD.MM.YYYY HH:mm:ss": "YYYY-MM-DD HH:mm:ss a");
    }
}
