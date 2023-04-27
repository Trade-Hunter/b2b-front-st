<template>
  <header
    class="flex flex-col items-center justify-center py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border border-dashed rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
    <p class="flex flex-wrap justify-center mb-1 text-base leading-7 text-blueGray-500">
      <span>Drag and drop your</span> <span>files anywhere or</span>
    </p>
    <button
      class="w-auto px-2 py-1 my-2 mr-2 text-blueGray-500 transition duration-500 ease-in-out transform border rounded-md hover:text-blueGray-600 text-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-gray-100">
      Upload a file
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'hxc-dt-input',

  setup() {},
});
</script>

<style scoped></style>
