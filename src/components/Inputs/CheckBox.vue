<template>
  <div class="flex">
    <label class="flex items-center mt-2">
      <input type="checkbox" class="rounded-md h-10" required="" />
      <span class="ml-2 text-blueGray-500"> {{ text }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'hxc-check-box',
  props: {
    text: { type: String, required: true },
  },
  setup() {},
});
</script>

<style scoped></style>
