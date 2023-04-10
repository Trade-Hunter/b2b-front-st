<template>
  <input
    v-model="variable"
    type="text"
    class="
      w-full
      px-4
      py-2
      text-base text-black
      border border-th-green
      transition
      duration-500
      ease-in-out
      transform
      rounded-lg
      bg-transparent
      dark:text-white
      focus:outline-none focus:ring-2 focus:ring-th-green
    " />
</template>

<script>
export default {
  name: 'hxc-input',
  data: () => ({
    variable: '',
  }),
};
</script>

<style></style>
