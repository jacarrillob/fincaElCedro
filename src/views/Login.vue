<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth"
  import { loginSchema as validationSchema } from '@/validation/loginSchema'

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
  <v-container>
    <v-card max-width="500" class="mx-auto bg-black pa-6" elevation="8">
      <h1 class="text-h4 font-weight-bold mb-6 text-center">Iniciar Sesión</h1>
      <v-form @submit.prevent="handleLogin">
        {{  }}
        <v-text-field
          v-model="email"
          label="Correo Electrónico"
          type="email"
          :rules="[validationSchema.email]"
          required
          color="White"
          density="compact"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          class="mb-4"
        />
        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          :rules="[validationSchema.password]"
          placeholder="Contraseña..."
          color="White"
          density="compact"
          variant="outlined"
          required
          prepend-inner-icon="mdi-lock"
          class="mb-4"
        />
        <v-btn
          type="submit"
          color="green"
          block
          size="large"
          elevation="2"
        >
          Iniciar Sesión
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
