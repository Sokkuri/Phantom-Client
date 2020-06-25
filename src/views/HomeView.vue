<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
  <div class="view home-view">
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
