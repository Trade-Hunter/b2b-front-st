<template>
  <transition name="modal">
    <div v-if="isVisible" class="fixed inset-0 flex items-end justify-center">
      <div class="fixed inset-0 bg-black opacity-50 z-40" @click="handleClose"></div>
      <div
        ref="modalRef"
        class="modal-wrapper rounded-t-lg w-full z-50 shadow-lg overflow-y-auto md:max-h-1/2"
        :class="[wrapperClasses]"
      >
        <div class="sticky top-0 z-50 p-6 pb-0" :class="[headerClasses]">
          <div class="text-lg font-medium text-gray-900">{{ title }}</div>
          <div class="text-gray-700">{{ description }}</div>
        </div>
        <div class="p-6 pt-0 mt-2 overflow-y-auto" :class="{ scrollable: scrollable }">
          <slot />
        </div>

        <div class="flex justify-end p-6 sticky bottom-0" :class="[footerClasses]">
          <button v-if="submitEnabled" :class="[confirmButtonClasses]" @click="submit">{{ confirmLabel }}</button>
          <button v-if="cancelEnabled" :class="[cancelButtonClasses]" @click="handleClose">{{ cancelLabel }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    confirmLabel: { type: String, default: "Confirm" },
    cancelLabel: { type: String, default: "Cancel" },
    width: { type: String, default: "w-full" },
    scrollable: { type: Boolean, default: true },
    submitEnabled: { type: Boolean, default: true },
    cancelEnabled: { type: Boolean, default: true },
    wrapperClasses: { type: String, default: "bg-white " },
    headerClasses: { type: String, default: "bg-white" },
    footerClasses: { type: String, default: "bg-white" },
    confirmButtonClasses: {
      type: String,
      default: "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2",
    },
    cancelButtonClasses: { type: String, default: "px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500" },
  },
  emits: ["close", "submit"],
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    open() {
      this.isVisible = true;
      this.$nextTick(() => {
        this.$refs.modalRef.classList.add("animated", "fadeIn", "faster");
      });
    },
    handleClose() {
      this.$refs.modalRef.classList.add("animated", "fadeOut");
      this.$refs.modalRef.classList.remove("fadeIn");
      this.$nextTick(() => {
        this.$refs.modalRef.classList.remove("animated", "fadeOut", "faster");
        this.isVisible = false;
        this.$emit("close");
      });
    },
    submit() {
      this.$emit("submit");
      this.handleClose();
    },
  },
};
</script>
<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease-out;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.modal {
  display: block;
  max-height: 100vh;
}
.scrollable {
  max-height: calc(100vh - var(--modal-header-height, 9rem));
  overflow-y: auto;
}
.animated {
  animation-duration: 0.3s;
}
.fadeIn {
  animation-name: fadeIn;
}
.fadeOut {
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
/* Mobile styles */
@media (max-width: 768px) {
  .modal-wrapper {
    max-height: 100%;
  }
  .scrollable {
    max-height: 100%;
  }
}

/* Desktop styles */
@media (min-width: 768px) {
  .modal-wrapper {
    max-height: unset;
  }
  .scrollable {
    max-height: var(--modal-scrollable-max-height, 350px);
  }
}
</style>
