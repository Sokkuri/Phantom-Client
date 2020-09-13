/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default class TabsHubTab {
    label: string;
    url: string;
    active?: boolean = false;

    constructor(options: {
        label: string,
        url: string,
        active?: boolean }) {
            this.label = options.label;
            this.url = options.url;
            this.active = options.active;
        }
}
