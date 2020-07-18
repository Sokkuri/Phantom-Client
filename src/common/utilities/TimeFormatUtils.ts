/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import TimeUtils from "@/common/utilities/TimeUtils";

export default class TimeFormatUtils {
    public static getDate(date: string) {
        const d = TimeUtils.parseISO(date);

        if (navigator.language == "de-DE") {
            return TimeUtils.format(d, "dd.MM.yyyy");
        } else {
            return TimeUtils.format(d, "yyyy-MM-dd");
        }
    }

    public static getDateTime(date: string) {
        const d = TimeUtils.parseISO(date);

        if (navigator.language == "de-DE") {
            return TimeUtils.format(d, "dd.MM.yyyy HH:mm:ss");
        } else {
            return TimeUtils.format(d, "yyyy-MM-dd hh:mm:ss a");
        }
    }
}
