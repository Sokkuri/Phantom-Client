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
import RequestResult from "@/common/models/RequestResult";
import TranslationUtils from "@/common/utilities/TranslationUtils";
import Settings from "@/Settings";
import Notification from "@/common/Notification";
import FooterComponent from "@/components/FooterComponent.vue";
import OfflineView from "@/views/OfflineView.vue";
import GlobalEventBus from "@/common/GlobalEventBus";
import ErrorModalComponent from "@/components/ErrorModalComponent.vue";

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

    created() {
        this.startup();
    }

    private startup(): void {
        this.dataContext.getVersion().then((result) => {
            if (!result.successfully || !result.data) {
                this.apiOffline = true;
            } else {
                const savedVersion = localStorage.getItem("ProductVersion");

                if (savedVersion != result.data.productVersion) {
                    localStorage.setItem("ProductVersion", result.data.productVersion);

                    if (savedVersion) {
                        Notification.addInfo(TranslationUtils.translate("changelog.message")
                            .replace("%PRODUCTVERSION%", result.data.productVersion),false)
                            .show();
                    }
                }
            }

            GlobalEventBus.$emit("startup-finished");
        });
    }
}
</script>

<style lang="scss" src="@/styles/main.scss"></style>
