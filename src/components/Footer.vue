<script setup lang="ts">
</script>

<template>
  <footer class="bg-white shadow-lg border-t-2 border-light mt-8">
    <div class="container mx-auto px-4 py-6 ">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-gray-600 mb-4 md:mb-0">
          © {{ new Date().getFullYear() }} fincaElCedro. Todos los derechos reservados.
        </div>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-600 hover:text-green-700">Términos</a>
          <a href="#" class="text-gray-600 hover:text-green-700">Privacidad</a>
          <a href="#" class="text-gray-600 hover:text-green-700">Contacto</a>
        </div>
      </div>
    </div>
  </footer>
</template>