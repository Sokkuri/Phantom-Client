/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import BaseModel from "./BaseModel";

export default class UserList extends BaseModel {
    overallRating: number;
    status: string;
    currentEpisode: number;
    addingDate: Date;
}
