/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { confirmed, email, min, required } from "vee-validate/dist/rules";
import Vue from "vue";

export default class VeeValidators {
    public static init() {
        extend("required", required);
        extend("email", email);
        extend("confirmed", confirmed);
        extend("min", min);

        extend("password", value => {
            return /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?']).*$/.test(value);
        });

        Vue.component("ValidationProvider", ValidationProvider);
        Vue.component("ValidationObserver", ValidationObserver);
    }
}
