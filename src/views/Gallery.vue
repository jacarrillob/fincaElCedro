<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage'
import ErrorMessage from '../components/ErrorMessage.vue'

const images = ref<string[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const storage = getStorage()
  const imagesRef = storageRef(storage, 'gallery')

  try {
    const result = await listAll(imagesRef)
    const urls = await Promise.all(
      result.items.map(imageRef => getDownloadURL(imageRef))
    )
    images.value = urls
    error.value = null
  } catch (err: any) {
    console.error('Error loading images:', err)
    error.value = 'No se pudieron cargar las imágenes. Por favor, verifica tu conexión e inténtalo de nuevo.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-coffee">Galería</h1>

    <ErrorMessage v-if="error" :message="error" />

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Cargando imágenes...</p>
    </div>

    <div v-else-if="images.length === 0 && !error" class="text-center py-8">
      <p class="text-gray-600">No hay imágenes disponibles.</p>
    </div>

    <div v-else-if="!error" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="(image, index) in images" :key="index" class="aspect-square">
        <img 
          :src="image" 
          alt="Imagen de galería"
          class="w-full h-full object-cover rounded-lg shadow-sm hover:opacity-90 transition-opacity"
        >
      </div>
    </div>
  </div>
</template>