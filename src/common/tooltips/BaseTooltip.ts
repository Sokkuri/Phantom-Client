/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Tippy, { Instance, Props } from "tippy.js";

export default class BaseTooltip {
    private options: Partial<Props>;

    constructor(theme: string) {
        this.options = {
            placement: "right-start",
            allowHTML: true,
            theme: theme,
            onCreate: ((x: Instance) => this.onCreate(x))
        };
    }

    public create(element: HTMLElement) {
        Tippy(element, this.options);
    }

    public createMany(elements: NodeListOf<Element>) {
        Tippy(elements, this.options);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected onCreate(instance: Instance) {}
}
