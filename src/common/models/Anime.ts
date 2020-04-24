/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import BaseModel from "./BaseModel";
import Company from "./Company";
import Description from "./Description";
import EntryTitle from "./EntryTitle";
import SystemFile from "./SystemFile";
import Tag from "./Tag";

export default class Anime extends BaseModel {
    titles: EntryTitle[];
    type: string;
    status: string;
    adaptation: string;
    episodes: number;
    airedSeason: string;
    airedYear: string;
    endingSeason: string;
    endingYear: string;
    descriptions: Description[];
    systemFile: SystemFile;
    creationDate: Date;
    overallRating: number;
    tags: Tag[];
    companies: Company[];
}
