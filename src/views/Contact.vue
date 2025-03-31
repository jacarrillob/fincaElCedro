<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const success = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    // Aquí iría la lógica para enviar el formulario
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulación
    success.value = true
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch (error) {
    console.error('Error sending message:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-black mb-6">Contacto</h1>

    <div v-if="success" class="bg-green text-green p-4 rounded-md">
      Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label for="name" class="block text-sm font-medium text-black">Nombre</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Nombre..."
          required
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        >
      </div>

      <div class="flex flex-col gap-1">
        <label for="email" class="block text-sm font-medium text-black">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="ejemplo@ejemplo.com"
          required
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        >
      </div>

      <div class="flex flex-col gap-1">
        <label for="subject" class="block text-sm font-medium text-black">Asunto</label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          placeholder="Asunto..."
          required
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        >
      </div>

      <div class="flex flex-col gap-1">
        <label for="message" class="block text-sm font-medium text-black">Mensaje</label>
        <textarea
          id="message"
          v-model="form.message"
          rows="4"
          required
          placeholder="Escribe tu mensaje aquí..."
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-green text-white py-2 px-4 rounded-md hover:bg-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50 disabled:opacity-50"
      >
        {{ loading ? 'Enviando...' : 'Enviar Mensaje' }}
      </button>
    </form>
  </div>
</template>