/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import SeoUtils from "@/common/utilities/SeoUtils";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/account/LoginView.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/account/RegisterView.vue")
    },
    {
        path: "/confirmEmail",
        name: "confirmEmail",
        component: () => import("@/views/account/ConfirmEmailView.vue")
    },
    {
        path: "/forgotPassword",
        name: "forgotPassword",
        component: () => import("@/views/account/ForgotPasswordView.vue")
    },
    {
        path: "/resetPassword",
        name: "resetPassword",
        component: () => import("@/views/account/ResetPasswordView.vue")
    },
    {
        path: "/settings/accountData",
        name: "accountData",
        component: () => import("@/views/account/settings/AccountDataView.vue")
    },
    {
        path: "/anime/:id",
        name: "anime",
        component: () => import("@/views/AnimeView.vue")
    },
    {
        path: "/settings/changePassword",
        name: "changePassword",
        component: () => import("@/views/account/settings/ChangePasswordView.vue")
    },
    {
        path: "/profile/:userName",
        name: "profile",
        component: () => import("@/views/account/profile/OverviewView.vue")
    },
    {
        path: "/profile/:userName/animeList",
        name: "animeList",
        component: () => import("@/views/account/profile/AnimeListView.vue")
    },
    {
        path: "/anime/content/:id",
        name: "content",
        component: () => import("@/views/content/AnimeContentView.vue")
    },
    {
        path: "/search/anime",
        name: "animeSearch",
        component: () => import("@/views/search/AnimeSearchView.vue")
    },
    {
        path: "/season",
        name: "seasonOverviewView",
        component: () => import("@/views/SeasonOverviewView.vue")
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
];

const router = new VueRouter({
    routes,
    mode: "history",
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});

router.beforeEach((to, from, next) => {
    // Remove SEO information when its no longer needed.
    if (to.name != "anime" && from.name == "anime") {
        SeoUtils.updateTitle();
        SeoUtils.deleteMeta();
    }

    next();
});

export default router;
