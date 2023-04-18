<template>
  <svg class="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
    <path
      v-if="isSidebarOpen"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.586 5.414a2 2 0 00-2.828 0L12 9.172l-3.758-3.758a2 2 0 10-2.828 2.828L9.172 12l-3.758 3.758a2 2 0 102.828 2.828L12 14.828l3.758 3.758a2 2 0 002.828-2.828L14.828 12l3.758-3.758a2 2 0 000-2.828z"
    />
    <path
      v-if="!isSidebarOpen"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm2 4a2 2 0 100 4h12a2 2 0 100-4H6z"
    />
  </svg>
</template>
<script>
export default {
  props: {
    isSidebarOpen: { type: Boolean },
  },
};
</script>
