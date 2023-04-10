<template>
  <div class="grid gap-2 grid-cols-2">
    <div>
      <input
        type="range"
        id="range"
        name="range"
        placeholder="name"
        :value="Number(value)"
        @input="$emit('update:value', Number($event.target.value))"
        :min="Number(min)"
        :max="Number(max)"
        :step="Number(step)"
        class="w-full px-0 mt-2 py-2 mr-4 text-base text-black"
      />
    </div>
    <div class="mt-2">
      <label
        class="text-md text-gray-900 mt-2 dark:text-white rounded-md px-2"
        >{{ value.toLocaleString("pt-BR") }}</label
      >
    </div>
  </div>
</template>

<script>
import HxcLabel from "@/components/Labels/Label.vue";
export default {
  name: "hxc-range-input",
  components: {
    HxcLabel,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
};
</script>
