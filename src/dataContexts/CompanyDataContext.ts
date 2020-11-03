/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import { Company } from "@sokkuri/common";

export default class CompanyDataContext extends BaseDataContext {
    constructor() {
        super("company");
    }

    public getCompaniesByType(type: string): Promise<RequestResult<Company[]>> {
        return super.get<Company[]>(`getCompaniesByType?type=${type}`);
    }
}
