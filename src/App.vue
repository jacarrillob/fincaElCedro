<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <v-layout class="flex-column bg-black rounded rounded-md border h-screen overflow-auto">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <v-main>
        <RouterView />
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-layout>


  <!-- 
   Web de referencia:
   https://www.abathhouse.com/ -->
</template>