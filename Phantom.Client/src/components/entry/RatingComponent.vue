<template>
    <div v-if="selected || selected > -1" class="rating">
        <span class="icon"
            v-for="n in selected"
            v-bind:key="n">
            <i class="fa fa-star" />
        </span>
        <span class="icon"
            v-for="n in (10-selected)"
            v-bind:key="uuid + n">
            <i class="fa fa-star-o" />
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { v1 } from "uuid";

@Component
export default class RatingComponent extends Vue {
    @Prop() private selected!: number;
    private uuid: string;

    created() {
        this.uuid = v1();
    }
}
</script>
