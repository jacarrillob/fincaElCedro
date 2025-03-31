<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <section
      class="bg-center bg-no-repeat bg-[url('./assets/img/cafe-1.jpeg')] bg-gray-100 bg-blend-multiply"
    >
      <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1
          class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
        >
         El mejor café de la región
        </h1>
        <p
          class="mb-8 text-lg font-normal italic text-gray lg:text-xl sm:px-16 lg:px-48"
        >
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
        <div
          class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
        >
          <a
            href="#"
            class="inline-flex justify-center items-center py-3 px-5 text-base border border-white font-medium text-center text-default bg-green hover:bg-white hover:text-green "
          >
            Get started
            <svg
              class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          <a
            href="#"
            class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>

    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold text-black mb-3">
          Gestión de Cultivos
        </h2>
        <p class="text-gray">
          Seguimiento detallado de tus plantaciones y su desarrollo
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold text-black mb-3">
          Control Financiero
        </h2>
        <p class="text-gray">
          Administra ingresos y gastos de tu producción cafetera
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold text-black mb-3">
          Recursos Educativos
        </h2>
        <p class="text-gray">
          Accede a guías y mejores prácticas del cultivo de café
        </p>
      </div>
    </div>
  </div>
</template>
