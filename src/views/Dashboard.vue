<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import BlogPostForm from '../components/dashboard/BlogPostForm.vue'
import FinanceForm from '../components/dashboard/FinanceForm.vue'
import UploadExcel from '../components/dashboard/UploadExcel.vue'

const authStore = useAuthStore()
const activeTab = ref('finance')
const showUpload = ref(false)
</script>

<template>
  <div class="space-y-6">
    <header class="bg-white p-6 rounded-lg shadow-sm">
      <h1 class="text-2xl font-bold text-coffee">Panel de Control</h1>
      <p class="text-gray-600">Bienvenido, {{ authStore.user?.email }}</p>
    </header>

    <div class="bg-white rounded-lg shadow-sm">
      <nav class="flex border-b">
        <button
          @click="activeTab = 'finance'"
          :class="[
            'px-4 py-2 text-sm font-medium',
            activeTab === 'finance'
              ? 'border-b-2 border-coffee text-coffee'
              : 'text-gray-500 hover:text-coffee'
          ]"
        >
          Finanzas
        </button>
        <button
          @click="activeTab = 'blog'"
          :class="[
            'px-4 py-2 text-sm font-medium',
            activeTab === 'blog'
              ? 'border-b-2 border-coffee text-coffee'
              : 'text-gray-500 hover:text-coffee'
          ]"
        >
          Blog
        </button>
        <button v-if="showUpload"
          @click="activeTab = 'upload'"
          :class="[
            'px-4 py-2 text-sm font-medium',
            activeTab === 'upload'
              ? 'border-b-2 border-coffee text-coffee'
              : 'text-gray-500 hover:text-coffee'
          ]"
        >
          Uppload Excel
        </button>
      </nav>

      <div class="p-6">
        <FinanceForm v-if="activeTab === 'finance'" />
        <UploadExcel v-else-if="activeTab === 'upload'" />
        <BlogPostForm v-else />
      </div>
    </div>
  </div>
</template>