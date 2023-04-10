<template>
  <button
    type="button"
    class="w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "hxc-btn",
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
