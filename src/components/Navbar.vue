<template>
  <div class="bg-white dark:bg-dark-1 w-full flex flex-auto sticky" style="z-index: 999; height: 50px">
    <div class="flex pl-5">
      <a href="/" class="m-auto flex justify-center items-center font-bold text-gray-700 dark:text-white">
        <img alt="Logo" class="w-auto h-6 mr-1.5" src="https://cdn-th.s3.sa-east-1.amazonaws.com/assets/icon.png" />
        <span class="text-sm font-bold uppercase">Trade Hunter</span>
      </a>
    </div>
    <div class="flex grow">
      <button class="ml-auto text-white bg-blue-500 px-2 m-2 text-sm rounded-md" @click="chgTheme">
        {{ theme.toUpperCase() }} THEME
      </button>
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
.nav1:before {
  background-size: contain;
  content: "";

  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100%;
}
.nav1 {
  height: 40px;
  background: linear-gradient(13deg, #f69d3c, #2885cb);
  background-size: cover;
  content: "";
}

.nav1:after {
  background: rgba(0, 0, 0, 0.6);
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  overflow: hidden;
}
</style>
