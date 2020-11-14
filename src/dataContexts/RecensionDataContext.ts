/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { BaseDataContext } from "@/common/BaseDataContext";
import RequestResult from "@/common/models/RequestResult";
import RecensionViewModel from "@/common/viewModels/RecensionViewModel";
import { Recension } from "@sokkuri/common";

export default class RecensionDataContext extends BaseDataContext {
    constructor() {
        super("recension");
    }

    public async getAllAnimeRecensions(id: number): Promise<RequestResult<RecensionViewModel[]>> {
        return super.get<RecensionViewModel[]>(`getAllAnimeRecensions/${id}`);
    }

    public async getAnimeRecension(id: number): Promise<RequestResult<Recension>> {
        return super.get<Recension>(`getAnimeRecension/${id}`);
    }

    public async saveAnimeRecension(id: number, content: string): Promise<RequestResult<void>> {
        return super.post("saveAnimeRecension", { id, content });
    }

    public async removeAnimeRecension(id: number): Promise<RequestResult<void>> {
        return super.post(`removeAnimeRecension/${id}`, null);
    }
}
