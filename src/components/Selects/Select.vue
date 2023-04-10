<template>
  <select
    v-if="options"
    :value="value"
    @change="$emit('update:value', $event.target.value)"
    class="w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg border border-th-green bg-transparent dark:bg-dark-1 dark:text-white focus:outline-none focus:ring-2 focus:ring-th-green"
  >
    <option value="" selected disabled hidden>Escolha uma opção</option>
    <option
      v-for="option in options"
      :value="option.value || option"
      :key="option.value || option"
    >
      {{ option.name || option }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "hxc-select",
  props: {
    value: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
      required: false,
    },
  },

  created() {
    //this.selected = this.value.length > 1 ? String(this.value) : String(this.$props.options[0]);
  },
});
</script>

<style scoped></style>
