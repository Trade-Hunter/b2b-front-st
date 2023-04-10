<template>
  <div class="observer" />
</template>

<script>
export default {
  props: ["options", "emit"],
  data: () => ({
    observer: null,
  }),
  mounted() {
    const emit = this.emit || false;
    const options = this.options || {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting && emit) {
        this.$emit("intersect");
      }
    }, options);

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>
