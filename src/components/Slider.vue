<template>
  <div class="flex h-full flex-row bg-blue-500">
    <div class="w-4 mr-5 bg-blue-500 rounded-l-md">
      <span class="my-auto text-xs">{{ value[0] }}</span>
    </div>
    <div class="grow h-full">
      <Slider
        class="h-full w-full my-auto inline-block"
        :format="format"
        :tooltips="false"
        :max="max"
        :min="min"
        v-model="value"
        @update="$emit('update:value', value)"
      />
    </div>
    <div class="w-4 ml-2 mr-4 bg-blue-500 rounded-r-md">
      <span class="my-auto text-xs">{{ value[1] }}</span>
    </div>
  </div>
</template>

<script>
import Slider from "@vueform/slider";
export default {
  components: {
    Slider,
  },
  data() {
    return {};
  },
  props: {
    step: {
      type: Number,
    },
    format: {
      type: Object,
    },
    max: { type: Number },
    min: { type: Number },
    value: {
      type: Array,
      default: [0, 0],
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
