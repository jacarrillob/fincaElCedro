<script setup lang="ts">
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { BlogPost } from "@/models/BlogPost";

import ArticleComponent from "@/components/ArticleComponent.vue";

const posts = ref<BlogPost[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    posts.value = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as BlogPost[];
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-container>
    <div
      v-if="loading"
      class="d-flex flex-column align-center justify-center ga-4"
    >
      <v-progress-circular indeterminate color="coffee" size="50" />
      <span class="text-grey">Cargando artículos...</span>
    </div>

    <div
      v-else-if="posts.length === 0"
      class="d-flex flex-column align-center justify-center py-8"
    >
      <v-icon color="grey" size="40">mdi-file-document-outline</v-icon>
      <span class="text-grey mt-2">No hay artículos disponibles.</span>
    </div>
    <v-sheet
      v-else-if="posts.length > 0"
      rounded="lg"
      class="h-auto bg-black d-flex flex-column ga-4 pa-4 border-sm border-white rounded-lg"
    >
      <h1 class="text-h4">Artículos</h1>

      <v-row>
        <v-col v-for="post in posts" :key="post.id" cols="12" sm="6" md="4">
          <ArticleComponent :post="post" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
