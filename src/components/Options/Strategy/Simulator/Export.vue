<template>
  <div class="px-2 relative">
    <label @click="show = !show" class="cursor-pointer select-none"
      >Exportar</label
    >
    <div v-if="show" class="flex flex-col gap-y-1 mt-2 absolute">
      <div
        class="bg-blue-500 px-2 rounded-md cursor-pointer"
        v-for="opt in options"
        :key="opt"
      >
        {{ opt }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style></style>
