<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="offline-view">
        <div class="container">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title has-text-centered">{{ $t("offline.title") }}</h1>
                </div>
                <div class="column is-12">
                    <h2 class="subtitle has-text-centered">{{ $t("offline.message") }}</h2>
                </div>
                <div class="column is-12">
                    <div class="level">
                        <div class="level-item">
                            <a
                                href="https://twitter.com/playperium"
                                target="blank"
                                rel="noopener noreferrer">
                                {{ $t("offline.twitter") }}
                            </a>
                        </div>
                        <div class="level-item">
                            <a
                                href="https://status.sokkuri.eu"
                                target="blank"
                                rel="noopener noreferrer">
                                {{ $t("offline.serverState") }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Viewer from "viewerjs";
import Settings from "@/Settings";

@Component
export default class OfflineView extends Vue {
}
</script>
