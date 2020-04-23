<template>
    <div>
        <img ref="imageElement" class="image clickable-image" v-bind:src="imageUrl" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Viewer from "viewerjs";

@Component
export default class ImageComponent extends Vue {
    @Prop() private imageUrl!: string;

    mounted() {
        const element: HTMLImageElement = this.$refs.imageElement as HTMLImageElement;

        if (element) {
            const viewer = new Viewer(element, {
                title: false,
                navbar: false,
                toolbar: false,
                movable: false
            });
        }
    }
}
</script>
