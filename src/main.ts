/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue from "vue";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";

library.add(far);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false

export default class Main {
    public static router: VueRouter;
    public static i18n: VueI18n;
}

Main.router = router;
Main.i18n = i18n;

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app")
