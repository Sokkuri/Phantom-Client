/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import UserSessionManager from "@/common/security/UserSessionManager";
import Settings from "@/common/Settings";
import Main from "@/main";
import Axios, { AxiosError, AxiosResponse } from "axios";
import RequestResult from "./models/RequestResult";

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
            // Redirect to loginpage when response is unauthorized
            if (error.response && error.response.status == 401) {
                Main.router.push({ name: "login" });
            }

            console.log(error);
            return new RequestResult<T>({ successfully: false, statusCode: error.response ? error.response.status : undefined });
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
            // Redirect to loginpage when response is unauthorized
            if (error.response && error.response.status == 401) {
                Main.router.push({ name: "login" });
            }

            console.log(error);
            return new RequestResult<T>({ successfully: false, statusCode: error.response ? error.response.status : undefined });
        });
    }
}
