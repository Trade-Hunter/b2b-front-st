<template>
  <li class="py-2 px-4 hover:bg-gray-100">
    <a href="#" class="flex items-center">
      <div v-html="icon" class="mr-4"></div>
      <span v-if="!isCollapsed">{{ title }}</span>
    </a>
  </li>
</template>
<script>
export default {
  props: {
    title: String,
    icon: String,
    isCollapsed: Boolean,
  },
};
</script>
<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
