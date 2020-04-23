import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import VersionInfo from "@/common/models/VersionInfo";

export class ConfigurationContext extends BaseDataContext {
    constructor() {
        super("configuration");
    }

    public getVersion(): Promise<RequestResult<VersionInfo>> {
        return super.get<VersionInfo>("getVersion").then((result: RequestResult<VersionInfo>) => {
            return result;
        });
    }
}
