<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "../stores/auth"
import BlogPostForm from "../components/dashboard/BlogPostForm.vue"
import FinanceForm from "../components/dashboard/FinanceForm.vue"
import UploadExcel from "../components/dashboard/UploadExcel.vue"

const authStore = useAuthStore()
const activeTab = ref("finance")
const showUpload = ref(false)
</script>

<template>
  <v-container>
    <v-sheet
      class="h-auto bg-black d-flex flex-column ga-4 pa-4 border-sm border-white rounded-lg"
    >
      <h1 class="text-h4">Panel de Control</h1>

      <p class="text-grey">Bienvenido, {{ authStore.user?.email }}</p>

      <v-card class="bg-black border-sm pa-4 border-white rounded-lg" elevation="2">
        <v-tabs
          v-model="activeTab"
          color="white"
          background-color="white"
        >
          <v-tab value="finance">Finanzas</v-tab>
          <v-tab value="blog">Blog</v-tab>
          <v-tab v-if="showUpload" value="upload">Uppload Excel</v-tab>
        </v-tabs>

        <v-tabs-window v-model="activeTab" class="pa-6">
          <v-tabs-window-item value="finance">
            <FinanceForm />
          </v-tabs-window-item>
          <v-tabs-window-item value="blog">
            <BlogPostForm />
          </v-tabs-window-item>
          <v-tabs-window-item value="upload" v-if="showUpload">
            <UploadExcel />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-sheet>
  </v-container>
</template>
