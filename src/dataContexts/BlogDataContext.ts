/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

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
