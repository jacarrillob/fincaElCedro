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
  months,
} = useTransactions();

const getName = (id: number) => {
  const person = people.find((person: Person) => person.id === id);
  return person ? person.firstName : "";
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
  <v-container>
    <div
      v-if="loading && !filteredTransactions.length"
      class="d-flex flex-column align-center justify-center ga-4"
    >
      <v-progress-circular indeterminate color="coffee" size="50" />
      <span class="text-grey">Cargando transacciones...</span>
    </div>

    <div
      v-if="filteredTransactions.length === 0 && !loading"
      class="text-center py-8"
    >
      <p class="text-gray-600">No hay transacciones disponibles.</p>
    </div>

    <v-sheet
      v-if="filteredTransactions.length"
      rounded="lg"
      class="h-auto bg-black d-flex flex-column ga-4 pa-4 border-sm border-white rounded-lg"
    >
      <h1 class="text-h4">Transacciones</h1>

      <v-row
        v-if="filteredTransactions.length"
        class="mb-6"
        align="center"
        justify="center"
      >
        <v-col cols="12" md="8">
          <Pie :data="filteredData" :options="options" style="height: 300px" />
        </v-col>
        <v-col cols="12" class="d-flex align-center justify-center">
          <div>
            <span class="text-grey font-weight-bold">Total: </span>
            <span class="text-grey">{{ formatCurrency(total.total) }}</span>
          </div>
        </v-col>
      </v-row>

      <v-card class="bg-black pa-4 border-sm border-white rounded-lg" elevation="2">
        <h3 class="text-h6 font-weight-bold mb-4">Filtros</h3>
        <v-form>
          <v-row dense>
            <v-col cols="12" md="4">
              <v-select
                v-model="filter.responsibleId"
                :items="[{ id: 0, firstName: 'Todos' }, ...people]"
                item-title="firstName"
                item-value="id"
                label="Responsable"
                density="compact"
                variant="outlined"
                color="white"
                :list-props="{ bgColor: 'black' }"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="filter.year"
                :items="[0, ...getYears]"
                label="Año"
                density="compact"
                variant="outlined"
                color="white"
                :list-props="{ bgColor: 'black' }"
                :item-title="(y) => (y === 0 ? 'Todos' : y)"
                :item-value="(y) => y"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="filter.month"
                :items="[{ number: 0, name: 'Todos' }, ...months]"
                item-title="name"
                item-value="number"
                label="Mes"
                density="compact"
                variant="outlined"
                color="white"
                :list-props="{ bgColor: 'black' }"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card>

      <v-row v-if="filteredTransactions.length">
        <v-col
          v-for="(item, index) in filteredTransactions"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="bg-black pa-4 h-100 d-flex flex-column align-center justify-center border-sm border-white rounded-lg"
            elevation="3"
          >
            <div class="font-weight-bold text-h6 mb-2">
              {{ formatCurrency(item.amount) }}
            </div>
            <div class="text-grey mb-1">
              Descripción: {{ item.description }}
            </div>
            <div class="text-grey mb-1">Fecha: {{ item.transactionDate }}</div>
            <div class="text-grey">
              Responsable: {{ getName(item?.responsibleId ?? 0) }}
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-alert
        v-else
        type="info"
        class="text-center my-8"
        border="start"
        color="grey-lighten-2"
      >
        No se encontraron transacciones
      </v-alert>
    </v-sheet>
  </v-container>
</template>
