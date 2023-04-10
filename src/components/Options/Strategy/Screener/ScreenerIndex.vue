<template>
  <HxcMenu>
    <div class="mb-2 flex pl-4 pr-2 pt-2 h-full overflow-auto bg-dark-2 flex-col">
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
        <custom-scrollbar :style="{ height: '100%' }" :autoExpand="false" class="h-full">
          <div class="grid grid-cols-4 gap-x-4 gap-y-4 w-full mx-auto items-center justify-center">
            <div v-for="i in estrategias" :key="i" class="box-strat rounded-sm border" style="">
              <div class="">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="flex backdrop-blur-sm">
                  <div class="box-strat-title px-2 h-6">
                    {{ i.name }}
                  </div>
                  <div v-if="i.outlook == 'Bullish'" class="px-2 h-6">
                    <span>{{ i.outlook }}</span>
                    <div class="inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-4 mx-2 text-green-500 inline-block"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                        />
                      </svg>
                    </div>
                  </div>
                  <div v-else-if="i.outlook == 'Neutro'" class="bg-yellow-500 px-2 h-6">
                    {{ i.outlook }}
                  </div>
                  <div v-else class="px-2 h-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-4 text-red-500 inline-block"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                      />
                    </svg>

                    {{ i.outlook }}
                  </div>
                </div>
                <div class="flex flex-row">
                  <div class="">
                    <img class="img-neumorphic block" style="height: 150px" v-bind:src="i.img_dark" />
                  </div>
                </div>
                <div class="flex backdrop-blur-sm font-thin text-sm justify-center">
                  <div class="flex grow text-center">
                    <div v-if="i.risco == 'Limitado'" class="px-2 h-6">
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

                      Risco {{ i.risco }}
                    </div>
                    <div v-else class="px-2 h-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-yellow-600 inline-block"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                      Risco {{ i.risco }}
                    </div>

                    <div v-if="i.retorno == 'Limitado'" class="px-2 h-6">
                      <span class="text-yellow-500">∞</span>
                      Retorno {{ i.retorno }}
                    </div>
                    <div v-else class="px-2 h-6">Retorno {{ i.retorno }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </custom-scrollbar>
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
          value: "box3p",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [{ name: "Ordenação", options: ["boxVsSelic", "custo"] }],
          columns: [
            { name: "Preço Box", value: "boxPrice" },
            { name: "Taxa Box", value: "boxTx" },
            { name: "Taxa x Selic", value: "boxVsSelic" },
            { name: "Prazo", value: "dias" },
          ],
        },
        {
          name: "Call Spread Bullish",
          value: "spread",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "prob", options: [{ name: "alta" }, { name: "media" }, { name: "baixa" }] },
            { name: "tamanhoAsa", type: "number", from: 0.5, to: 25, step: 0.5 },
            { name: "ratio_type", options: [{ name: "1/2" }, { name: "1/3" }, { name: "2/3" }] },
          ],
          columns: [
            { name: "Dif. Strike", value: "difStk" },
            { name: "Custo", value: "spComp" },
            { name: "Score", value: "score" },
            { name: "Prob. Exerc.", value: "delta2" },
            { name: "Delta Operação", value: "saldoDelta" },
            { name: "Rentabilidade", value: "retLiqCompra" },
          ],
        },
        {
          name: "Call Spread Bearish",
          value: "spread",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "prob", options: [{ name: "alta" }, { name: "media" }, { name: "baixa" }] },
            { name: "tamanhoAsa", type: "number", from: 0.5, to: 25, step: 0.5 },
            { name: "ratio_type", options: [{ name: "1/2" }, { name: "1/3" }, { name: "2/3" }] },
          ],
          columns: [
            { name: "Dif. Strike", value: "difStk" },
            { name: "Custo", value: "spVen" },
            { name: "Score", value: "score2" },
            { name: "Prob. Exerc.", value: "delta2" },
            { name: "Delta Operação", value: "saldoDelta" },
            { name: "Gordura", value: "gordura" },
          ],
        },
        {
          name: "Put Spread Bullish",
          value: "spread",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "prob", options: [{ name: "alta" }, { name: "media" }, { name: "baixa" }] },
            { name: "tamanhoAsa", type: "number", from: 0.5, to: 25, step: 0.5 },
            { name: "ratio_type", options: [{ name: "1/2" }, { name: "1/3" }, { name: "2/3" }] },
          ],
          columns: [
            { name: "Dif. Strike", value: "difStk" },
            { name: "Custo", value: "spComp" },
            { name: "Score", value: "score" },
            { name: "Prob. Exerc.", value: "delta2" },
            { name: "Delta Operação", value: "saldoDelta" },
            { name: "Rentabilidade", value: "retLiqCompra" },
          ],
        },
        {
          name: "Put Spread Bearish",
          value: "spread",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "prob", options: [{ name: "alta" }, { name: "media" }, { name: "baixa" }] },
            { name: "tamanhoAsa", type: "number", from: 0.5, to: 25, step: 0.5 },
            { name: "ratio_type", options: [{ name: "1/2" }, { name: "1/3" }, { name: "2/3" }] },
          ],
          columns: [
            { name: "Dif. Strike", value: "difStk" },
            { name: "Custo", value: "spVen" },
            { name: "Score", value: "score2" },
            { name: "Prob. Exerc.", value: "delta2" },
            { name: "Delta Operação", value: "saldoDelta" },
            { name: "Gordura", value: "gordura" },
          ],
        },
        {
          name: "Call Ratio Backspread",
          value: "spread",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            {
              name: "prob",
              options: [
                { name: "Alta", value: "alta" },
                { name: "Média", value: "media" },
                { name: "Baixa", value: "baixa" },
              ],
            },
            { name: "tamanhoAsa", type: "number", from: 3, to: 25, step: 1 },
            { name: "ratio_type", options: [{ name: "1/2" }, { name: "1/3" }, { name: "2/3" }] },
          ],
          columns: [
            { name: "Dif. Strike", value: "difStk" },
            { name: "Custo", value: "" },
          ],
        },
        {
          name: "Long Straddle",
          value: "straddle",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            {
              name: "Ordenação",
              value: "metrica",
              options: [
                { name: "", value: "gordura" },
                { name: "", value: "soma_premios" },
                { name: "", value: "score" },
              ],
            },
          ],
          columns: [
            { name: "Delta", value: "" },
            { name: "Vol.", value: "" },
            { name: "Custo", value: "somaPremios" },
            { name: "Afast. Min %", value: "premiosStrike" },
            { name: "Score", value: "score" },
            { name: "Imbalance", value: "gordura" },
          ],
        },
        {
          name: "Short Straddle",
          value: "straddle",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            {
              name: "Ordenação",
              value: "metrica",
              options: [
                { name: "", value: "gordura" },
                { name: "", value: "soma_premios" },
                { name: "Score", value: "score" },
              ],
            },
          ],
          columns: [
            { name: "Delta", value: "" },
            { name: "Vol.", value: "" },
            { name: "Crédito", value: "somaPremios" },
            { name: "Afast. Max %", value: "premiosStrike" },
            { name: "Score", value: "score" },
            { name: "Imbalance", value: "gordura" },
          ],
        },
        {
          name: "Call Long Borboleta",
          value: "borbs",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "Escala Mínima", value: "escalaMin", type: "number", from: 0.5, to: 25, step: 0.5 },
            {
              name: "Ordenação",
              value: "metrica",
              options: [
                { name: "Melhores Ofertas", value: "boca" },
                { name: "Último Negócio", value: "ultimo" },
                { name: "Custo Benefício", value: "custo_beneficio" },
              ],
            },
          ],
          columns: [
            { name: "Miolo", value: "miolo" },
            { name: "Delta Miolo", value: "" },
            { name: "Vol Miolo", value: "" },
            { name: "Custo Boca", value: "" },
            { name: "Escala", value: "" },
            { name: "Escala Prop.", value: "" },
          ],
        },
        {
          name: "Call Short Borboleta",
          value: "borbs",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "Escala Mínima", value: "escalaMin", type: "number", from: 0.5, to: 25, step: 0.5 },
            {
              name: "Ordenação",
              value: "metrica",
              options: [
                { name: "Melhores Ofertas", value: "boca" },
                { name: "Último Negócio", value: "ultimo" },
                { name: "Custo Benefício", value: "custo_beneficio" },
              ],
            },
          ],
          columns: [
            { name: "Miolo", value: "miolo" },
            { name: "Delta Miolo", value: "" },
            { name: "Vol Miolo", value: "" },
            { name: "Crédito Boca", value: "" },
            { name: "Escala", value: "" },
            { name: "Escala Prop.", value: "" },
          ],
        },
        {
          name: "Put Long Borboleta",
          value: "borbs",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "Escala Mínima", value: "escalaMin", type: "number", from: 0.5, to: 25, step: 0.5 },
            {
              name: "Ordenação",
              value: "metrica",
              options: [
                { name: "Melhores Ofertas", value: "boca" },
                { name: "Último Negócio", value: "ultimo" },
                { name: "Custo Benefício", value: "custo_beneficio" },
              ],
            },
          ],
          columns: [
            { name: "Miolo", value: "miolo" },
            { name: "Delta Miolo", value: "" },
            { name: "Vol Miolo", value: "" },
            { name: "Custo Boca", value: "" },
            { name: "Escala", value: "" },
            { name: "Escala Prop.", value: "" },
          ],
        },
        {
          name: "Put Short Borboleta",
          value: "borbs",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "Escala Mínima", value: "escalaMin", type: "number", from: 0.5, to: 25, step: 0.5 },
            {
              name: "Ordenação",
              value: "metrica",
              options: [
                { name: "Melhores Ofertas", value: "boca" },
                { name: "Último Negócio", value: "ultimo" },
                { name: "Custo Benefício", value: "custo_beneficio" },
              ],
            },
          ],
          columns: [
            { name: "Miolo", value: "miolo" },
            { name: "Delta Miolo", value: "" },
            { name: "Vol Miolo", value: "" },
            { name: "Crédito Boca", value: "" },
            { name: "Escala", value: "" },
            { name: "Escala Prop.", value: "" },
          ],
        },
        {
          name: "Call Long Condor",
          value: "condor",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "", value: "minDelta", type: "number", from: 0, to: 1, step: 0.05 },
            { name: "", value: "maxDelta", type: "number", from: 0, to: 1, step: 0.05 },
            { name: "", value: "minimoMesa", type: "number", from: 0.5, to: 25, step: 0.5 },
            {
              name: "Ordenação",
              value: "metrica",
              options: [
                { name: "Melhores Ofertas", value: "boca" },
                { name: "Último Negócio", value: "ultimo" },
                { name: "Custo Benefício", value: "custo_beneficio" },
              ],
            },
          ],
          columns: [
            { name: "BreakEven", value: "" },
            { name: "Range Gain Ratio", value: "" },
            { name: "Custo Boca", value: "" },
            { name: "Escala Asa", value: "" },
            { name: "Escala de Meio", value: "" },
            { name: "Risco/Retorno", value: "" },
          ],
        },
        {
          name: "Call Short Condor",
          value: "condor",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "Delta Min", value: "minDelta", type: "number", from: 0, to: 1, step: 0.05 },
            { name: "Delta Máx", value: "maxDelta", type: "number", from: 0, to: 1, step: 0.05 },
            { name: "Mínimo Mesa", value: "minimoMesa", type: "number", from: 0.5, to: 25, step: 0.5 },
            {
              name: "Ordenação",
              value: "metrica",
              options: [
                { name: "Melhores Ofertas", value: "boca" },
                { name: "Último Negócio", value: "ultimo" },
                { name: "Custo Benefício", value: "custo_beneficio" },
              ],
            },
          ],
          columns: [
            { name: "BreakEven", value: "" },
            { name: "Range Gain Ratio", value: "" },
            { name: "Custo Boca", value: "" },
            { name: "Escala Asa", value: "" },
            { name: "Escala de Meio", value: "" },
            { name: "Custo/Beneficio", value: "" },
          ],
        },
        {
          name: "Put Long Condor",
          value: "condor",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "Delta Mín", value: "minDelta", type: "number", from: 0, to: 1, step: 0.05 },
            { name: "Delta Máx", value: "maxDelta", type: "number", from: 0, to: 1, step: 0.05 },
            { name: "Mínimo Mesa", value: "minimoMesa", type: "number", from: 0.5, to: 25, step: 0.5 },
            {
              name: "Ordenação",
              value: "metrica",
              options: [
                { name: "Melhores Ofertas", value: "boca" },
                { name: "Último Negócio", value: "ultimo" },
                { name: "Custo Benefício", value: "custo_beneficio" },
              ],
            },
          ],
          columns: [
            { name: "BreakEven", value: "" },
            { name: "Range Gain Ratio", value: "" },
            { name: "Custo Boca", value: "" },
            { name: "Escala Asa", value: "" },
            { name: "Escala de Meio", value: "" },
            { name: "Risco/Retorno", value: "" },
          ],
        },
        {
          name: "Put Short Condor",
          value: "condor",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            { name: "Delta Mín", value: "minDelta", type: "number", from: 0, to: 1, step: 0.05 },
            { name: "Delta Máx", value: "maxDelta", type: "number", from: 0, to: 1, step: 0.05 },
            { name: "Mínimo Mesa", value: "minimoMesa", type: "number", from: 0.5, to: 25, step: 0.5 },
            {
              name: "Ordenação",
              value: "metrica",
              options: [
                { name: "Melhores Ofertas", value: "boca" },
                { name: "Último Negócio", value: "ultimo" },
                { name: "Custo Benefício", value: "custo_beneficio" },
              ],
            },
          ],
          columns: [
            { name: "BreakEven", value: "" },
            { name: "Range Gain Ratio", value: "" },
            { name: "Custo Boca", value: "" },
            { name: "Escala Asa", value: "" },
            { name: "Escala de Meio", value: "" },
            { name: "Custo/Beneficio", value: "" },
          ],
        },
        {
          name: "Lançamento Coberto Call",
          value: "lancamento",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            {
              name: "moneyness",
              value: "moneyness",
              options: [
                { name: "ITM", value: "ITM" },
                { name: "ATM", value: "AT" },
                { name: "OTM", value: "OTM" },
              ],
            },
            {
              name: "Ordenação",
              value: "criterio",
              options: [
                { name: "Taxa Lançamento", value: "taxa" },
                { name: "Taxa Proteção", value: "protecao" },
                { name: "Vol. Implícita", value: "vol" },
              ],
            },
          ],
          columns: [
            { name: "Delta", value: "" },
            { name: "Vol", value: "" },
            { name: "Taxa", value: "" },
            { name: "Proteção", value: "" },
          ],
        },
        {
          name: "Lançamento Coberto Put",
          value: "lancamento",
          outlook: "Bullish",
          description: "",
          img_light: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/light/2.png",
          img_dark: "https://cdn-th.s3.sa-east-1.amazonaws.com/artes/grafico-payoff/dark/2.png",
          risco: "Limitado",
          retorno: "Limitado",
          risco: "Limitado",
          retorno: "Limitado",
          filters: [
            {
              name: "Moneyness",
              value: "moneyness",
              options: [
                { name: "ITM", value: "ITM" },
                { name: "ATM", value: "AT" },
                { name: "OTM", value: "OTM" },
              ],
            },
            {
              name: "Ordenação",
              value: "criterio",
              options: [
                { name: "Taxa Lançamento", value: "taxa" },
                { name: "Taxa Proteção", value: "protecao" },
                { name: "Vol. Implícita", value: "vol" },
              ],
            },
          ],
          columns: [
            { name: "Delta", value: "" },
            { name: "Vol", value: "" },
            { name: "Taxa", value: "" },
            { name: "Proteção", value: "" },
          ],
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
.box-strat {
  border-color: rgba(34, 158, 175, 0.515);
  border-width: 0.12rem;
}
.box-strat-title {
  font-weight: 400;
}
</style>
