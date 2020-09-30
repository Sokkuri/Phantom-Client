/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlayCircle, faStar as farStar, faTrashAlt, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle, faPlusCircle, faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue from "vue";

export default class FontAwesomeIcons {
    public static init() {
        library.add(
            faPlayCircle,
            faTrashAlt,
            faCheckCircle,
            faPlusCircle,
            farStar,
            fasStar,
            faUserCircle);

        Vue.component("font-awesome-icon", FontAwesomeIcon);
    }
}
