<template>
  <input
    type="date"
    id="date"
    name="date"
    placeholder="name"
    class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'hxc-dt-input',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup() {},
});
</script>

<style scoped></style>
