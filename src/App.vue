<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div id="app">
        <OfflineView v-if="apiOffline" />
        <template v-else>
            <ErrorModalComponent />
            <div class="main-content">
                <HeaderComponent />
                <router-view v-bind:key="$route.path" />
            </div>
            <FooterComponent />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ConfigurationContext from "@/dataContexts/ConfigurationDataContext";
import FooterComponent from "@/components/FooterComponent.vue";
import OfflineView from "@/views/OfflineView.vue";
import ErrorModalComponent from "@/components/ErrorModalComponent.vue";
import Settings from "@/Settings";

@Component({
    components: {
        HeaderComponent,
        FooterComponent,
        OfflineView,
        ErrorModalComponent
    }
})
export default class App extends Vue {
    private dataContext: ConfigurationContext = new ConfigurationContext();
    private apiOffline = false;

    async created() {
        console.log(`[CLIENT BUILD INFO] Version Hash: ${Settings.Commit}`);

        const result = await this.dataContext.getVersion();

        if (result.successfully) {
            console.log(`[API BUILD INFO] Build Date: ${result.data?.buildDate}, Version Hash: ${result.data?.commit}`);

            if (result.data?.commit) {
                localStorage.setItem("LastVersion", result.data.commit);
            }
        } else {
            this.apiOffline = true;
        }
    }
}
</script>

<style lang="scss" src="@/styles/main.scss"></style>
