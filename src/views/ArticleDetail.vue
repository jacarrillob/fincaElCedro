<script setup lang="ts">
import { useArticleStore } from "./../stores/articles";

const articles = useArticleStore();
</script>

<template>
  <v-container>
    <v-sheet
      class="h-auto bg-black d-flex flex-column align-start ga-4 pa-4 border-sm border-white rounded-lg"
    >
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-btn
            class="mb-4 font-weight-bold"
            variant="plain"
            v-bind="props"
            :color="isHovering ? 'green' : 'white'"
            @click="articles.goBack"
          >
            <v-icon start>mdi-arrow-left</v-icon>
            Volver
          </v-btn>
        </template>
      </v-hover>

      <v-hover v-slot="{ isHovering, props }" v-if="articles.articleSelected">
        <v-card
          class="w-100 d-flex flex-column cursor-pointer bg-black border-sm border-white rounded-lg"
          v-bind="props"
          :elevation="isHovering ? 24 : 6"
        >
          <v-img
            v-if="articles.articleSelected?.image"
            :src="articles.articleSelected?.image"
            :alt="articles.articleSelected.title"
            height="400px"
            cover
          />

          <div class="pa-4 d-flex flex-column text-subtitle-1 ga-1">
            <v-card-title class="pa-0">
              {{ articles.articleSelected?.title }}
            </v-card-title>

            <v-card-subtitle class="pa-0 text-subtitle-2 font-weight-bold">
              {{ articles.articleSelected?.date }}
            </v-card-subtitle>

            <v-card-text class="pa-0 text-body-1 text-grey">{{
              articles.articleSelected?.content
            }}</v-card-text>
          </div>
        </v-card>
      </v-hover>

      <div
        v-else
        class="w-100 d-flex flex-column align-center justify-center py-8" 
      >
        <v-icon color="grey" size="40">mdi-file-document-outline</v-icon>
        <span class="text-grey mt-2">No hay artículo seleccionado.</span>
      </div>
    </v-sheet>
  </v-container>
</template>
