<template>
  <div
    v-if="closeDelay"
    class="z-10 mt-10 md:mt-20 pl-10 pr-10 place-items-center flex flex-row justify-center py-2 w-full absolute text-md md:text-2xl font-semibold italic text-center text-gray-900 dark:text-white"
  >
    <div
      class="flex bg-white w-full rounded-lg border border-3 border-sky-400 transition transform hover:-translate-y-1 hover:shadow-sky-500/90 shadow-lg shadow-sky-500/70 dark:bg-dark-1 ..."
    >
      <span
        class="animate-pulse absolute inline-flex h-full w-full rounded-md shadow-2xl shadow-sky-500/70 ... z-0"
      ></span>
      <div class="flex flex-col place-items-center self-center center w-full">
        <a href="/#pricing" class="z-0 w-full"> </a>

        <div class="flex flex-col md:flex-row w-full">
          <div class="w-1/5 h-full center self-center align-middle">
            <img
              src="https://cdn-th.s3.sa-east-1.amazonaws.com/assets/mockuper+(10).png"
            />
          </div>
          <div class="flex flex-col md:pt-4 pr-4 md:w-1/2 grow">
            <div class="flex justify-center z-0 p-1 self-start mb-1 w-full">
              <span
                class="justify-center font-bold text-2xl underline mb-1 inline-block"
                >Parceria TradeHunter & BRA!
              </span>
            </div>
            <span class="hidden md:block relative rounded-md py-2 mb-2"
              >Quer ter acesso a todas as funcionalidades da plataforma
              <button
                class="bg-green-500 rounded-md px-2 font-semibold italic text-white"
              >
                SEM PAGAR NADA
              </button>
              e ainda ganhar ferramentas exclusivas?</span
            >

            <div class="relative mb-2 self-center z-0">
              <button
                @click="click"
                class="z-0 text-center border border-sky-400 text-white dark:hover:bg-dark-1 bg-sky-500 py-2 px-6 rounded text-lg hover:text-sky-500 hover:bg-white shadow-lg shadow-sky-500/50 ... font-semibold italic"
              >
                SAIBA MAIS CLICANDO AQUI
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="rocket-launch"
                  class="ml-2 inline-flex animate-bounce mb-1 h-4 w-4 svg-inline--fa fa-rocket-launch"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M117.8 127.1H207C286.9-3.743 409.5-8.542 483.9 5.255C495.6 7.41 504.6 16.45 506.7 28.07C520.5 102.5 515.7 225.1 384 304.1V394.2C384 419.7 370.6 443.2 348.7 456.2L260.2 508.6C252.8 513 243.6 513.1 236.1 508.9C228.6 504.6 224 496.6 224 488V373.3C224 350.6 215 328.1 199 312.1C183 296.1 161.4 288 138.7 288H24C15.38 288 7.414 283.4 3.146 275.9C-1.123 268.4-1.042 259.2 3.357 251.8L55.83 163.3C68.79 141.4 92.33 127.1 117.8 127.1H117.8zM384 88C361.9 88 344 105.9 344 128C344 150.1 361.9 168 384 168C406.1 168 424 150.1 424 128C424 105.9 406.1 88 384 88zM166.5 470C117 519.5 .4762 511.5 .4762 511.5C.4762 511.5-7.516 394.1 41.98 345.5C76.37 311.1 132.1 311.1 166.5 345.5C200.9 379.9 200.9 435.6 166.5 470zM119.8 392.2C108.3 380.8 89.81 380.8 78.38 392.2C61.92 408.7 64.58 447.4 64.58 447.4C64.58 447.4 103.3 450.1 119.8 433.6C131.2 422.2 131.2 403.7 119.8 392.2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  setup() {
    const store = useStore();
    const hasPermission = store.state.auth.hasPermission;
    const closeDelay = ref(hasPermission ? 0 : 6);

    return {
      hasPermission,
      closeDelay,
    };
  },
  mounted() {
    const reduceDelay = (l = 0) => {
      if (this.closeDelay > 1) {
        this.closeDelay -= 1;
        return setTimeout(() => {
          reduceDelay(l);
        }, 1000);
      } else if (l) {
        setTimeout(() => {
          this.closeDelay = l;
          reduceDelay(l);
        }, 300000);
      }
    };
    reduceDelay(5);

    this.$api.post("/events/track", { name: "elemView", id: "modalBRA" });
  },
  methods: {
    async click() {
      //await this.$api.post('/conversions/track', { name: 'BRA' });
      await this.$api.post("/events/track", {
        name: "elemClick",
        id: "modalBRA",
      });
      window.location.href =
        "https://lp.sejabra.com.br/trade-hunter?utm_source=tradehunter&utm_medium=banner&utm_campaign=hunter-platform-level";
    },
  },
};
</script>

<style>
.border-3 {
  border-width: 3px;
}
</style>
