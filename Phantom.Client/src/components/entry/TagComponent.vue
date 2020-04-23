<template>
    <p class="entry-tag">{{ content }}</p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TagComponent extends Vue {
    @Prop() private content!: string;
}
</script>
