<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { BlogPost } from '@/models/BlogPost'

const posts = ref<BlogPost[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'))
    posts.value = querySnapshot.docs.map(doc => ({ ...doc.data() })) as BlogPost[]
  } catch (error) {
    console.error('Error fetching posts:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-coffee">Blog</h1>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray">Cargando artículos...</p>
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-8">
      <p class="text-gray">No hay artículos disponibles.</p>
    </div>

    <div v-else class="grid md:grid-cols-2 gap-6">
      <article v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img v-if="post.image" :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
        <div class="p-6 flex flex-col gap-2">
          <h2 class="text-xl font-semibold text-black">{{ post.title }}</h2>
          <div class="text-md text-gray">{{ new Date(post.date).toLocaleDateString() }}</div>
          <p class="text-gray">{{ post.content }}</p>
        </div>
      </article>
    </div>
  </div>
</template>