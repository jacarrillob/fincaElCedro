<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <RouterLink to="/" class="text-xl font-semibold text-green">
          fincaElCedro
        </RouterLink>

        <div class="hidden md:flex space-x-4">
          <RouterLink to="/" class="text-black hover:text-green">Inicio</RouterLink>
          <RouterLink to="/about" class="text-black hover:text-green">Acerca de</RouterLink>
          <RouterLink to="/articles" class="text-black hover:text-green">Artículos</RouterLink>
          <RouterLink to="/gallery" class="text-black hover:text-green">Galería</RouterLink>
          <RouterLink to="/products" class="text-black hover:text-green">Productos</RouterLink>
          <RouterLink to="/contact" class="text-black hover:text-green">Contacto</RouterLink>
          
          <template v-if="!authStore.user">
            <RouterLink to="/login" class="text-black hover:text-green">Login</RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/transactions" class="text-black hover:text-green">Transacciones</RouterLink>
            <RouterLink to="/dashboard" class="text-gray-700 hover:text-green-700">Dashboard</RouterLink>
            <button @click="authStore.logout" class="text-gray-700 hover:text-green-700">Cerrar Sesión</button>
          </template>
        </div>

        <button @click="toggleMenu" class="md:hidden">
          <span class="sr-only">Menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-16 6h16" />
          </svg>
        </button>
      </div>

      <div v-if="isMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink to="/" class="block px-3 py-2 text-gray-700 hover:text-green-700">Inicio</RouterLink>
          <RouterLink to="/about" class="block px-3 py-2 text-gray-700 hover:text-green-700">Acerca de</RouterLink>
          <RouterLink to="/articles" class="block px-3 py-2 text-gray-700 hover:text-green-700">Artículos</RouterLink>
          <RouterLink to="/gallery" class="block px-3 py-2 text-gray-700 hover:text-green-700">Galería</RouterLink>
          <RouterLink to="/products" class="block px-3 py-2 text-gray-700 hover:text-green-700">Productos</RouterLink>
          <RouterLink to="/contact" class="block px-3 py-2 text-gray-700 hover:text-green-700">Contacto</RouterLink>
          
          <template v-if="!authStore.user">
            <RouterLink to="/login" class="block px-3 py-2 text-gray-700 hover:text-green-700">Login</RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/transactions" class="block px-3 py-2 text-gray-700 hover:text-green-700">Transacciones</RouterLink>
            <RouterLink to="/dashboard" class="block px-3 py-2 text-gray-700 hover:text-green-700">Dashboard</RouterLink>
            <button @click="authStore.logout" class="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-700">
              Cerrar Sesión
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>