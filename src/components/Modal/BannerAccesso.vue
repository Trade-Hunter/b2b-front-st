<template>
  <div
    v-if="c !== -1"
    class="h-full z-50 place-items-center flex flex-row justify-center py-2 w-full absolute text-2xl font-semibold italic text-center text-gray-900 dark:text-white"
  >
    <div
      class="flex rounded-lg drop-shadow flex-col shadow-2xl dark:bg-dark-1 bg-white w-full md:w-1/2 lg:w-1/2 transition transform hover:-translate-y-1 hover:shadow-sky-500/90"
    >
      <span
        class="animate-pulse absolute inline-flex h-full w-full rounded-md shadow-2xl shadow-sky-500/70 ... z-0"
      ></span>
      <div
        class="h-full flex flex-col place-items-center self-center w-full center"
      >
        <div class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mt-5 h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <span v-if="c > 0" class="self-center text-xs mb-5">
          Aguarde {{ c }}s. para fechar
        </span>
        <button
          v-if="c == 0"
          @click="c--"
          class="z-0 absolute mb-1 self-end text-xs ml-2 text-white bg-red-500 px-2 py-1 rounded-md"
        >
          ✖
        </button>
        <span class="relative rounded-md px-2 py-2 mb-2"
          >Seu plano atual não oferece acesso a esse módulo, realize um
          <button
            class="bg-red-500 rounded-md px-2 py-1 font-semibold italic text-white"
          >
            upgrade
          </button>
          para visualizar o conteúdo completo e sem atraso.
        </span>
      </div>
      <div class="mb-5 mt-6 self-center flex flex-row z-0">
        <a href="/#pricing">
          <button
            class="z-10 mb-5 text-center border border-sky-400 text-white dark:hover:bg-dark-1 bg-sky-500 py-2 px-6 rounded text-lg hover:text-sky-500 hover:bg-white shadow-lg shadow-sky-500/50 ... font-semibold italic"
          >
            Atualizar plano
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
          </button> </a
        ><a @click="click()" class="ml-5">
          <button
            class="z-10 mb-5 text-center border border-green-400 text-white dark:hover:bg-dark-1 bg-green-500 py-2 px-6 rounded text-lg hover:text-green-500 hover:bg-white shadow-lg shadow-green-500/50 ... font-semibold italic"
          >
            UPGRADE GRATUITO
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
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: {
    hasPermission: {
      type: Boolean,
      required: true,
    },
    resource: {
      type: String,
      required: false,
    },
    force: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      c: -1,
      initialDelay: 0,
      resources: {
        hoptions: "",
        hwatchlist: "",
      },
    };
  },
  created() {
    return new Promise(async (resolve, reject) => {
      if (
        this.$store.state.auth.showModal ||
        (!this.hasPermission && this.force)
      ) {
        function sleep(ms) {
          return new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        }

        const reduceDelay = async (l = 0) => {
          this.c = l;
          while (this.c > 0) {
            this.c -= 1;
            await sleep(1000);
          }
          setTimeout(() => reduceDelay(l), 900000);
        };

        setTimeout(() => reduceDelay(6), 5000);
      }
      resolve(true);
    });
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
