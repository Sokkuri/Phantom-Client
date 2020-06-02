/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import UserSession from "@/common/security/UserSession";
import Settings from "@/common/Settings";
import TimeUtils from "@/common/utilities/TimeUtils";
import AuthenticationDataContext from "@/dataContexts/AuthenticationDataContext";
import AuthData from "../models/AuthData";
import RequestResult from "../models/RequestResult";
import SignInData from "../models/SignInData";

export default class UserSessionManager {
    public login(username: string, password: string) {
        const dataContext = new AuthenticationDataContext();
        const signInData: SignInData = {
            grant_type: "password",
            username: username,
            password: password,
            refresh_token: undefined,
            client_id: Settings.ClientId
        }

        dataContext.login(signInData).then((result: RequestResult<AuthData>) => {
            if (result.successfully && result.data) {
                UserSession.setSession(result.data);
            }
        });
    }

    public logout() {
        const dataContext = new AuthenticationDataContext();

        dataContext.logout().then(() => {
            UserSession.removeSavedSession();
        });
    }

    public async getCurrentSession(): Promise<AuthData | null> {
        const savedSession = UserSession.getSavedSession();

        if (savedSession) {
            if (this.validateAccessToken(savedSession)) {
                return savedSession;
            } else if (!UserSession.RefreshInProgress) {
                UserSession.RefreshInProgress = true;

                const sessionRefreshResult = await this.refresh(savedSession);

                if (!sessionRefreshResult.successfully || !sessionRefreshResult.data) {
                    UserSession.removeSavedSession();
                    UserSession.RefreshInProgress = false;
                    return null;
                }

                UserSession.setSession(sessionRefreshResult.data);
                UserSession.RefreshInProgress = false;

                return sessionRefreshResult.data;
            }
        }

        return null;
    }

    public sessionExists(): boolean {
        const savedSession = UserSession.getSavedSession();

        return savedSession ? true : false;
    }

    private async refresh(session: AuthData): Promise<RequestResult<AuthData>> {
        const dataContext = new AuthenticationDataContext();
        const signInData: SignInData = {
            grant_type: "refresh_token",
            username: undefined,
            password: undefined,
            refresh_token: session.refresh_token,
            client_id: Settings.ClientId
        }

        return dataContext.refresh(signInData).then((x: RequestResult<AuthData>) => {
            return x;
        });
    }

    private validateAccessToken(authData: AuthData): boolean {
        if (authData.issueDate) {
            const issueDate = TimeUtils.parseISO(authData.issueDate);
            const expirationDate = TimeUtils.addSeconds(issueDate, authData.expires_in);

            if (TimeUtils.isAfter(expirationDate, new Date())) {
                return true;
            }
        }

        return false;
    }
}
