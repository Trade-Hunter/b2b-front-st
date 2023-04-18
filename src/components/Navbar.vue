<template>
  <div class="bg-[#191e24] nav1 w-full flex flex-auto sticky" style="z-index: 999; height: 50px">
    <div class="flex pl-5">
      <a href="/" class="m-auto flex justify-center items-center font-bold text-gray-700 dark:text-white">
        <img alt="Logo" class="w-auto h-8 mr-1.5" src="/stBranca.png" />
        <img alt="Logo" class="w-auto h-6 ml-1.5" src="https://cdn-th.s3.sa-east-1.amazonaws.com/assets/icon.png" />
      </a>
    </div>
    <div class="flex grow items-center pr-2">
      <!-- Theme toggler component -->
      <ThemeToggler :isDarkMode="isDarkMode" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ThemeToggler from "./ThemeToggler.vue";

export default {
  components: {
    ThemeToggler,
  },
  computed: {
    ...mapGetters("theme", ["isDarkMode"]),
  },
};
</script>

<style>
.nav1 {
  height: 60px;
}
</style>
