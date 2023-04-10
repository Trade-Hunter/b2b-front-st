<template>
  <div class="dropdown relative">
    <div
      class="relative flex-col z-10 cursor-pointer h-8 bg-blue-500 flex text-white rounded-md items-center px-3"
      @click="show = !show"
    >
      {{ title }}
      <div
        @click="show = false"
        v-if="show"
        class="mt-3 peer-checked:flex flex-col w-full"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: ["title"],
  setup(props) {
    const show = ref(false);
    return {
      show,
    };
  },
};
</script>
