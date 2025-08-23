<script setup lang="ts">
const slides = [
  {
    src: new URL("@/assets/img/cafe-1.jpeg", import.meta.url).href,
    caption: "Café de altura",
  },
  {
    src: new URL("@/assets/img/cafe-2.jpeg", import.meta.url).href,
    caption: "Cosecha fresca",
  },
  {
    src: new URL("@/assets/img/cafe-3.jpeg", import.meta.url).href,
    caption: "Proceso artesanal",
  },
];
</script>

<template>
  <v-container fluid class="pa-0">
    <v-sheet
      class="d-flex align-center justify-center"
      :style="{
        backgroundImage: `url('${slides[0].src}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'multiply',
        backgroundColor: 'rgba(31,41,55,0.7)',
      }"
    >
      <v-container class="fill-height">
        <v-row align="center" justify="center" class="text-center">
          <v-col cols="12" md="10" lg="8">
            <h1 class="mb-4 text-h2 text-white font-weight-bold">
              Venta de grano de café para mayoristas y tostadores
            </h1>
            <p class="mb-8 text-body-1 text-grey">
              Nos especializamos en la producción y comercialización de grano de
              café verde, directo de nuestra finca, ideal para mayoristas y
              tostadores que buscan calidad, frescura y trazabilidad.
            </p>
            <div
              class="d-flex flex-column flex-sm-row justify-center align-center ga-4"
            >
              <v-btn
                to="/about"
                color="green"
                size="large"
                class="mb-2 mb-sm-0"
                elevation="2"
              >
                Conócenos
                <v-icon end>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>
