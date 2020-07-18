/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import "date-fns";
import { addMinutes, addSeconds, format, isAfter, isBefore, parseISO } from "date-fns";

export default class TimeUtils {
    public static parseISO(source: string): Date {
        return parseISO(source);
    }

    public static isBefore(d1: Date, d2: Date): boolean {
        return isBefore(d1, d2);
    }

    public static isAfter(d1: Date, d2: Date): boolean {
        return isAfter(d1, d2);
    }

    public static addMinutes(sourceDate: Date, amount: number): Date {
        return addMinutes(sourceDate, amount);
    }

    public static addSeconds(sourceDate: Date, amount: number): Date {
        return addSeconds(sourceDate, amount);
    }

    public static format(sourceDate: Date, dateFormat: string): string {
        return format(sourceDate, dateFormat);
    }
}
