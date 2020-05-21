/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import BaseModel from "./BaseModel";
import Company from "./Company";
import Description from "./Description";
import EntryTitle from "./EntryTitle";
import Synonym from "./Synonym";
import SystemFile from "./SystemFile";
import Tag from "./Tag";

export default class BaseEntry extends BaseModel {
    titles: EntryTitle[];
    synonyms: Synonym[];
    type: string;
    status: string;
    descriptions: Description[];
    tags: Tag[];
    companies: Company[];
    systemFile: SystemFile;
    overallRating: number;
}
