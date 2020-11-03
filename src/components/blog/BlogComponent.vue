<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="blog">
        <div class="container">
            <h1 class="title">{{ $t("blog.title") }}</h1>
            <Spinner v-if="loading" />
            <div class="columns is-multiline">
                <div class="column is-6"
                    v-for="item in posts"
                    v-bind:key="posts.indexOf(item)">
                    <BlogPostComponent
                        v-bind:imageUrl="item.imageUrl"
                        v-bind:url="item.url"
                        v-bind:title="item.title"
                        v-bind:content="item.content"
                        v-bind:creationDate="item.creationDate">
                    </BlogPostComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BlogDataContext from "@/dataContexts/BlogDataContext";
import BlogPostComponent from "@/components/blog/BlogPostComponent.vue";
import Spinner from "@/components/SpinnerComponent.vue";
import RequestResult from "@/common/models/RequestResult";
import { BlogPost } from "@sokkuri/common";

@Component({
    components: {
        Spinner,
        BlogPostComponent
    }
})
export default class Blog extends Vue {
    private dataContext: BlogDataContext = new BlogDataContext();
    private posts: Array<BlogPost> = [];
    private loading = false;

    created() {
        this.loading = true;
        this.dataContext.getBlogPosts().then((result: RequestResult<Array<BlogPost>>) => {
            if (result.successfully && result.data) {
                this.posts = result.data;
            }

            this.loading = false;
        });
    }
}
</script>
