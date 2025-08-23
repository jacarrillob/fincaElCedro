<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const isMenuOpen = ref(false);
</script>

<template>
  <v-app-bar class="px-3 bg-black border-b-sm border-white" flat>
    <v-toolbar-title>
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-btn
            class="font-weight-bold"
            variant="plain"
            to="/"
            v-bind="props"
            :color="isHovering ? 'green' : 'white'"
            >fincaElCedro</v-btn
          >
        </template>
      </v-hover>
    </v-toolbar-title>

    <v-spacer />

    <!-- Desktop Navigation -->
    <div class="d-none d-md-flex align-center">
      <v-btn variant="text" to="/" class="mx-1">Inicio</v-btn>
      <v-btn variant="text" to="/about" class="mx-1">Acerca de</v-btn>
      <v-btn variant="text" to="/articles" class="mx-1">Artículos</v-btn>
      <v-btn variant="text" to="/gallery" class="mx-1">Galería</v-btn>
      <v-btn variant="text" to="/products" class="mx-1">Productos</v-btn>
      <v-btn v-if="false" variant="text" to="/contact" class="mx-1"
        >Contacto</v-btn
      >
      <template v-if="!authStore.user">
        <v-btn variant="text" to="/login" class="mx-1">Login</v-btn>
      </template>
      <template v-else>
        <v-btn variant="text" to="/transactions" class="mx-1"
          >Transacciones</v-btn
        >
        <v-btn variant="text" to="/dashboard" class="mx-1">Dashboard</v-btn>
        <v-btn variant="text" @click="authStore.logout" class="mx-1"
          >Cerrar Sesión</v-btn
        >
      </template>
    </div>
    <!-- Mobile Navigation -->
    <v-menu
      v-model="isMenuOpen"
      :close-on-content-click="true"
      activator="parent"
      location="bottom right"
      class="d-md-none"
    >
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="d-md-none">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/">Inicio</v-list-item>
        <v-list-item to="/about">Acerca de</v-list-item>
        <v-list-item to="/articles">Artículos</v-list-item>
        <v-list-item to="/gallery">Galería</v-list-item>
        <v-list-item to="/products">Productos</v-list-item>
        <v-list-item v-if="false" to="/contact">Contacto</v-list-item>
        <template v-if="!authStore.user">
          <v-list-item to="/login">Login</v-list-item>
        </template>
        <template v-else>
          <v-list-item to="/transactions">Transacciones</v-list-item>
          <v-list-item to="/dashboard">Dashboard</v-list-item>
          <v-list-item @click="authStore.logout">Cerrar Sesión</v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
