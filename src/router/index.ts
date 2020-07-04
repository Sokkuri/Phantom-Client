/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginView.vue")
    },
    {
        path: "/anime/:id",
        name: "anime",
        component: () => import("@/views/AnimeView.vue")
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
]

const router = new VueRouter({
    routes,
    mode: "history",
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
});

export default router
