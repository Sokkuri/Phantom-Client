/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import SeoUtils from "@/common/utilities/SeoUtils";
import Routes from "@/router/Routes";
import Vue from "vue";
import VueRouter from "vue-router";

export default class Router {
    private static router: VueRouter;

    public static init() {
        Vue.use(VueRouter);

        const routes = this.buildRoutes();

        this.router = new VueRouter({
            routes,
            mode: "history",
            scrollBehavior() {
                return { x: 0, y: 0 };
            }
        });

        this.router.beforeEach((to, from, next) => {
            // Remove SEO information when its no longer needed.
            if (to.name != "anime" && from.name == "anime") {
                SeoUtils.updateTitle();
                SeoUtils.deleteMeta();
            }

            next();
        });

        return this.router;
    }

    public static navigate(path: string) {
        this.router.push({ path: path });
    }

    private static buildRoutes() {
        const routes = [
            {
                path: Routes.Home,
                component: () => import("@/views/HomeView.vue")
            },
            {
                path: Routes.Login,
                component: () => import("@/views/account/LoginView.vue")
            },
            {
                path: Routes.Register,
                component: () => import("@/views/account/RegisterView.vue")
            },
            {
                path: Routes.ConfirmEmail,
                component: () => import("@/views/account/ConfirmEmailView.vue")
            },
            {
                path: Routes.ForgotPassword,
                component: () => import("@/views/account/ForgotPasswordView.vue")
            },
            {
                path: Routes.ResetPassword,
                component: () => import("@/views/account/ResetPasswordView.vue")
            },
            {
                path: Routes.Settings.AccountData,
                component: () => import("@/views/account/settings/AccountDataView.vue")
            },
            {
                path: Routes.Settings.ChangePassword,
                component: () => import("@/views/account/settings/ChangePasswordView.vue")
            },
            {
                path: "/anime/:id",
                component: () => import("@/views/AnimeView.vue")
            },
            {
                path: "/anime/:id/content",
                component: () => import("@/views/content/AnimeContentView.vue")
            },
            {
                path: "/profile/:userName",
                component: () => import("@/views/account/profile/OverviewView.vue")
            },
            {
                path: "/profile/:userName/animeList",
                component: () => import("@/views/account/profile/AnimeListView.vue")
            },
            {
                path: "/search/anime",
                component: () => import("@/views/search/AnimeSearchView.vue")
            },
            {
                path: "/season",
                component: () => import("@/views/SeasonOverviewView.vue")
            }
        ];

        // Append route names
        routes.forEach(x => {
            (x as any).name = x.path.split("/").reverse().find(x => x && !x.includes(":")) ?? "";
        });

        return routes;
    }
}
