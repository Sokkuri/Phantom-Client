import { BaseDataContext } from "@/common/BaseDataContext";
import Anime from "@/common/models/Anime";
import RequestResult from "@/common/models/RequestResult";

export default class AnimeDataContext extends BaseDataContext {
    constructor() {
        super("anime");
    }

    public async getAnime(id: number): Promise<RequestResult<Anime>> {
        return super.get<Anime>("getAnime/" + id).then((x: RequestResult<Anime>) => {
            return x;
        });
    }
}
