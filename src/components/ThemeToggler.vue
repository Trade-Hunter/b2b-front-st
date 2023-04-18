<template>
  <button @click="toggleTheme" class="focus:outline-none">
    <svg
      :class="{
        hidden: isDarkMode,
        block: !isDarkMode,
        'transition duration-300 ease-in-out': true,
      }"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <svg
      :class="{
        hidden: !isDarkMode,
        block: isDarkMode,
        'transition duration-300 ease-in-out': true,
      }"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 11a7.5 7.5 0 01-15 0 7.5 7.5 0 1115 0z"
      ></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v2m0 8v2m-8-4h2m12 0h2"></path>
    </svg>
  </button>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    ...mapMutations("theme", ["toggleDarkMode"]),
    toggleTheme() {
      this.toggleDarkMode(!this.isDarkMode);
    },
  },
};
</script>
