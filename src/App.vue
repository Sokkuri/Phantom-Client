<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div id="app">
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
        <div class="changelog-modal">
            <ModalComponent
                v-bind:title="changelogTitle"
                v-bind:visible="showChangelogModal">
                <iframe
                    v-bind:src="changelogUrl">
                </iframe>
            </ModalComponent>
        </div>
        <div ref="mainContent" class="main-content">
            <Header />
            <router-view v-bind:key="$route.path" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/HeaderComponent.vue";
import ConfigurationContext from "@/dataContexts/ConfigurationDataContext";
import VersionInfo from "@/common/models/VersionInfo";
import RequestResult from "@/common/models/RequestResult";
import ModalComponent from "@/components/global/ModalComponent.vue";
import TranslationUtils from "@/common/utilities/TranslationUtils";

@Component({
  components: {
    Header,
    ModalComponent
  }
})
export default class App extends Vue {
    private dataContext: ConfigurationContext = new ConfigurationContext();
    private showChangelogModal: boolean = false;
    private changelogTitle: string = TranslationUtils.translate("changelog.title");
    private changelogUrl: string = "";

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
                const savedVersion = localStorage.getItem("ProductVersion");

                if (savedVersion != result.data.productVersion) {
                    localStorage.setItem("ProductVersion", result.data.productVersion);

                    if (savedVersion) {
                        this.dataContext.getChangelog().then((changelogResult: RequestResult<string>) => {
                            if (changelogResult.successfully && changelogResult.data && changelogResult.data.replace("http://", "").replace("https://", "").split("/")[0] == "blog.playperium.eu") {
                                this.changelogUrl = changelogResult.data;
                                this.showChangelogModal = true;
                            }
                        });
                    }
                }
            }
        });
    }
}
</script>

<style lang="scss" src="@/styles/main.scss"></style>
