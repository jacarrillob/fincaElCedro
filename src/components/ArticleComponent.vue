<script setup lang="ts">
import { BlogPost } from "@/models/BlogPost";
import { useArticleStore } from "@/stores/articles";
defineProps({
  post: {
    type: Object as () => BlogPost,
    required: true,
  },
});

const articles = useArticleStore();
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="d-flex flex-column cursor-pointer bg-black border-sm border-white rounded-lg"
      @click="articles.getArticle(post)"
      v-bind="props"
      :elevation="isHovering ? 24 : 6"
    >
      <v-img
        v-if="post.image"
        :src="post.image"
        :alt="post.title"
        height="180px"
        cover
      />

      <div class="pa-4 d-flex flex-column text-subtitle-1 ga-1">
        <v-card-title class="pa-0">
          {{ post.title }}
        </v-card-title>

        <v-card-subtitle class="pa-0 text-subtitle-2 font-weight-bold">
          {{ new Date(post.date).toLocaleDateString() }}
        </v-card-subtitle>

        <v-card-text class="pa-0 text-body-1 text-grey line-clamp-3">{{ post.content }}</v-card-text>
      </div>
    </v-card>
  </v-hover>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 4;    /* Limita a 3 líneas */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>