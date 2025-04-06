<script setup lang="ts">
import { ref, watch } from "vue";
import { formatCurrency } from "../utils/Currency";
import useTransactions from "../composables/useTransactions";
import people from "../data/people.json";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import { Person } from "@/models/Person";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = ref<number[]>([]);
const chartLabels = ref<string[]>([]);
const backgroundColor = ref<string[]>([]);

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => {
          const value = tooltipItem.raw;
          return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          }).format(value);
        },
      },
    },
  },
});

const filteredData = ref({
  labels: chartLabels.value,
  datasets: [
    {
      backgroundColor: backgroundColor.value,
      data: chartData.value,
    },
  ],
});

const {
  filteredTransactions,
  loading,
  filter,
  total,
  groupTotalByResponsible,
  getYears,
  months
} = useTransactions();

const getName = (id: number) => {
  const person = people.find((person: Person) => person.id === id);
  return person ? person.firstName : '';
};

watch(groupTotalByResponsible, () => {
  chartData.value = groupTotalByResponsible.value.map((item: any) =>
    parseInt(item.total)
  );
  chartLabels.value = groupTotalByResponsible.value.map(
    (item: any) => item.name
  );
  backgroundColor.value = groupTotalByResponsible.value.map(() => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return `#${color}`;
  });

  filteredData.value = {
    labels: chartLabels.value,
    datasets: [
      {
        backgroundColor: backgroundColor.value,
        data: chartData.value,
      },
    ],
  };
});
</script>
<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-coffee">Transacciones</h1>

    <div v-if="loading && !filteredTransactions.length">
      <p>Cargando...</p>
    </div>

    <div v-else class="flex flex-col gap-4">
      <div v-if="filteredTransactions.length" class="flex flex-col items-center gap-4">
        <div class="w-full">
          <Pie :data="filteredData" :options="options" />
        </div>

        <div>
          <span class="text-gray font-bold">Total: </span>
          <span class="text-gray">{{ formatCurrency(total.total) }}</span>
        </div>
      </div>

      <form class="w-full mx-auto flex flex-col gap-2 shadow-md p-4">
        <h3 class="text-2xl font-bold text-black">Filtros</h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div class="flex flex-col gap-1">
            <label
              for="persons"
              class="block text-sm font-medium text-gray dark:text-white"
              >Responsable</label
            >
            <select
              id="persons"
              v-model="filter.responsibleId"
              class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
            >
              <option :value="0" selected>Todos</option>
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
            <label
              for="years"
              class="block text-sm font-medium text-gray dark:text-white"
              >Año</label
            >
            <select
              id="years"
              v-model="filter.year"
              class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
            >
              <option :value="0" selected>Todos</option>
              <option v-for="y in getYears" :key="y" :value="y">
                {{ y }}
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-1">
            <label
              for="months"
              class="block text-sm font-medium text-gray dark:text-white"
              >Mes</label
            >
            <select
              id="months"
              v-model="filter.month"
              class="block w-full rounded-md p-2 text-base text-black outline outline-1 -outline-offset-1 outline-gray placeholder:text-gray focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green sm:text-sm"
            >
              <option :value="0" selected>Todos</option>
              <option v-for="month in months" :key="month.number" :value="month.number">
                {{ month.name }}
              </option>
            </select>
          </div>
        </div>
      </form>

      <div v-if="filteredTransactions.length" 
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 border-gray-200 rounded-md"
      >
        <a
          href="#"
          class="flex flex-col justify-center items-center gap-2 p-2 shadow-md"
          v-for="(item, index) in filteredTransactions"
          :key="index"
          @click="console.log(item)"
        >
          <span class="font-bold text-xl text-black">{{
            formatCurrency(item.amount)
          }}</span>

          <span class="text-gray">Descripción: {{ item.description }}</span>
          <span class="text-gray">Fecha: {{ item.transactionDate }}</span>
          <span class="text-gray"
            >Responsable: {{ getName(item?.responsibleId ?? 0) }}</span
          >
        </a>
      </div>
      <div v-else class="text-center py-8">
        <p>No se encontraron transacciones</p>
      </div>
    </div>
  </div>
</template>
