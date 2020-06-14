/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import RequestResult from "@/common/models/RequestResult";
import Notification from "@/common/Notification";
import UserSessionManager from "@/common/security/UserSessionManager";
import Settings from "@/common/Settings";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import Main from "@/main";
import Axios, { AxiosError, AxiosResponse } from "axios";

export abstract class BaseDataContext {
    private apiUrl: string = Settings.ApiUrl;
    private controllerName: string;

    constructor(controllerName: string) {
        this.controllerName = controllerName;
    }

    public buildUrl(methode: string): string {
        return this.apiUrl + this.controllerName + "/" + methode;
    }

    protected async get<T>(methode: string): Promise<RequestResult<T>> {
        const instance = Axios.create();
        const session = await new UserSessionManager().getCurrentSession();

        if (session) {
            instance.defaults.headers.common["Authorization"] = (`Bearer ${session.access_token}`);
        }

        return instance.get(this.buildUrl(methode)).then((x: AxiosResponse) => {
            return new RequestResult<T>({ successfully: true, statusCode: x.status, data: x.data });
        }).catch((error: AxiosError) => {
            const result = new RequestResult<T>({ successfully: false, statusCode: error.response ? error.response.status : undefined });

            this.handleError(result);

            return result;
        });
    }

    protected async post<T>(methode: string, data: any): Promise<RequestResult<T>> {
        const instance = Axios.create();
        const session = await new UserSessionManager().getCurrentSession();

        if (session) {
            instance.defaults.headers.common["Authorization"] = (`Bearer ${session.access_token}`);
        }

        return instance.post(this.buildUrl(methode), data).then((x: AxiosResponse) => {
            return new RequestResult<T>({ successfully: true, statusCode: x.status, data: x.data });
        }).catch((error: AxiosError) => {
            const result = new RequestResult<T>({ successfully: false, statusCode: error.response ? error.response.status : undefined });

            this.handleError(result);

            return result;
        });
    }

    private handleError<T>(result: RequestResult<T>) {
        switch (result.statusCode) {
            case 401:
                // Redirect to loginpage when response is unauthorized
                Main.router.push({ name: "login" });
                break;

            case 400:
                Notification.addError(TranslationUtils.translate("global.notification.actionError"), false).show();
                break;

            case 500:
                // ToDo: Errorpage
                break;

            default:
                break;
        }
    }
}
