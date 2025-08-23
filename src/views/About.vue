<script setup lang="ts"></script>

<template>
  <v-container class="d-flex flex-column ga-4">
    <v-sheet
      class="h-auto bg-black d-flex flex-column ga-4 pa-4 border-sm border-white rounded-lg"
    >
      <h1 class="text-h4">Acerca de Nosotros</h1>

      <p class="text-body-1 text-grey">
        Somos una familia trabajadora que incursiona en el sector café de la
        región, generando empleo para vecinos y amigos, con el deseo de
        compartir la magia del café.
      </p>
      <p class="text-body-1 text-grey">
        Nuestra misión es producir el mejor café de la región cumpliendo con los
        más altos estándares de calidad.
      </p>
    </v-sheet>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card
          class="bg-black d-flex flex-column ga-4 pa-4 border-sm border-white rounded-lg"
          min-height="150"
          hover
        >
          <v-card-title class="pa-0"> Experiencia </v-card-title>

          <v-card-text class="pa-0 text-body-1 text-grey">
            Más de 10 años trabajando junto a caficultores en el mejoramiento de
            sus procesos.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card
          class="bg-black d-flex flex-column ga-4 pa-4 border-sm border-white rounded-lg"
          min-height="150"
          hover
        >
          <v-card-title class="pa-0"> Innovación </v-card-title>

          <v-card-text class="pa-0 text-body-1 text-grey">
            Implementamos tecnología de punta para optimizar cada aspecto del
            cultivo.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card
          class="bg-black d-flex flex-column ga-4 pa-4 border-sm border-white rounded-lg"
          min-height="150"
          hover
        >
          <v-card-title class="pa-0"> Sostenibilidad </v-card-title>

          <v-card-text class="pa-0 text-body-1 text-grey">
            Más de 10 años trabajando junto a caficultores en el mejoramiento de
            sus procesos.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card
          class="bg-black d-flex flex-column ga-4 pa-4 border-sm border-white rounded-lg"
          min-height="150"
          hover
        >
          <v-card-title class="pa-0"> Ubicación </v-card-title>
          <iframe
          class="rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.376823187657!2d-74.18372273823483!3d5.658514494299209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e41a86791dde753%3A0xa927b5ec6d970e0!2sOtanche%2C%20Boyac%C3%A1!5e0!3m2!1ses-419!2sco!4v1755973582348!5m2!1ses-419!2sco"
            style="height: 50vh"
            allowfullscreen
            loading="lazy"
            title="Otanche - Boyacá"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
