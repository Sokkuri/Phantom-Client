<template>
    <div class="description">
        <p>{{ content }}</p>
        <p v-if="source" class="source">{{ $t("components.description.source") }}: {{ source }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DescriptionComponent extends Vue {
    @Prop() private content!: string;
    @Prop() private source!: string;
}
</script>
