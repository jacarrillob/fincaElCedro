<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { BlogPost } from '@/models/BlogPost'
import { useArticleStore } from '@/stores/articles'

const posts = ref<BlogPost[]>([])
const loading = ref(true)
const articles = useArticleStore()

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'))
    posts.value = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as BlogPost[]
  } catch (error) {
    console.error('Error fetching posts:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-coffee">Artículos</h1>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray">Cargando artículos...</p>
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-8">
      <p class="text-gray">No hay artículos disponibles.</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <article v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-200 hover:-translate-y-1 hover:shadow-lg" @click="articles.getArticle(post)">
        <img v-if="post.image" :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
        <div class="p-6 flex flex-col gap-2">
          <h2 class="text-xl font-semibold line-clamp-2 text-black">{{ post.title }}</h2>
          <div class="text-md text-gray">{{ new Date(post.date).toLocaleDateString() }}</div>
          <p class="text-gray line-clamp-3">{{ post.content }}</p>
        </div>
      </article>
    </div>
  </div>
</template>