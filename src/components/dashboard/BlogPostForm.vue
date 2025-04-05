<script setup lang="ts">
import { reactive, ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../firebase/config'
import { BlogPost } from '../../models/BlogPost'

const post = reactive<BlogPost>({
  title: '',
  content: '',
  date: new Date().toISOString(),
  image: ''
})

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
  if (!post.title || !post.content) {
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
      post.image = imageUrl
    }

    await addDoc(collection(db, 'posts'), post)

    post.title = ''
    post.content = ''
    post.image = ''
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
    <h2 class="text-xl font-semibold text-black mb-4">Nuevo Post</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded-md">
        {{ error }}
      </div>

      <div>
        <label for="title" class="block text-sm font-medium text-black">Título</label>
        <input
          v-model="post.title"
          type="text"
          id="title"
          required
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        />
      </div>

      <div>
        <label for="content" class="block text-sm font-medium text-black">Contenido</label>
        <textarea
          v-model="post.content"
          rows="4"
          id="content"
          required
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        ></textarea>
      </div>

      <div>
        <label for="image" class="block text-sm font-medium text-black">Imagen</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          @change="handleImageChange"
          class="mt-1 block w-full"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-green text-white py-2 px-4 rounded-md hover:bg-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50 disabled:opacity-50"
      >
        {{ loading ? 'Creando...' : 'Crear Post' }}
      </button>
    </form>
  </div>
</template>