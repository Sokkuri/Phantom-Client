/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import BaseEntry from "./BaseEntry";

export default class Anime extends BaseEntry {
    adaptation: string;
    episodes: number;
    airedSeason: string;
    airedYear: string;
    endingSeason: string;
    endingYear: string;
}
