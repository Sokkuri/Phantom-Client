<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div id="app">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.1.7/css/fork-awesome.min.css" integrity="sha256-gsmEoJAws/Kd3CjuOQzLie5Q3yshhvmo7YNtBG7aaEY=" crossorigin="anonymous">
        <div ref="apiOffline" class="offline" hidden>
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <h1 class="title">{{ $t("offline.title") }}</h1>
                    </div>
                    <div class="column is-12">
                        <h2 class="subtitle">{{ $t("offline.message") }}</h2>
                    </div>
                </div>
            </div>
        </div>
        <div ref="mainContent" class="main-content">
            <Header />
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/HeaderComponent.vue";
import { ConfigurationContext } from "@/dataContexts/ConfigurationDataContext";
import VersionInfo from "@/common/models/VersionInfo";
import RequestResult from "@/common/models/RequestResult";

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {
    private dataContext: ConfigurationContext = new ConfigurationContext();

    mounted() {
        this.startup();
    }

    private startup(): void {
        const offlineMessage: HTMLElement = this.$refs.apiOffline as HTMLElement;
        const mainContent: HTMLElement = this.$refs.mainContent as HTMLElement;

        this.dataContext.getVersion().then((result: RequestResult<VersionInfo>) => {
            if (!result.successfully || !result.data) {
                offlineMessage.hidden = false;
                mainContent.hidden = true;
            } else {
                const savedVersion = localStorage.getItem("Version");

                if (savedVersion != result.data.version) {
                    localStorage.setItem("Version", result.data.version);
                }
            }
        });
    }
}
</script>

<style lang="scss" src="@/styles/main.scss"></style>
