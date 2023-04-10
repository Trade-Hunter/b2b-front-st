<template>
  <label class="text-md leading-6 font-medium text-gray-900">{{ text }}</label>
</template>

<script>
export default {
  name: 'hxc-label-2',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
