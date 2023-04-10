<template>
  <div
    v-bind:style="{
      'padding-left': collapsed ? (hideMenu ? '0px' : '65px') : '290px',
    }"
    class="sm:inset-0 sm:flex sm:items-center sm:justify-center"
  >
    <div
      class="flex fixed inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      style="z-index: 2000"
    >
      <div class="fixed inset-0 transition-opacity">
        <div @click.self.stop.prevent="handleClose" class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="main-modal animated fadeIn faster flex w-full sm:items-start justify-center self-end pt-4 px-4 text-center sm:block sm:p-0 lg:items-end m-auto md:m-0 md:mt-auto lg:mt-0"
      >
        <div
          class="border-t border-gray-50 dark:border-dark-1 self-end align-bottom bg-white dark:bg-dark-2 m-auto text-left max-w-full w-full"
        >
          <div class="bg-white rounded-lg dark:bg-dark-2 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium dark:text-white text-gray-900" id="modal-title">
                {{ title }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ description }}
                </p>
              </div>
              <slot />
            </div>
          </div>

          <div class="rounded-b-lg bg-gray-50 dark:bg-dark-1 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                @click="submit"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Confirmar
              </button>
            </span>

            <button
              @click.prevent="handleClose"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HxcBtn from "@/components/Buttons/btn.vue";
import { useStore } from "vuex";
import { defineComponent, ref } from "vue";
export default {
  name: "BaseModal",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    submit: {
      type: Function,
    },
  },
  components: {
    HxcBtn,
  },
  setup() {
    const store = useStore();
    const collapsed = ref(store.state.theme.collapsed);
    const isOnMobile = ref(store.state.theme.isOnMobile);

    console.log("collapsed", collapsed.value, "isOnMobile", isOnMobile.value);
    return { collapsed, isOnMobile };
  },
  created() {
    document.addEventListener("keyup", this.onClose);
  },
  destroyed() {
    document.removeEventListener("keyup", this.onClose);
  },
  methods: {
    handleClose() {
      const modal = document.querySelector(".main-modal");
      modal.classList.remove("fadeIn");
      modal.classList.add("fadeOut");
      setTimeout(() => {
        modal.style.display = "none";
        this.$emit("close");
      }, 100);
    },
    onClose(event) {
      // Escape key
      if (event.keyCode === 27) {
        this.handleClose();
      }
    },
  },
  computed: {
    theme() {
      const theme = this.$store.getters["theme/getTheme"];
      return theme;
    },

    selectedTheme() {
      return this.theme === "light" ? "white-theme" : "";
    },
    _collapsed() {
      return this.$store.state.theme.collapsed;
    },
    hideMenu() {
      return this.$store.state.theme.hideMenu;
    },
  },
};
</script>

<style scoped>
.scrollable {
  height: 300px;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.faster {
  -webkit-animation-duration: 500ms;
  animation-duration: 500ms;
}

.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
