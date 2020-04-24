/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default class SelectListItem {
    label: string;
    value: any;
    selected?: boolean;
    disabled?: boolean;
    placeholder?: boolean;
    text?: string;

    constructor(options: {
        label: string,
        value: any,
        selected?: boolean,
        disabled?: boolean,
        placeholder?: boolean }) {
            this.label = options.label;
            this.value = options.value;
            this.selected = options.selected;
            this.disabled = options.disabled;
            this.placeholder = options.placeholder;
        }
}
