<script setup lang="ts">
import { ref, watch } from "vue";
import { formatCurrency } from "../utils/Currency";
import useTransactions from "../composables/useTransactions";
import people from "../documents/people.json";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

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
} = useTransactions();

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
    <div class="flex flex-col items-center gap-4">
      <div class="w-full">
        <Pie :data="filteredData" :options="options" />
      </div>

      <div>
        <span class="text-gray font-bold">Total:</span>
        <span class="text-gray">{{ formatCurrency(total.total) }}</span>
      </div>
    </div>

    <form class="max-w-sm mx-auto">
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Filtrar</label
      >
      <select
        id="persons"
        v-model="filter"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option :value="0" selected>Todos</option>
        <option v-for="person in people" :key="person.id" :value="person.id">
          {{ person.firstName }}
        </option>
      </select>
    </form>

    {{ groupTotalByResponsible }}

    <div v-if="loading">
      <p>Cargando...</p>
    </div>

    <div
      v-else
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
          >Responsable: {{ item.responsible?.firstName }}</span
        >
      </a>
    </div>
  </div>
</template>
