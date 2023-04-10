<template>
  <HxcMenu>
    <div class="mb-2 flex pl-4 pt-2 h-full overflow-auto bg-dark-2 flex-col">
      <div class="flex">
        <h2 class="mb-2 text-xl font-extrabold text-gray-900 dark:text-gray-50 font-mono">Selecione uma Estrutura</h2>
        <div
          class="ml-auto mr-2 cursor-pointer"
          v-tooltip:left.tooltip="'Entenda a dinâmica dessa tela.'"
          @click="toggleInfo"
        >
          <InformationCircle class="hover:scale-125" />
        </div>
      </div>

      <div class="flex h-8 z-20 gap-x-4 flex-row content-center justify-start mb-4">
        <div class="flex my-auto rounded-sm md:mr-1">
          <span class="font-mono my-auto py-1 bg-slate-800 px-2">Market Outlook</span>
          <select v-model="direcao" @change="changeEquity()" class="w-24 h-full px-2 dark:bg-dark-1 rounded-r-sm">
            <option v-for="item in direcoes" :value="item" :key="item" class="bg-transparent dark:bg-dark-1">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="flex my-auto rounded-sm md:mr-1">
          <span class="font-mono h-full my-auto py-1 bg-slate-800 px-2">Risco</span>
          <select v-model="risco" @change="changeEquity()" class="w-24 h-full px-2 dark:bg-dark-1 rounded-r-sm">
            <option v-for="item in riscos" :value="item" :key="item" class="bg-transparent dark:bg-dark-1">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="flex my-auto rounded-sm md:mr-1">
          <span class="font-mono my-auto py-1 bg-slate-800 px-2">Retorno</span>
          <select v-model="retorno" @change="changeEquity()" class="w-24 h-full px-2 dark:bg-dark-1 rounded-r-sm">
            <option v-for="item in retornos" :value="item" :key="item" class="bg-transparent dark:bg-dark-1">
              {{ item }}
            </option>
          </select>
        </div>
      </div>

      <div class="no-scrollbar overflow-y-scroll">
        <div class="grid w-full grid-cols-4 gap-y-4 p-2">
          <div v-for="strat in estrategias" :key="strat" class="flex flex-col">
            <div class="">
              <div class="">
                <img
                  class="img-neumorphic block"
                  style="height: 150px"
                  src="https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/1.png"
                />
              </div>
            </div>
            <div class="text-start">
              <h2>
                <div class="px-2 h-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 inline-block text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>

                  Risco Limitado
                </div>
              </h2>
              <h2>Oi</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </HxcMenu>
</template>

<script>
import HxcMenu from "@/components/Menu/Menu.vue";
import VueElementLoading from "vue-element-loading";
import { ref } from "vue";
import { InformationCircle } from "@/assets/icons/heroicons";
export default {
  components: {
    HxcMenu,
    VueElementLoading,
    InformationCircle,
  },
  data() {
    return {
      direcoes: ["Bullish", "Neutro", "Bearish", "Todas"],
      direcao: "Todas",

      riscos: ["Ilimitado", "Limitado", "Todas"],
      risco: "Todas",

      retornos: ["Ilimitado", "Limitado", "Todas"],
      retorno: "Todas",

      estrategias: [
        {
          name: "Box 3 Pontas",
          outlook: "Neutro",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/1.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/1.png",
          risco: "Limitado",
          retorno: "Limitado",
        },
        {
          name: "Call Spread",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
        },
        {
          name: "Put Spread",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/3.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/3.png",
          risco: "Limitado",
          retorno: "Limitado",
        },
        {
          name: "Call Spread",
          outlook: "Bearish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/4.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/4.png",
          risco: "Limitado",
          retorno: "Limitado",
        },
        {
          name: "Put Spread",
          outlook: "Bearish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/5.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/5.png",
          risco: "Limitado",
          retorno: "Limitado",
        },
        {
          name: "Call Backspread",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/6.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/6.png",
          risco: "Limitado",
          retorno: "Ilimitado",
        },
        {
          name: "Long Straddle",
          outlook: "Neutro",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/7.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/7.png",
          risco: "Limitado",
          retorno: "Ilimitado",
        },
        {
          name: "Short Straddle",
          outlook: "Neutro",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/8.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/8.png",
          risco: "Ilimitado",
          retorno: "Limitado",
        },
        {
          name: "Short Butterfly",
          outlook: "Neutro",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/9.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/9.png",
          risco: "Limitado",
          retorno: "Limitado",
        },
        {
          name: "Long Butterfly",
          outlook: "Neutro",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/10.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/10.png",
          risco: "Limitado",
          retorno: "Limitado",
        },
        {
          name: "Long Iron Condor",
          outlook: "Neutro",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/11.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/11.png",
          risco: "Limitado",
          retorno: "Limitado",
        },
        {
          name: "Short Iron Condor",
          outlook: "Neutro",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/12.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/12.png",
          risco: "Limitado",
          retorno: "Limitado",
        },
        {
          name: "Lançamento Coberto - Put",
          outlook: "Neutro",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/13.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/13.png",
          risco: "Ilimitado",
          retorno: "Limitado",
        },
        {
          name: "Lançamento Coberto - Call",
          outlook: "Bearish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/14.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/14.png",
          risco: "Ilimitado",
          retorno: "Limitado",
        },
      ],
    };
  },
  setup() {
    const scroll = ref({ scrollEl: HTMLDivElement });

    const handleClickScrollToTop = () => {
      if (!scroll.value.scrollEl) return;
      scroll.value.scrollEl.scrollTo({ top: 0, behavior: "smooth" });
    };
    return { scroll, handleClickScrollToTop };
  },

  methods: {
    changeSort(value) {
      if (this.sortField == value) this.sortDir = this.sortDir * -1;
      this.sortField = value;
    },
  },
};
</script>

<style scoped>
/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
<style scoped>
.scrollbar__wrapper {
  width: calc(100%);
  height: calc(100%);
}

.card-neumorphic {
  border-radius: 5px;
  background-color: #212223;
  box-shadow: 8px 8px 15px 1px rgba(8, 8, 59, 0.36);
}
</style>
