<template>
  <HxcMenu>
    <div class="mb-2 flex px-4 pt-6 h-full overflow-hidden bg-dark-2 flex-col">
      <div class="flex">
        <h2 class="mb-2 text-xl uppercase tracking-wider font-semibold text-gray-900 dark:text-white">
          Melhores estruturas de opções
        </h2>

        <div class="flex h-8 z-20 gap-x-4 flex-row content-center grow justify-start pl-20 mb-4">
          <div class="flex h-full my-auto rounded-sm md:mr-1">
            <span class="font-mono h-full my-auto py-1 bg-slate-800 px-2"> Estrategia </span>
            <select
              v-model="estrategia"
              @change="changeEquity()"
              class="w-48 ml-auto h-full px-2 dark:bg-dark-1 rounded-r-sm"
            >
              <option v-for="item in estrategias" :value="item" :key="item" class="bg-transparent dark:bg-dark-1">
                {{ item }}
              </option>
            </select>
          </div>
          <div class="flex h-full my-auto rounded-sm md:mr-1">
            <span class="font-mono h-full my-auto py-1 bg-slate-800 px-2">Market Outlook</span>
            <select v-model="direcao" @change="changeEquity()" class="w-24 h-full px-2 dark:bg-dark-1 rounded-r-sm">
              <option v-for="item in direcoes" :value="item" :key="item" class="bg-transparent dark:bg-dark-1">
                {{ item }}
              </option>
            </select>
          </div>
          <div class="flex h-full my-auto rounded-sm md:mr-1">
            <span class="font-mono h-full my-auto py-1 bg-slate-800 px-2">Risco</span>
            <select v-model="risco" @change="changeEquity()" class="w-24 h-full px-2 dark:bg-dark-1 rounded-r-sm">
              <option v-for="item in riscos" :value="item" :key="item" class="bg-transparent dark:bg-dark-1">
                {{ item }}
              </option>
            </select>
          </div>
          <div class="flex h-full my-auto rounded-sm md:mr-1">
            <span class="font-mono h-full my-auto py-1 bg-slate-800 px-2">Retorno</span>
            <select v-model="retorno" @change="changeEquity()" class="w-24 h-full px-2 dark:bg-dark-1 rounded-r-sm">
              <option v-for="item in retornos" :value="item" :key="item" class="bg-transparent dark:bg-dark-1">
                {{ item }}
              </option>
            </select>
          </div>

          <div class="ml-auto h-full bg-blue-500 flex my-auto text-center rounded-sm md:mr-1">
            <span class="font-mono my-auto px-2">Última Atualização</span>

            <span class="px-4 py-1.5 py-auto dark:bg-dark-1 rounded-r-sm text-white">
              {{ ultAtt }}
            </span>
          </div>
        </div>
      </div>
      <hr class="w-2/3 m-auto mb-4 border-slate-600" />

      <div class="flex h-8 z-20 flex-row content-center justify-center mb-7">
        <div
          v-for="sortC in sortColumns"
          :key="sortC"
          @click="changeSort(sortC.value)"
          class="bg-dark-1 border border-dark-1 flex h-full my-auto text-center rounded-sm md:mr-1"
        >
          <span class="font-mono my-auto select-none px-2">
            {{ sortC.name }}
          </span>

          <div class="pr-2 w-6">
            <svg
              v-if="sortField == sortC.value && sortDir == 1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            <svg
              v-if="sortField == sortC.value && sortDir == -1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>
      <custom-scrollbar :style="{ height: '99%' }" :autoExpand="false" class="h-full">
        <div class="flex flex-wrap no-scrollbar overflow-scroll justify-center">
          <div
            v-for="(estrutura, index) in estruturas"
            :key="estrutura"
            class="flex flex-col m-1 pt-1 rounded-md bg-dark-1 shadow-md shadow-gray-800 border border-dark-1"
            style="width: 585px"
          >
            <div class="mb-2 flex text-md font-medium">
              <p class="uppercase px-2">
                {{ index + 1 }}
              </p>

              <span class="ml-1 font-normal rounded-md bg-slate-800 px-3">MGLU3</span>
              <div class="ml-auto font-thin">
                <span class="rounded-md text-sm px-2">
                  ASSIMETRIA:
                  <span class="ml-1 font-medium text-green-500"> ALTA </span>
                </span>
                <span class="rounded-md text-sm px-2">
                  RISCO:
                  <span class="ml-1 font-medium text-red-500"> ALTO </span>
                </span>
              </div>
            </div>
            <div class="flex flex-row">
              <div class="flex mb-6 flex-col text-xs justify-end">
                <div v-for="serie in estrutura.series" :key="serie">
                  <div class="flex gap-x-2 gap-y-1">
                    <span class="text-green-500">{{ serie.symbol }}</span>
                    <span>
                      {{ serie.strike }}
                    </span>
                    <span> {{ serie.close }}</span>
                  </div>
                </div>
              </div>
              <div class="ml-2 flex w-full flex-col rounded-md justify-between">
                <div class="flex w-full content-center justify-between flex-row">
                  <div class="flex-col text-center w-1/3">
                    <p>Métrica 1:</p>
                    <p class="font-medium">238%</p>
                  </div>
                  <div class="flex-col text-center w-1/3">
                    <p>Métrica 2:</p>
                    <p class="text-red-500 font-medium">Infinito</p>
                  </div>
                  <div class="flex-col text-center w-1/3">
                    <p>Métrica 3:</p>
                    <p class="font-medium">0.1</p>
                  </div>
                </div>
                <div class="mb-1 mt-2 flex w-full content-center justify-between flex-row px-2">
                  <div class="flex-col text-center w-1/3">
                    <p>Lucro Máximo:</p>
                    <p class="font-medium">238%</p>
                  </div>
                  <div class="flex-col text-center w-1/3">
                    <p>Perda Máxima:</p>
                    <p class="text-red-500 font-medium">Infinito</p>
                  </div>
                  <div class="flex-col text-center w-1/3">
                    <p>Risco Retorno:</p>
                    <p class="font-medium">0.1</p>
                  </div>
                </div>
                <div class="ml-auto mt-auto place-self-end">
                  <button class="uppercase bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                    Montar Estrutura
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </custom-scrollbar>
    </div>
  </HxcMenu>
