/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Anime from "@/common/models/Anime";
import BaseModel from "@/common/models/BaseModel";

export default class UserList extends BaseModel {
    anime: Anime;
    overallRating: number;
    status: string;
    currentEpisode: number;
    addingDate: Date;
}
