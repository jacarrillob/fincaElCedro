<script setup lang="ts">
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { useDatabaseList } from "vuefire";
import { ref as dbRef } from "firebase/database";
import { db, rtdb } from "../firebase/config";

const todos = useDatabaseList(dbRef(rtdb, "/products"));
console.log(todos);

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

const products = ref<Product[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    products.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-container>
    <v-sheet
      class="h-auto bg-black d-flex flex-column ga-4 pa-4 border-sm border-white rounded-lg"
    >
      <h1 class="text-h4">Productos</h1>

      <div class="d-flex flex-column text-h5 align-center justify-center py-8">
        Próximamente...
      </div>
    </v-sheet>
  </v-container>
</template>
