<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <nav class="navbar is-fixed-top" role="navigation">
        <div class="navbar-brand">
            <a class="navbar-item" to="/">
                <img class="logo" src="../assets/playperium-cg-web.png" />
            </a>
            <div id="global-search-container" class="navbar-item control">
                <input id="global-search" type="search" class="input" placeholder="Suche..." />
                <ul id="global-search-results"></ul>
            </div>

            <a class="navbar-burger burger" role="button" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <a href="http://blog.playperium.eu" target="_blank" rel="noopener noreferrer"
                    class="navbar-item">{{ $t("header.blog") }}</a>
                <router-link to="/search/anime" tag="a" class="navbar-item">{{ $t("header.browse") }}</router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">{{ $t("header.anime.menuTitle") }}</a>
                    <div class="navbar-dropdown is-boxed">
                        <router-link to="/season" tag="a" class="navbar-item">{{ $t("header.anime.season") }}</router-link>
                    </div>
                </div>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">{{ $t("header.community.menuTitle") }}</a>
                    <div class="navbar-dropdown is-boxed">
                        <a href="https://discordapp.com/invite/B98B62J" rel="noopener noreferrer"
                            class="navbar-item">{{ $t("header.community.discord") }}</a>
                        <a href="ts3server://ts3.playperium.eu?addbookmark=1" rel="noopener noreferrer"
                            class="navbar-item">{{ $t("header.community.teamspeak") }} 3</a>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <div v-if="userSessionExists" class="navbar-item has-dropdown is-hoverable">
                    <span class="icon is-large">
                        <i class="fa fa-user-circle-o fa-2x navbar-item is-centered" aria-hidden="true" />
                    </span>
                    <div class="navbar-dropdown is-right is-boxed">
                        <a href="/UserList/Anime/Details/@User.Identity.Name" class="navbar-item">{{ $t("header.user.myAnimeList") }}</a>
                        <a class="navbar-item">{{ $t("header.user.settings") }}</a>
                        <a class="navbar-item">{{ $t("header.user.logout") }}</a>
                    </div>
                </div>

                <div v-else class="navbar-item is-hoverable">
                    <router-link to="/login" tag="a" class="navbar-item">{{ $t("header.login") }}</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { UserSessionManager } from "kogitte";

@Component
export default class HeaderComponent extends Vue {
    private userSessionExists: boolean = false;

    created() {
        this.userSessionExists = new UserSessionManager().sessionExists();
    }
}
</script>
