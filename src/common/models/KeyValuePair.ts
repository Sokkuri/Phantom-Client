/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default class KeyValuePair<K, V> {
    key: K;
    value: V;

    constructor(options: {
        key: K,
        value: V }) {
            this.key = options.key;
            this.value = options.value;
        }
}
