<script setup lang="ts">

import { useArticleStore } from './../stores/articles'

const articles = useArticleStore()

</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <button 
      class="text-green hover:text-green text-lg mb-8 flex items-center"
      @click="articles.goBack"
    >
      ← Volver
    </button>
    <article v-if="articles.articleSelected" class="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        :src="articles.articleSelected.image" 
        :alt="articles.articleSelected.title" 
        class="w-full h-[400px] object-cover"
      >
      <div class="p-8">
        <h1 class="text-3xl font-bold text-black mb-2">{{ articles.articleSelected.title }}</h1>
        <p class="text-gray text-sm mb-8">{{ articles.articleSelected.date }}</p>
        <div class="prose prose-lg max-w-none text-gray">
          {{ articles.articleSelected.content }}
        </div>
      </div>
    </article>
    <div v-else class="text-center py-16">
      <h1 class="text-3xl font-bold text-gray mb-4">Artículo no encontrado</h1>
      <button 
        class="text-green hover:text-green text-lg"
        @click="articles.goBack"
      >
        ← Volver al inicio
      </button>
    </div>
  </div>
</template>