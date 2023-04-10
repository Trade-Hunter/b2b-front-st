<template>
  <span v-if="tooltip.text" :tooltip="tooltipText" :position="position"><slot /></span>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    tooltipText: {
      type: String,
    },
    position: {
      default: 'top',
      type: String,
    },
  },
};
</script>
