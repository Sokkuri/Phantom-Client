<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="view settings-base-view">
        <section class="section tabs-hub">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <h1 class="title">Einstellungen</h1>
                        <TabsHubComponent :tabs="tabs" />
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="columns is-multiline">
                    <slot />
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TabsHubTab from "@/common/models/TabsHubTab";
import TabsHubComponent from "@/components/global/TabsHubComponent.vue";
import TranslationUtils from "@/common/utilities/TranslationUtils";

@Component({
    components: {
        TabsHubComponent
    }
})
export default class SettingsBaseView extends Vue {
    private tabs: TabsHubTab[] = [];

    created() {
        this.tabs = [
            new TabsHubTab({label: TranslationUtils.translate("view.settings.tabsHub.accountData"), url: "/settings/accountData"}),
            new TabsHubTab({label: TranslationUtils.translate("view.settings.tabsHub.changePassword"), url: "/settings/changePassword"})
        ]
    }
}
</script>
