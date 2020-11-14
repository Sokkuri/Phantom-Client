<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="tabs-hub-component tabs">
        <ul>
            <li v-for="tab in internalTabs"
                :key="tab.url"
                :class="{ 'is-active': tab.active }">
                <a @click="changeTab(tab)">{{ tab.label }}</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TabsHubTab from "@/common/models/TabsHubTab";
import StringUtils from "@/common/utilities/StringUtils";

@Component
export default class TabsHubComponent extends Vue {
    @Prop({ required: true }) private tabs: TabsHubTab[];

    private internalTabs: TabsHubTab[] = [];

    mounted() {
        this.internalTabs = this.tabs;

        const currentTab = this.getSelectedTab();

        if (currentTab) {
            this.selectTab(currentTab);
        }
    }

    private selectTab(tab: TabsHubTab) {
        this.internalTabs.forEach(x => {
            if (x.active) {
                x.active = false;
            }
        });

        this.internalTabs.forEach(x => {
            if (x === tab) {
                x.active = true;
            }
        });
    }

    private getSelectedTab() {
        return this.internalTabs.find(x => StringUtils.equalsIgnoreCase(x.url, this.$router.currentRoute.path));
    }

    private changeTab(tab: TabsHubTab) {
        if (tab !== this.getSelectedTab()) {
            this.selectTab(tab);
            this.$router.push({ path: tab.url });
        }
    }
}
</script>
