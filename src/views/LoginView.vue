<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
  <div class="view login-view">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h1 class="title">Willkommen zurück!</h1>
          <div class="field">
            <label class="label">Nutzername</label>
            <input v-model="username" class="input" id="username" autofocus required type="text" />
          </div>
          <div class="field">
            <label class="label">Passwort</label>
            <input v-model="password" class="input" id="password" autofocus required type="password" />
          </div>
          <button v-on:click="onSubmit" class="button is-primary is-fullwidth">Anmelden</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnimeDataContext from "@/dataContexts/AnimeDataContext";
import { UserSessionManager } from "kogitte";

@Component
export default class LoginView extends Vue {
    private sessionManager: UserSessionManager = new UserSessionManager();

    private username: string = "";
    private password: string = "";

    private onSubmit() {
        if (this.username && this.password) {
            this.sessionManager.login(this.username, this.password);
        }
    }
}
</script>
