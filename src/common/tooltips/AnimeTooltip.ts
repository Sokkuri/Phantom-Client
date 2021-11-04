/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import TranslationUtils from "@/common/utilities/TranslationUtils";
import { Anime, Constants } from "@sokkuri/common";
import { escape, take } from "lodash-es";
import { Instance } from "tippy.js";
import BaseTooltip from "./BaseTooltip";

export default class AnimeTooltip extends BaseTooltip {
    private entries: Anime[] = [];

    constructor(entries: Anime[]) {
        super("anime");
        this.entries = entries;
    }

    protected onCreate(instance: Instance) {
        const id = instance.reference.getAttribute("data-id");
        const data = this.entries.find(x => x.id.toString() === id) as Anime;

        const infos: string[] = [];

        if (data.type == Constants.AnimeTypes.Movie || data.episodes == 0) {
            infos.push(escape(TranslationUtils.translate(data.type)));
        } else {
            infos.push(`${escape(TranslationUtils.translate(data.type))} - ${data.episodes} ${TranslationUtils.translate("anime.details.episodes")}`);
        }

        infos.push(escape(TranslationUtils.translate(data.status)));

        let tagElements = "";

        if (data.tags.length > 0) {
            const tags = take(data.tags, 3);

            tags.forEach(x => {
                tagElements += `<span class="tag is-rounded">${escape(TranslationUtils.translate(x.translationKey))}</span>`;
            });
        }

        let htmlElements = "";

        infos.forEach(x => {
            htmlElements = htmlElements.concat(`<p>${escape(x)}</p>`);
        });

        htmlElements = htmlElements.concat(`<div class="tags">${tagElements}</div>`);

        instance.setContent(htmlElements);
    }
}
