<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <nav class="navbar is-fixed-top" role="navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <img class="logo" src="../assets/sok-cg-web.png" />
            </router-link>
            <div id="global-search-container" class="navbar-item control">
                <GlobalSearchComponent />
            </div>

            <a class="navbar-burger burger" role="button" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <a href="http://blog.sokkuri.eu" target="_blank" rel="noopener noreferrer"
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
                        <a href="ts3server://ts3.sokkuri.eu?addbookmark=1" rel="noopener noreferrer"
                            class="navbar-item">{{ $t("header.community.teamspeak") }} 3</a>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <div v-if="sessionExists" class="navbar-item has-dropdown is-hoverable is-vcentered">
                    <span class="icon is-large">
                        <font-awesome-icon :icon="['far', 'user-circle']" size="2x" />
                    </span>
                    <div class="navbar-dropdown is-right is-boxed">
                        <router-link :to="`/profile/${userInfo.userName}`" tag="a" class="navbar-item">{{ $t("header.user.profile") }}</router-link>
                        <router-link to="/settings/accountData" tag="a" class="navbar-item">{{ $t("header.user.settings") }}</router-link>
                        <a class="navbar-item" @click="logout()">{{ $t("header.user.logout") }}</a>
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
import { Component, Vue } from "vue-property-decorator";
import { UserSessionManager } from "kogitte";
import GlobalSearchComponent from "@/components/global/search/GlobalSearchComponent.vue";
import GlobalEventBus from "@/common/GlobalEventBus";
import CurrentUser from "@/common/CurrentUser";
import StringUtils from "@/common/utilities/StringUtils";
import { UserInfo } from "@sokkuri/common";

@Component({
    components: {
        GlobalSearchComponent
    }
})
export default class HeaderComponent extends Vue {
    private sessionExists = false;
    private userInfo: UserInfo = new UserInfo();

    private userSessionManager = new UserSessionManager();

    created() {
        GlobalEventBus.$on("update-login-state", this.updateLoginState);

        this.sessionExists = new UserSessionManager().sessionExists();
        this.loadUserInfo();
    }

    beforeDestroy() {
        GlobalEventBus.$off("update-login-state", this.updateLoginState);
    }

    private updateLoginState(state: string) {
        if (StringUtils.equalsIgnoreCase(state, "login")) {
            this.sessionExists = true;
            this.loadUserInfo();
        }

        if (StringUtils.equalsIgnoreCase(state, "logout")) {
            this.sessionExists = false;
        }
    }

    private async logout() {
        this.userSessionManager.logout().then(x => {
            if (x.successfully) {
                this.sessionExists = false;
            }
        });
    }

    private loadUserInfo() {
        const userInfo = CurrentUser.getUserInfo();

        if (userInfo) {
            this.userInfo = userInfo;
        }
    }
}
</script>
