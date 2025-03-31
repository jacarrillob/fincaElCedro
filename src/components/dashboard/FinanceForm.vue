<script setup lang="ts">
import { ref, reactive } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import type { Transaction } from '@/models/Transaction'

const transaction = reactive<Transaction>({
  description: '',
  amount: 0,
  type: 'income',
  date: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  category: '',
  notes: '',
  responsible: ''
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  debugger
  if (transaction.amount === 0 || transaction.description === '') {
    error.value = 'Por favor completa todos los campos'
    return
  }

  loading.value = true

  try {
    await addDoc(collection(db, 'transactions'), {
      ...transaction
    })

    // Reset transaction values
    transaction.description = ''
    transaction.amount = 0
    transaction.type = 'income'
    transaction.transactionDate = new Date()
    transaction.createdAt = new Date()
    transaction.updatedAt = new Date()
    transaction.category = ''
    transaction.notes = ''
    transaction.responsible = ''


    error.value = ''
  } catch (err) {
    error.value = 'Error al registrar la transacción'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h2 class="text-xl font-semibold text-coffee mb-4">Registrar Transacción</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded-md">
        {{ error }}
      </div>

      {{ transaction }}

      <div>
        <label for="type" class="block text-sm font-medium text-gray-700">Tipo</label>
        <select
          v-model="transaction.type"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee focus:ring focus:ring-coffee focus:ring-opacity-50"
          id="type"
        >
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
      </div>

      
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700">Categoria</label>
        <select
          v-model="transaction.category"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee focus:ring focus:ring-coffee focus:ring-opacity-50"
          id="category"
        >
          <option value="Alimentación">Alimentación</option>
          <option value="Mano de obra">Mano de obra</option>
        </select>
      </div>

      <div>
        <label for="amount" class="block text-sm font-medium text-gray-700">Valor</label>
        <input
          v-model="transaction.amount"
          type="number"
          step="0.01"
          required
          id="amount"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee focus:ring focus:ring-coffee focus:ring-opacity-50"
        />
      </div>

      <div>
        <label for="responsible" class="block text-sm font-medium text-gray-700">Responsable</label>
        <select
          v-model="transaction.responsible"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee focus:ring focus:ring-coffee focus:ring-opacity-50"
          id="responsible"
          required
        >
          <option value="elber">Elber</option>
          <option value="alfonso">Alfonso</option>
          <option value="edier">Edier</option>
          <option value="wilson">Wilson</option>
        </select>
      </div>

      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          v-model="transaction.transactionDate"
          type="date"
          required
          id="date"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee focus:ring focus:ring-coffee focus:ring-opacity-50"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
        <input
          v-model="transaction.description"
          type="text"
          required
          id="description"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee focus:ring focus:ring-coffee focus:ring-opacity-50"
        />
      </div>

      <div>
        <label for="notes" class="block text-sm font-medium text-gray-700">Información adicional</label>
        <input
          v-model="transaction.notes"
          type="text"
          required
          id="notes"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee focus:ring focus:ring-coffee focus:ring-opacity-50"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-coffee text-white py-2 px-4 rounded-md hover:bg-coffee-dark focus:outline-none focus:ring-2 focus:ring-coffee focus:ring-opacity-50 disabled:opacity-50"
      >
        {{ loading ? 'Registrando...' : 'Registrar Transacción' }}
      </button>
    </form>
  </div>
</template>