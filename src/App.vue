<template>
  <div :class="{ dark: isDarkMode }" class="h-full">
    <router-view :key="$route.name"> </router-view>
    <notifications position="bottom right" :duration="5000" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const scroll = ref({ scrollEl: HTMLDivElement });

    const handleClickScrollToTop = () => {
      if (!scroll.value.scrollEl) return;
      scroll.value.scrollEl.scrollTo({ top: 0, behavior: "smooth" });
    };
    return { scroll, handleClickScrollToTop };
  },
  computed: {
    ...mapGetters("theme", ["isDarkMode"]),
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
</style>

<style scoped></style>
<style>
/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto;
  background-color: inherit;
}

#demo {
  padding-left: 290px;
}
#demo.collapsed {
  padding-left: 65px;
}
#demo.onmobile {
  padding-left: 65px;
}
.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  opacity: 0.5;
  z-index: 900;
}
.demo {
  padding-bottom: 0px;
}
</style>

<style>
#app {
  height: 100%;

  overflow: auto;
  background-color: inherit;
}
.highcharts-container {
  width: 100% !important;
  height: 100% !important;
  position: inherit;
}

.highcharts-root {
  width: 100% !important;
  height: 100% !important;
}
</style>
<style>
.scrollbar__wrapper {
  width: calc(100%);
  height: calc(100%);
}
</style>
