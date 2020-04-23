import "date-fns";
import { parseISO, isBefore, addMinutes, isAfter } from "date-fns";

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
}
