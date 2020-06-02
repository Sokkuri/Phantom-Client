/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import AuthData from "@/common/models/AuthData";
import RequestResult from "@/common/models/RequestResult";
import SignInData from "@/common/models/SignInData";
import Settings from "@/common/Settings";
import Axios, { AxiosError, AxiosResponse } from "axios";

export default class AuthenticationDataContext {
    private apiUrl: string = Settings.ApiUrl;
    private controllerName: string = "authentication";

    public async login(data: SignInData): Promise<RequestResult<AuthData>> {
        const instance = Axios.create();
        const params = new URLSearchParams({
            grant_type: data.grant_type,
            client_id: data.client_id
        });

        if (data.username && data.password) {
            params.set("username", data.username);
            params.set("password", data.password);
        }

        return instance.post(this.buildUrl("login"), params).then((x: AxiosResponse) => {
            return new RequestResult<AuthData>({ successfully: true, statusCode: x.status, data: x.data });
        }).catch((error: AxiosError) => {
            console.log(error);
            return new RequestResult<AuthData>({ successfully: false, statusCode: error.response ? error.response.status : undefined });
        });
    }

    public async refresh(data: SignInData): Promise<RequestResult<AuthData>> {
        const instance = Axios.create();
        const params = new URLSearchParams({
            grant_type: data.grant_type,
            client_id: data.client_id
        });

        if (data.refresh_token) {
            params.set("refresh_token", data.refresh_token);
        }

        return instance.post(this.buildUrl("login"), params).then((x: AxiosResponse) => {
            return new RequestResult({ successfully: true, statusCode: x.status, data: x.data });
        }).catch((error: AxiosError) => {
            console.log(error);
            return new RequestResult<AuthData>({ successfully: false, statusCode: error.response ? error.response.status : undefined })
        });
    }

    public async logout(): Promise<void> {
        return Axios.post(this.buildUrl("logout"), null).then(x => {
            return x.data;
        });
    }

    private buildUrl(methode: string): string {
        return this.apiUrl + this.controllerName + "/" + methode;
    }
}
