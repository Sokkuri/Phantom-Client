import Main from "@/main";

export default class TranslationUtils {
    public static translate(key: string): string {
        return Main.i18n.t(key).toString();
    }
}
