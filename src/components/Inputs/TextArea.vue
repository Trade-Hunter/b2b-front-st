<template>
  <textarea
    class="
      w-full
      h-32
      px-4
      py-2
      mt-2
      text-base text-blueGray-500
      transition
      duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand
    "
    id="description"
    type="text"
    name="description"
    required=""
  ></textarea>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "hxc-text-area",

  setup() {},
});
</script>

<style scoped></style>
