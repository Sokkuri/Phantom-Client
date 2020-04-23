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
            return new RequestResult<AuthData>({successfully: true, data: x.data});
        }).catch((error: AxiosError) => {
            console.log(error);
            return new RequestResult<AuthData>({successfully: false});
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
            return new RequestResult({successfully: true, data: x.data});
        }).catch((error: AxiosError) => {
            console.log(error);
            return new RequestResult<AuthData>({successfully: false})
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
