<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    router.push("/dashboard");
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-black mb-6">Iniciar Sesión</h1>

    <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label for="email" class="block text-sm font-medium text-black"
          >Correo Electrónico</label
        >
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="ejemplo@ejemplo.com"
          required
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="password" class="block text-sm font-medium text-black">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Contraseña..."
          required
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-green text-white py-2 px-4 rounded-md hover:bg-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50 disabled:opacity-50"
      >
        {{ loading ? "Iniciando sesión..." : "Iniciar Sesión" }}
      </button>
    </form>
  </div>
</template>
