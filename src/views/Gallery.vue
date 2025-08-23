<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getStorage,
  ref as storageRef,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import ErrorMessage from "../components/ErrorMessage.vue";

const images = ref<string[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  const storage = getStorage();
  const imagesRef = storageRef(storage, "gallery");

  try {
    const result = await listAll(imagesRef);
    const urls = await Promise.all(
      result.items.map((imageRef) => getDownloadURL(imageRef))
    );
    images.value = urls;
    error.value = null;
  } catch (err: any) {
    console.error("Error loading images:", err);
    error.value =
      "No se pudieron cargar las imágenes. Por favor, verifica tu conexión e inténtalo de nuevo.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-container>
    <div
      v-if="loading"
      class="d-flex flex-column align-center justify-center ga-4"
    >
      <v-progress-circular indeterminate color="coffee" size="50" />
      <span class="text-grey">Cargando imágenes...</span>
    </div>

    <ErrorMessage v-if="error" :message="error" />


     <div v-if="images.length === 0 && !loading" class="text-center py-8">
      <p class="text-gray-600">No hay imágenes disponibles.</p>
    </div>

    <v-sheet v-if="images.length > 0 && !loading"
      class="h-auto bg-black d-flex flex-column ga-4 pa-4 border-sm border-white rounded-lg"
    >
      <h1 class="text-h4">Galería</h1>

      <v-row>
        <v-col
          v-for="(image, index) in images"
          :key="index"
          class="d-flex child-flex"
          cols="12"
          sm="6"
          md="4"
        >
          <v-img
            :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
            :src="`${image}`"
            aspect-ratio="1"
            class="bg-grey-lighten-2"
            cover
          >
            <template v-slot:placeholder>
              <v-row align="center" class="fill-height ma-0" justify="center">
                <v-progress-circular
                  color="grey-lighten-5"
                  indeterminate
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