</template>

<script>
import HxcMenu from "@/components/Menu/Menu.vue";
import VueElementLoading from "vue-element-loading";
import { ref } from "vue";
export default {
  components: {
    HxcMenu,
    VueElementLoading,
  },
  data() {
    return {
      estrategias: [
        "Box de 3 Pontas",
        "Call Spread",
        "Put Spread",
        "Ratio Backspread",
        "Straddle",
        "Borboleta",
        "Condor",
        "Lançamento Coberto",
      ],

      filters: [
        {
          name: "Box de 3 pontas",
          items: [{ name: "oioi", options: "coe coe" }],
        },
      ],
      estrategia: "Condor",

      direcoes: ["Bullish", "Neutro", "Bearish", "Todas"],
      direcao: "Todas",

      riscos: ["Ilimitado", "Limitado", "Todas"],
      risco: "Todas",

      retornos: ["Ilimitado", "Limitado", "Todas"],
      retorno: "Todas",

      ultAtt: "02:05:00",

      estruturas: [
        {
          nome: "Trava de Alta",
          eq: "MGLU3",
          assimetria: "Alta",
          risco: "Baixo",
          risco_retorno: 238.23,
          series: [
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
          ],
        },
        {
          nome: "Trava de Alta",
          eq: "MGLU3",
          assimetria: "Alta",
          risco: "Baixo",
          risco_retorno: 238.23,
          series: [
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
          ],
        },
        {
          nome: "Trava de Alta",
          eq: "MGLU3",
          assimetria: "Alta",
          risco: "Baixo",
          risco_retorno: 238.23,
          series: [
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
          ],
        },
        {
          nome: "Trava de Alta",
          eq: "MGLU3",
          assimetria: "Alta",
          risco: "Baixo",
          risco_retorno: 238.23,
          series: [
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
          ],
        },
        {
          nome: "Trava de Alta",
          eq: "MGLU3",
          assimetria: "Alta",
          risco: "Baixo",
          risco_retorno: 238.23,
          series: [
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
            {
              symbol: "VALET312",
              strike: 23.12,
              close: 0.2,
              side: "V",
            },
          ],
        },
      ],

      sortColumns: [
        {
          name: "Risco",
          value: "risco",
        },
        {
          name: "Retorno",
          value: "ret",
        },
        {
          name: "Risco / Retorno",
          value: "risc_ret",
        },
        {
          name: "Max Payoff %",
          value: "max_payoff",
        },
        {
          name: "Volatilidade",
          value: "vol",
        },
      ],
      sortField: "risco",
      sortDir: -1,
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
</style>
