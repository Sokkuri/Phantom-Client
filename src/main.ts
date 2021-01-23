/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import FontAwesomeIcons from "@/FontAwesomeIcons";
import Router from "@/router/Router";
import VeeValidators from "@/VeeValidators";
import { AuthConfig } from "kogitte";
import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import i18n from "./i18n";
import Settings from "./Settings";

FontAwesomeIcons.init();
VeeValidators.init();

Vue.config.productionTip = false;

export default class Main {
    public static i18n: VueI18n;
}

Main.i18n = i18n;

AuthConfig.init(Settings.ClientId, `${Settings.ApiUrl}authentication/token`, `${Settings.ApiUrl}authentication/logout`);

const router = Router.init();

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount("#app");
