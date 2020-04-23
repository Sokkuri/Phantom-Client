import AuthData from "@/common/models/AuthData";

export default class UserSession {
    public static getSavedSession(): AuthData | null {
        const json = localStorage.getItem("Session");

        if (json) {
            return JSON.parse(json) as AuthData;
        }

        return null;
    }

    public static setSession(authData: AuthData) {
        authData.issueDate = new Date().toISOString();
        localStorage.setItem("Session", JSON.stringify(authData));
    }

    public static removeSavedSession() {
        localStorage.removeItem("Session");
    }
}
