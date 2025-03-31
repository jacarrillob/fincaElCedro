<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Transaction } from '@/models/Transaction'
import { formatCurrency } from '../utils/Currency'

const transactions = ref<Transaction[]>([])
const loading = ref(true)
const total = ref<Object>({})



onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'transactions'))
    transactions.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Transaction[]
  } catch (error) {
    console.error('Error fetching posts:', error)
  } finally {
    loading.value = false
  }
})
</script>
<template>

  <div>
    {{ total }}
  </div>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4 border-gray-200 rounded-md">
    <a href="#" class="flex flex-col justify-center items-center gap-2 p-2 shadow-md" v-for="(item, index) in transactions" :key="index" @click="console.log(item)">

      <span class="font-bold text-xl text-black">{{ formatCurrency(item.amount) }}</span>

      <span class="text-gray">Descripción: {{ item.description }}</span>
      <span class="text-gray">Fecha: {{ item.transactionDate }}</span>
      <span class="text-gray">Responsable: {{ item.responsible?.firstName }}</span>
    </a>

  </div >
</template>