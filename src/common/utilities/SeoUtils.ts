/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Settings from "@/Settings";
import _ from "lodash";

export default class SeoUtils {
    public static updateTitle(prefix?: string) {
        document.title = prefix ? `${_.escape(prefix)} - ${Settings.Name}` : Settings.Name;
    }

    public static updateMeta(name: string, content?: string) {
        const element = document.querySelector(`meta[name='${name}']`);

        if (element) {
            element.setAttribute("content", content ? content : "");
        } else {
            if (content) {
                const newMeta = document.createElement("meta");
                newMeta.classList.add("deletable");
                newMeta.setAttribute("name", name);
                newMeta.setAttribute("content", content);

                document.querySelector("html head")?.appendChild(newMeta);
            }
        }
    }

    public static deleteMeta() {
        const elements = document.querySelectorAll("head meta[name].deletable");

        elements.forEach(x => {
            x.remove();
        });
    }
}
