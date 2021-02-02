<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <footer class="footer">
        <div class="container">
            <div class="columns">
                <div class="column is-4">
                    <ol>
                        <li><a href="/api/imprint.html" target="_blank">{{ $t("component.footer.imprint") }}</a></li>
                        <li><a href="https://www.iubenda.com/privacy-policy/80733916" target="_blank" rel="noopener noreferrer">{{ $t("component.footer.privacyPolicy") }}</a></li>
                    </ol>
                </div>
                <div class="column is-4">
                    <ol>
                        <li><a href="https://twitter.com/playperium" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://discordapp.com/invite/B98B62J" target="_blank" rel="noopener noreferrer">Discord</a></li>
                    </ol>
                </div>
                <div class="column is-4">
                    <ol>
                        <li><a href="https://github.com/Sokkuri" target="_blank" rel="noopener noreferrer">Github</a></li>
                        <li><a href="mailto:support@sokkuri.eu">{{ $t("component.footer.contact") }}</a></li>
                    </ol>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FooterComponent extends Vue {
}
</script>
