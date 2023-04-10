<template>
  <div
    class="group relative flex content-center justify-center bg-gray-700 text-center"
    style=""
  >
    <div
      class="relative px-2 flex justify-center text-center"
      v-bind:style="`width: ${pct}%; background: linear-gradient(0.75turn, rgba(0, 129, 255, 1), ${pct}%, rgba(72, 154, 247,1));`"
      v-bind:class="
        position == 'right' ? 'ml-auto rounded-l-sm' : 'mr-auto rounded-r-sm'
      "
    >
      <span class="invisible mx-auto inline-flex px-1">22</span>
    </div>
    <div class="absolute">
      <span class="z-10 inline-flex group-hover:invisible">{{ eq }}</span>
    </div>
    <div
      class="invisible absolute flex w-full flex-row justify-center gap-x-2 group-hover:visible"
    >
      <div @click="select('COMPRA', eq)">
        <button class="rounded-sm bg-green-500 px-2 text-white">C</button>
      </div>
      <div @click="select('VENDA', eq)">
        <button class="rounded-sm bg-red-500 px-2 text-white">V</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
    },
    select: {
      type: Function,
    },

    eq: {
      type: String,
    },
    pct: {
      type: String,
    },
  },
};
</script>

<style></style>
