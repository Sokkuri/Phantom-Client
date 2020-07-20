/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import FontAwesomeIcons from "@/FontAwesomeIcons";
import VeeValidators from "@/VeeValidators";
import Vue from "vue";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";

FontAwesomeIcons.init();
VeeValidators.init();

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
