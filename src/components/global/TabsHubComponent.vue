<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="tabs-hub-component tabs">
        <ul>
            <li v-for="tab in elements"
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
import Main from "@/main";
import _ from "lodash";
import StringUtils from "@/common/utilities/StringUtils";

@Component
export default class TabsHubComponent extends Vue {
    @Prop({required: true}) private tabs: TabsHubTab[];

    private elements: TabsHubTab[] = [];

    mounted() {
        this.elements = this.tabs;

        const currentTab = _.find(this.elements, x => StringUtils.equalsIgnoreCase(x.url, Main.router.currentRoute.path));

        if (currentTab) {
            this.selectTab(currentTab);
        }
    }

    private selectTab(tab: TabsHubTab) {
        this.elements.forEach(x => {
            if (x.active) {
                x.active = false;
            }
        });

        this.elements.forEach(x => {
            if (x === tab) {
                x.active = true;
            }
        });
    }

    private changeTab(tab: TabsHubTab) {
        this.selectTab(tab);
        Main.router.push({ path: tab.url });
    }
}
</script>
