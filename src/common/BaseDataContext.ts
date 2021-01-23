/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import GlobalEventBus from "@/common/GlobalEventBus";
import RequestResult from "@/common/models/RequestResult";
import Notification from "@/common/Notification";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import Router from "@/router/Router";
import Routes from "@/router/Routes";
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
            const result = this.convertError<T>(error);

            this.handleError(result);

            return result;
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
            const result = this.convertError<T>(error);

            this.handleError(result);

            return result;
        });
    }

    protected async delete(methode: string): Promise<RequestResult<void>> {
        return (await this.getAxiosInstance()).delete(this.buildUrl(methode)).then(x => {
            return Promise.resolve<RequestResult<void>>({
                successfully: true,
                statusCode: x.status,
                data: x.data
            });
        }).catch((error: AxiosError) => {
            const result = this.convertError<void>(error);

            this.handleError(result);

            return result;
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

    private convertError<T>(error: AxiosError): RequestResult<T> {
        return {
            successfully: false,
            statusCode: error.response ? error.response.status : undefined,
            data: error.response ? error.response.data : undefined
        };
    }

    private handleError<T>(result: RequestResult<T>) {
        switch (result.statusCode) {
            case 401:
                // Redirect to loginpage when response is unauthorized
                Router.navigate(Routes.Login);
                break;

            case 400:
                Notification.addError(TranslationUtils.translate("notification.actionError"), false).show();
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
