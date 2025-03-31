<script setup lang="ts">
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../firebase/config'

const title = ref('')
const content = ref('')
const image = ref<File | null>(null)
const loading = ref(false)
const error = ref('')

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files?.length) {
    image.value = target.files[0]
  }
}

const handleSubmit = async () => {
  if (!title.value || !content.value) {
    error.value = 'Por favor completa todos los campos requeridos'
    return
  }

  loading.value = true
  try {
    let imageUrl = ''
    if (image.value) {
      const imageRef = storageRef(storage, `blog/${Date.now()}-${image.value.name}`)
      await uploadBytes(imageRef, image.value)
      imageUrl = await getDownloadURL(imageRef)
    }

    await addDoc(collection(db, 'posts'), {
      title: title.value,
      content: content.value,
      image: imageUrl,
      date: new Date().toISOString()
    })

    title.value = ''
    content.value = ''
    image.value = null
    error.value = ''
  } catch (err) {
    error.value = 'Error al crear el post'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h2 class="text-xl font-semibold text-coffee mb-4">Nuevo Post</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded-md">
        {{ error }}
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Título</label>
        <input
          v-model="title"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee focus:ring focus:ring-coffee focus:ring-opacity-50"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Contenido</label>
        <textarea
          v-model="content"
          rows="4"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee focus:ring focus:ring-coffee focus:ring-opacity-50"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Imagen</label>
        <input
          type="file"
          accept="image/*"
          @change="handleImageChange"
          class="mt-1 block w-full"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-coffee text-white py-2 px-4 rounded-md hover:bg-coffee-dark focus:outline-none focus:ring-2 focus:ring-coffee focus:ring-opacity-50 disabled:opacity-50"
      >
        {{ loading ? 'Creando...' : 'Crear Post' }}
      </button>
    </form>
  </div>
</template>