/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default class StringUtils {
    public static equalsIgnoreCase(source: string, expected: string): boolean {
        return source?.toLowerCase() == expected?.toLowerCase();
    }

    public static shorten(source: string, maxLenght: number) {
        if (source.length <= maxLenght) {
            return source;
        } else {
            return source.substr(0, source.lastIndexOf(" ", maxLenght));
        }
    }
}
