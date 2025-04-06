<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { useDatabaseList } from 'vuefire'
import { ref as dbRef } from 'firebase/database'
import { db, rtdb } from '../firebase/config'

const todos = useDatabaseList(dbRef(rtdb, '/products'))
console.log(todos)


interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

const products = ref<Product[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    products.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[]
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>

  <div class="space-y-8">
    <!-- {{ todos }} -->
    <h1 class="text-3xl font-bold text-coffee">Productos</h1>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Cargando productos...</p>
    </div>

    <div v-else-if="products.length === 0" class="text-center py-8">
      <p class="text-gray-600">No hay productos disponibles.</p>
    </div>

    <div v-else class="grid md:grid-cols-3 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-sm overflow-hidden">
        <img 
          v-if="product.image" 
          :src="product.image" 
          :alt="product.name"
          class="w-full h-48 object-cover"
        >
        <div class="p-6">
          <h2 class="text-xl font-semibold text-coffee mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <p class="text-lg font-semibold text-coffee">${{ product.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>