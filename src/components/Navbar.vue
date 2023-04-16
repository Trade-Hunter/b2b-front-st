<template>
  <div class="bg-[#191e24] nav1 w-full flex flex-auto sticky" style="z-index: 999; height: 50px">
    <div class="flex pl-5">
      <a href="/" class="m-auto flex justify-center items-center font-bold text-gray-700 dark:text-white">
        <img alt="Logo" class="w-auto h-8 mr-1.5" src="/stBranca.png" />
        <img alt="Logo" class="w-auto h-6 ml-1.5" src="https://cdn-th.s3.sa-east-1.amazonaws.com/assets/icon.png" />
      </a>
    </div>
    <div class="flex grow items-center pr-2">
      <button class="ml-auto text-white bg-blue-500 px-2 m-2 text-sm rounded-md" @click="chgTheme">
        {{ theme.toUpperCase() }} THEME</button
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 flex"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    theme() {
      const theme = this.$store.getters["theme/getTheme"];
      return theme;
    },
    collapsed() {
      return this.$store.state.theme.collapsed;
    },
  },
  methods: {
    chgTheme() {
      this.$store.dispatch("theme/toggleTheme");
    },
  },
};
</script>

<style>
.nav1 {
  height: 60px;
}
</style>
