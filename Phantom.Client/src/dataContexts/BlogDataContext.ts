import { BaseDataContext } from "@/common/BaseDataContext";
import BlogPost from "@/common/models/BlogPost";
import RequestResult from "@/common/models/RequestResult";

export default class BlogDataContext extends BaseDataContext {
    constructor() {
        super("blog");
    }

    public getBlogPosts(): Promise<RequestResult<Array<BlogPost>>> {
        return super.get<Array<BlogPost>>("getblogposts").then((x: RequestResult<Array<BlogPost>>) => {
            return x;
        });
    }
}
