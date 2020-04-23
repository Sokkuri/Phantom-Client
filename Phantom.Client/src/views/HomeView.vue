<template>
  <div class="home">
    <Blog />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Blog from "@/components/blog/BlogComponent.vue";

@Component({
  components: {
    Blog
  }
})
export default class HomeView extends Vue {
}
</script>
