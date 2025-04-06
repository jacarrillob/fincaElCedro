<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import type { Transaction } from '@/models/Transaction'
import people from '../../data/people.json'
import categories from '../../data/categories.json'

const formattedAmount = ref('')
const currentDate = new Date()
const currentYearMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`

const transaction = reactive<Transaction>({
  description: '',
  amount: 0,
  type: 'income',
  transactionDate: currentYearMonth,
  createdAt: new Date(),
  updatedAt: new Date(),
  categoryId: 5,
  notes: '',
  responsibleId: 0,
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
    transaction.transactionDate = currentYearMonth
    transaction.createdAt = new Date()
    transaction.updatedAt = new Date()
    transaction.categoryId = 5
    transaction.notes = ''
    transaction.responsibleId = 0


    error.value = ''
  } catch (err) {
    error.value = 'Error al registrar la transacción'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function formatToCurrency(value: number): string {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

function formatAmount(event: Event) {
  const target = event.target as HTMLInputElement

  // Eliminar todo lo que no sea número ni coma ni punto
  const raw = target.value.replace(/[^\d]/g, '')

  // Convertirlo a número en pesos, dividiendo para obtener decimales
  const numericValue = parseFloat(raw) / 100

  transaction.amount = numericValue
  formattedAmount.value = formatToCurrency(numericValue)
}

watch(() => transaction.amount, (newVal) => {
  formattedAmount.value = formatToCurrency(newVal)
}, { immediate: true })
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h2 class="text-xl font-semibold text-coffee mb-4">Registrar Transacción</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded-md">
        {{ error }}
      </div>

      {{ transaction }}

      <div class="flex flex-col gap-1">
        <label for="type" class="block text-sm font-medium text-black">Tipo</label>
        <select
          v-model="transaction.type"
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
          id="type"
        >
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
      </div>

      
      <div class="flex flex-col gap-1">
        <label for="category" class="block text-sm font-medium text-black">Categoria</label>
        <select
          v-model="transaction.categoryId"
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
          id="category"
        >
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <label for="amount" class="block text-sm font-medium text-black">Valor</label>
        <input
          v-model="formattedAmount"
          @input="formatAmount"
          inputmode="numeric"
          required
          id="amount"
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="responsible" class="block text-sm font-medium text-black">Responsable</label>
        <select
              id="persons"
              v-model="transaction.responsibleId"
              class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
            >
              <option value="0" selected>-Seleccione un responsable-</option>
              <option
                v-for="person in people"
                :key="person.id"
                :value="person.id"
              >
                {{ person.firstName }}
              </option>
            </select>
      </div>

      <div class="flex flex-col gap-1">
        <label for="transactionDate" class="block text-sm font-medium text-black">Fecha de la transacción</label>
      <input 
        id="transactionDate" 
        type="month" 
        v-model="transaction.transactionDate"
        class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        required
      />
      </div>

      <div class="flex flex-col gap-1">
        <label for="description" class="block text-sm font-medium text-black">Descripción</label>
        <input
          v-model="transaction.description"
          type="text"
          required
          id="description"
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="content" class="block text-sm font-medium text-black">Contenido</label>
        <textarea
          v-model="transaction.notes"
          rows="4"
          id="content"
          required
          class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-green text-white py-2 px-4 rounded-md hover:bg-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50 disabled:opacity-50"
      >
        {{ loading ? 'Registrando...' : 'Registrar Transacción' }}
      </button>
    </form>
  </div>
</template>