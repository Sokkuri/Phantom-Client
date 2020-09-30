/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Prop, Vue, Watch } from "vue-property-decorator";

export default abstract class BaseEntryGrid extends Vue {
    @Prop() protected columnWidth: number;

    protected abstract entryType: string;
    protected abstract entries: object[];

    @Watch("entries") onEntryChange() {
        this.$nextTick(() => {
            this.initTooltips();
        });
    }

    protected abstract initTooltips(): void;
}
