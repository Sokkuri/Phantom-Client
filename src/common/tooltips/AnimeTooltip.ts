/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Constants from "@/common/Constants";
import Anime from "@/common/models/Anime";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import _ from "lodash";
import { Instance } from "tippy.js";
import BaseTooltip from "./BaseTooltip";

export default class AnimeTooltip extends BaseTooltip {
    private entries: Anime[] = [];

    constructor(entries: Anime[]) {
        super("phantom");
        this.entries = entries;
    }

    protected onCreate(instance: Instance) {
        const id = instance.reference.getAttribute("data-id");
        const data = this.entries.find(x => x.id.toString() === id) as Anime;

        let infoElements: string = "";

        let infos: string[] = [];
        infos.push(TranslationUtils.translate(data.type));
        infos.push(TranslationUtils.translate(data.status));

        const studio = data.companies.find(x => x.type == Constants.CompanyTypes.Studio);

        if (studio) {
            infos.push(studio.name);
        }

        let tagElements: string = "";

        if (data.tags.length > 0) {
            const tags = _.take(data.tags, 3);

            tags.forEach(x => {
                tagElements += `<span class="tag is-rounded">${_.escape(TranslationUtils.translate(x.translationKey))}</span>`;
            });
        }

        let htmlElements = "";

        infos.forEach(x => {
            htmlElements = htmlElements.concat(`<p>${_.escape(x)}</p>`);
        });

        htmlElements = htmlElements.concat(`<div class="tags">${tagElements}</div>`);

        instance.setContent(htmlElements);
    }
}
