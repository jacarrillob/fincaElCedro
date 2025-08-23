<script setup lang="ts">
</script>

<template>
  <footer class="h-20 border-t-sm border-white">
    <v-container>
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="6" class="text-gray-600 mb-2 mb-md-0">
          © {{ new Date().getFullYear() }} fincaElCedro. Todos los derechos reservados.
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-end">
          <v-btn variant="text" href="#" class="text-gray-600" size="small">Términos</v-btn>
          <v-btn variant="text" href="#" class="text-gray-600" size="small">Privacidad</v-btn>
          <v-btn variant="text" href="#" class="text-gray-600" size="small">Contacto</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>