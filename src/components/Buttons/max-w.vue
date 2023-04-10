<template>
  <button class="w-full text-center pl-4 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline bg-indigo-600 text-white font-medium">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "btn",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup() {},
});
</script>
