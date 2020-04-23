<template>
    <div class="info-card">
        <b v-if="title">{{ title }}</b>
        <p>{{ content }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class InfoCardComponent extends Vue {
    @Prop() private title!: string;
    @Prop() private content!: string;
}
</script>
