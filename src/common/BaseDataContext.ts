/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import GlobalEventBus from "@/common/GlobalEventBus";
import RequestResult from "@/common/models/RequestResult";
import Notification from "@/common/Notification";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import Main from "@/main";
import Settings from "@/Settings";
import Axios, { AxiosError } from "axios";
import { UserSessionManager } from "kogitte";

export abstract class BaseDataContext {
    private controllerName: string;

    constructor(controllerName: string) {
        this.controllerName = controllerName;
    }

    protected async get<T>(methode: string): Promise<RequestResult<T>> {
        return (await this.getAxiosInstance()).get(this.buildUrl(methode)).then(x => {
            return Promise.resolve<RequestResult<T>>({
                successfully: true,
                statusCode: x.status,
                data: x.data
            });
        }).catch((error: AxiosError) => {
            return Promise.resolve<RequestResult<T>>({
                successfully: false,
                statusCode: error.response ? error.response.status : undefined,
                data: error.response ? error.response.data : undefined
            });
        });
    }

    protected async post<T>(methode: string, data: unknown): Promise<RequestResult<T>> {
        return (await this.getAxiosInstance()).post(this.buildUrl(methode), data).then(x => {
            return Promise.resolve<RequestResult<T>>({
                successfully: true,
                statusCode: x.status,
                data: x.data
            });
        }).catch((error: AxiosError) => {
            return Promise.resolve<RequestResult<T>>({
                successfully: false,
                statusCode: error.response ? error.response.status : undefined,
                data: error.response ? error.response.data : undefined
            });
        });
    }

    private async getAxiosInstance() {
        const instance = Axios.create();
        const session = await new UserSessionManager().getCurrentSession();

        if (session) {
            instance.defaults.headers.common["Authorization"] = (`Bearer ${session.access_token}`);
        }

        return instance;
    }

    private buildUrl(methode: string): string {
        return `${Settings.ApiUrl}${this.controllerName}/${methode}`;
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
                // Show error modal
                GlobalEventBus.$emit("server-error");
                break;

            default:
                break;
        }
    }
}
