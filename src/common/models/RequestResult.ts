/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default class RequestResult<T> {
    successfully: boolean;
    data?: T;

    constructor(options: {
        successfully: boolean,
        data?: T }) {
            this.successfully = options.successfully;
            this.data = options.data;
        }
}
