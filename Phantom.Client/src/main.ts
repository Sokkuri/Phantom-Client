import Vue from "vue";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";

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
