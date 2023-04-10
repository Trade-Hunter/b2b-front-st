<template>
  <div
    v-if="c !== -1"
    class="h-full z-50 place-items-center flex flex-row justify-center py-2 w-full absolute text-2xl font-semibold italic text-center text-gray-900 dark:text-white"
  >
    <div
      class="flex rounded-lg drop-shadow flex-col shadow-2xl dark:bg-dark-1 bg-white w-full md:w-1/2 lg:w-1/2 transition transform hover:-translate-y-1 hover:shadow-red-500/90"
    >
      <span
        class="animate-pulse absolute inline-flex h-full w-full rounded-md shadow-2xl shadow-red-500/70 ... z-0"
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
        <span class="relative rounded-md px-2 py-2 mb-2 text-sm">
          Por ser usuário gratuito, seu plano atual não contempla todas as
          funcionalidades da plataforma e os dados na sua tela estão com
          <button
            class="bg-red-500 rounded-md px-2 text-sm font-semibold text-white"
          >
            DELAY</button
          ><br />Assine um de nossos planos para melhorar sua experiênca.
        </span>
      </div>
      <div class="mb-5 mt-6 self-center flex flex-row h-12 z-0">
        <a href="/#pricing">
          <button
            class="z-10 mb-5 text-center border border-sky-400 text-white dark:hover:bg-dark-1 bg-sky-500 py-2 px-6 rounded text-lg hover:text-sky-500 hover:bg-white shadow-md shadow-sky-500/50 ... font-semibold italic"
          >
            Atualizar plano
          </button> </a
        ><a @click="click()" class="ml-5">
          <button
            class="z-10 mb-5 text-center border border-green-400 text-white dark:hover:bg-dark-1 bg-green-500 py-2 px-6 rounded text-lg hover:text-green-500 hover:bg-white shadow-md shadow-green-500/50 ... font-semibold italic"
          >
            UPGRADE GRATUITO
          </button>
        </a>
        <a
          href="https://wa.me/5511973428892"
          target="_blank"
          class="z-10 ml-5 inline-flex items-center justify-center px-5 py-3 md:mr-3 text-base font-medium text-center text-white rounded-lg bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
        >
          Contato
          <svg
            class="w-6 h-6 ml-2 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 39 39"
          >
            <path
              fill="#00E676"
              d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"
            ></path>
            <path
              fill="#FFF"
              d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
            ></path>
          </svg>
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
      if (!this.hasPermission) {
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
