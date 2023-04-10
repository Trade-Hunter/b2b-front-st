<template>
  <label class="text-md leading-6 font-medium dark:text-white text-gray-900">{{ text }}</label>
</template>

<script>
export default {
  name: 'hxc-label',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
