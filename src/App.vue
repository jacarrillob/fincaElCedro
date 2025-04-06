<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col justify-between">
    <div class="flex flex-col">
      <Navbar />
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
    </div>
    <Footer />
  </div>

  <!-- 
   Web de referencia:
   https://www.abathhouse.com/ -->
</template>