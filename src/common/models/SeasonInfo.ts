/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import BaseModel from "@/common/models/Anime";

export default class SeasonInfo extends BaseModel {
    season: string;
    year: string;
    current!: boolean;
}
