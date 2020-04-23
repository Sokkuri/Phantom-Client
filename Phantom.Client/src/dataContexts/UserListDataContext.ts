import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import UserList from "@/common/models/UserList";

export default class UserListDataContext extends BaseDataContext {
    constructor() {
        super("UserList");
    }

    public async getAnimeEntry(animeId: number): Promise<RequestResult<UserList>> {
        return super.get("getAnimeEntry/" + animeId);
    }

    public async addAnime(id: number): Promise<RequestResult<void>> {
        return super.post("addAnime/" + id, null);
    }

    public async removeAnime(id: number): Promise<RequestResult<void>> {
        return super.post("removeAnime/" + id, null);
    }

    public async setAnimeState(id: number, state: string): Promise<RequestResult<void>> {
        return super.post("setAnimeState", {id, state});
    }
}
