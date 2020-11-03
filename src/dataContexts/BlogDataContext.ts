/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import { BlogPost } from "@sokkuri/common";

export default class BlogDataContext extends BaseDataContext {
    constructor() {
        super("blog");
    }

    public getBlogPosts(): Promise<RequestResult<Array<BlogPost>>> {
        return super.get<BlogPost[]>("getblogposts");
    }
}
