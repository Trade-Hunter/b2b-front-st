<template>
  <HxcMenu>
    <div class="flex flex-col h-full dark:bg-dark-2 p-2 pl-4">
      <div class="flex sticky top-0">
        <h2 class="mb-2 text-xl font-extrabold text-gray-900 dark:text-gray-50 font-mono">Hunter Distortions</h2>
        <div
          class="ml-auto mr-2 cursor-pointer"
          v-tooltip:left.tooltip="'Entenda a dinâmica dessa tela.'"
          @click="toggleInfo"
        >
          <InformationCircle class="hover:scale-125" />
        </div>
      </div>

      <div class="flex z-20 flex-wrap md:flex-row content-center justify-center mb-2">
        <div
          v-for="sortC in sortColumns"
          :key="sortC"
          @click="changeSort(sortC.value)"
          class="dark:bg-dark-1 border mx-1 my-1 h-8 border-gray-200 dark:border-dark-1 text-gray-900 dark:text-white flex text-center rounded-sm md:mr-1"
        >
          <span class="font-mono my-auto select-none px-2">
            {{ sortC.name }}
          </span>

          <div class="pr-2 w-6 my-auto">
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

      <custom-scrollbar
        :style="{ height: '99%' }"
        :autoExpand="false"
        :autoHide="false"
        class="w-full no-scrollbar overflow-auto justify-center"
      >
        <div class="w-full no-scrollbar overflow-scroll justify-center">
          <div
            v-for="(dist, i) in sortedDistortions"
            :key="dist.symbol + i"
            class="bg-gray-100 dark:bg-dark-1 rounded-md shadow-md drop-shadow-sm shadow-blue-900/50 p-2 my-2 text-gray-900 dark:text-gray-100"
          >
            <div class="dark:bg-dark-1">
              <div class="flex flex-row md:gap-x-1">
                <div v-if="dist.asset" class="bg-green-700 px-2 font-mono font-semibold text-gray-200">
                  {{ dist.asset }}
                </div>
                <div class="bg-blue-700 px-2 font-mono font-semibold text-gray-200">{{ dist.symbol }}</div>
                <div
                  v-if="dist.type"
                  class="px-2 bg-green-700 font-mono font-semibold text-gray-200"
                  :class="{ 'bg-red-600': dist.type == 'PUT' }"
                >
                  {{ dist.type }}
                </div>
                <!-- <div class="bg-blue-700 px-2 font-mono font-semibold text-gray-200">{{ dist.moneyness }}</div> -->
                <div class="bg-blue-700 ml-auto px-2 font-mono font-semibold text-gray-200">
                  {{ new Date(dist.createdAt).toLocaleString() }}
                </div>
                <div
                  class="bg-blue-700 px-2 font-mono font-semibold cursor-pointer dark:text-gray-200 text-white"
                  @click="dist.show = !dist.show"
                >
                  <span v-if="!dist.show">EXPANDIR</span>
                  <span v-if="dist.show">OCULTAR</span>
                </div>
              </div>

              <div class="flex flex-col mt-1">
                <div class="flex flex-wrap w-full">
                  <div class="flex flex-col">
                    <div class="py-1 px-2 text-start font-semibold dark:text-gray-100">Quantidade</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                      {{ dist.qtt.toLocaleString(`pt-BR`) }}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 px-2 text-start font-semibold dark:text-gray-100">Δ</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                      {{ dist.delta?.toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">VI</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                      {{ dist.vi?.toLocaleString(`pt-BR`) }}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">Notional</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                      R$ {{ dist.notional?.toLocaleString(`pt-BR`) }}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">Vol. Financeiro</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                      R$ {{ dist.vtt.toLocaleString(`pt-BR`) }}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">Vol. Hist</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                      {{ dist.volH?.toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                      %
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">Tx. Lan.</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                      {{ dist.txLan?.toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                      %
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">Prot. Lan</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                      {{
                        dist.protLan?.toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      }}
                      %
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">Vol. Imp.</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                      {{ dist.volImp?.toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                      %
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">Strike</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                      R$
                      {{ dist.strike?.toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">Preço Ativo</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                      R$
                      {{
                        dist.priceAsset?.toLocaleString(`pt-BR`, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      }}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">Vencimento</div>
                    <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">{{ dist.dtVen }}</div>
                  </div>

                  <div class="flex flex-col md:ml-auto">
                    <div class="py-1 text-center font-semibold px-2 dark:text-gray-100">Comprador</div>
                    <div class="text-center dark:bg-dark-1 py-1 px-2 text-sm">
                      <span
                        class="bg-green-700 px-2 rounded-md font-semibold uppercase dark:text-gray-900 text-white"
                        >{{ dist.comprador }}</span
                      >
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="py-1 text-center font-semibold px-2 dark:text-gray-100">Vendedor</div>
                    <div class="text-center dark:bg-dark-1 py-1 px-2 text-sm">
                      <span class="bg-red-700 px-2 rounded-md font-semibold uppercase dark:text-gray-900 text-white">{{
                        dist.vendedor
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <transition name="slide-fade">
                <div class="inner mt-1" v-if="dist.show">
                  <div class="flex flex-row w-full mb-2">
                    <div class="flex flex-col">
                      <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">Negócios</div>
                      <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">{{ dist.nd }}</div>
                    </div>
                    <div class="flex flex-col">
                      <div class="py-1 px-2 text-start font-semibold dark:text-gray-100">Preço Médio</div>
                      <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                        {{
                          dist.avg_price.toLocaleString(`pt-BR`, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        }}
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <div class="py-1 text-start px-2 font-semibold dark:text-gray-100">Maior Concentração</div>
                      <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">{{ dist.conc }}</div>
                    </div>
                    <div class="flex flex-col">
                      <div class="py-1 px-2 text-start font-semibold dark:text-gray-100">Distorção Preço</div>
                      <div class="text-start dark:bg-dark-1 py-1 px-2 text-sm">
                        {{
                          dist.price_d_pct?.toLocaleString(`pt-BR`, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        }}%
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row w-full">
                    <div class="w-full md:w-1/2">
                      <div class="text-start bg-slate-700 py-1">
                        <div class="mb-1 px-2 font-semibold text-gray-200">Compradores</div>
                      </div>
                      <div class="w-full">
                        <table class="table-fixed">
                          <thead class="">
                            <tr class="dark:text-gray-100 w-full">
                              <th class="px-2 font-semibold">Player</th>
                              <th class="px-2 font-semibold">Negócios</th>
                              <th class="px-2 font-semibold">Quantidade</th>
                              <th class="px-2 font-semibold">Preço Médio</th>
                              <!-- <th class="px-2 font-semibold"></th> -->
                            </tr>
                          </thead>
                          <tbody class="text-sm" v-for="cp in dist.compradores" :key="cp.p">
                            <tr>
                              <td class="px-2 py-1">{{ cp.p }}</td>
                              <td class="px-2 py-1">{{ cp.n }}</td>
                              <td class="px-2 py-1">{{ cp.qtt }}</td>
                              <td class="px-2 py-1">{{ cp.avg_price }}</td>
                              <!-- <td class="px-2 py-1">{{ cp.conc }}%</td> -->
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="w-full md:w-1/2">
                      <div class="text-start bg-slate-700 py-1">
                        <div class="mb-1 px-2 font-semibold text-gray-200">Vendedores</div>
                      </div>
                      <div class="w-full">
                        <table class="table-fixed">
                          <thead class="">
                            <tr class="dark:text-gray-100 w-full">
                              <th class="px-2 font-semibold">Player</th>
                              <th class="px-2 font-semibold">Negócios</th>
                              <th class="px-2 font-semibold">Quantidade</th>
                              <th class="px-2 font-semibold">Preço Médio</th>
                              <!-- <th class="px-2 font-semibold">Concentração</th> -->
                            </tr>
                          </thead>
                          <tbody class="text-sm" v-for="cp in dist.vendedores" :key="cp.p">
                            <tr>
                              <td class="px-2 py-1">{{ cp.p }}</td>
                              <td class="px-2 py-1">{{ cp.n }}</td>
                              <td class="px-2 py-1">{{ cp.qtt }}</td>
                              <td class="px-2 py-1">{{ cp.avg_price }}</td>
                              <!-- <td class="px-2 py-1">{{ cp.conc }}%</td> -->
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </custom-scrollbar>
    </div>
  </HxcMenu>
</template>

<script>
import HxcMenu from "@/components/Menu/Menu.vue";

import { InformationCircle } from "@/assets/icons/heroicons";
import BaseModal from "@/components/Modal/BaseModal.vue";
import { ref } from "vue";
export default {
  components: {
    HxcMenu,

    InformationCircle,
    BaseModal,
  },
  data() {
    return {
      isDropped: false,
      infoActive: false,
      data: [],
      paging: {},
      loading: true,
      connection: null,
      infoTopics: [
        {
          title: "Gráficos Disponíveis",
          description: "Nós temos 7 gráficos disponíveis para análise das mais diversas métricas, Confira abaixo.",
          subtopics: [
            {
              title: "Open Interest (OI)",
              description: "Posição em aberto total de calls e puts dos ativos.",
            },
            {
              title: "OI / Free Float",
              description: "Posição em aberto dividida pelo total de ações em Free Float do ativo.",
            },
            {
              title: "Net Total %",
              description:
                "Saldo absoluto da posição em aberto divido pelo total em aberto, % da posição em aberto direcional.",
            },
            {
              title: "Net Descoberto %",
              description: "Saldo da posição descoberta dividida pela posição em aberto total.",
            },
            {
              title: "IQ",
              description: "Índice de Qualidade (Titular / Lançador) das calls e puts.",
            },
            {
              title: "Delta Δ",
              description: "Quantidade total de Delta Δ em aberto por ativo.",
            },
            {
              title: "Gamma Γ",
              description: "Quantidade total de Gamma Γ em aberto por ativo.",
            },
          ],
        },
        {
          title: "Métricas da Tabela",
          description: "Veja o que significa cada métrica da tabela",
          subtopics: [
            {
              title: "Ativo",
              description: "Ativo referência.",
            },
            {
              title: "OI Aberto",
              description: "Quantidade total de opções em aberto.",
            },
            {
              title: "Var 1D",
              description: "Variação do OI em relação ao último pregão (%).",
            },
            {
              title: "OI / Free Float",
              description: "OI dividido pelo total de ações em circulação.",
            },
            {
              title: "Qtd. Dia / OI",
              description: "Quantidade Negociada no dia dividido pelo OI.",
            },
            {
              title: "PCR OI",
              description: "Put-Call Ratio do OI",
            },
            {
              title: "Net To",
              description: "Saldo do OI (CALL-PUT)",
            },
            {
              title: "Net To %",
              description: "Saldo do OI / Total OI (%)",
            },
            {
              title: "Net To / Float",
              description: "Saldo do OI / Free Float",
            },
            {
              title: "Net Desc %",
              description: "Saldo do OI Descoberto / Total OI (%)",
            },
            {
              title: "Net Desc / Free Float",
              description: "Saldo do OI Descoberto / Free Float",
            },
            {
              title: "pos_de_cp",
              description: "OI Descoberto de CALL / PUT (%)",
            },
            {
              title: "IQ CALL / PUT",
              description: "Índice de Qualidade de CALL / PUT",
            },
            {
              title: "Delta Tot / Média",
              description: "Total do Delta Δ do OI / Média de volume do ativo.",
            },
            {
              title: "Notional",
              description: "Notional de opções em aberto",
            },
            {
              title: "Vol Imp Call / Put",
              description: "Volatilidade Implicita das calls / put",
            },
          ],
        },
      ],
      sortColumns: [
        {
          name: "Ativo",
          value: "symbol",
        },
        {
          name: "Quantidade",
          value: "qtt",
        },
        {
          name: "Volume",
          value: "vtt",
        },
        {
          name: "Notional",
          value: "notional",
        },
        {
          name: "Negócios",
          value: "nd",
        },
        {
          name: "Data",
          value: "createdAt",
        },
      ],
      sortField: "createdAt",
      sortDir: -1,

      // distortions: [
      //   {
      //     asset: "VALE3",
      //     symbol: "VALEX420",
      //     type: "PUT",
      //     moneyness: "ITM",
      //     qty: 100000,
      //     delta: 2,
      //     vi: 23111,
      //     notional: 9431000,
      //     volume: 1000000,
      //     volH: 12.31,
      //     txLan: 1.31,
      //     protLan: 7.09,
      //     volImp: 12.31,
      //     strike: 23.31,
      //     priceAsset: 23.33,
      //     dtVen: "16/12/2022",
      //     comprador: "xp",
      //     vendedor: "btg",
      //     date: "12/05 16:31:01",
      //     neg: 7,
      //     pm: 18.21,
      //     conc: "Compra",
      //     price_d_pct: 0.21,
      //     compradores: [
      //       { p: "BTG", neg: 7, qty: 100, pm: 18.21, conc: 12.41 },
      //       { p: "BTG", neg: 7, qty: 100, pm: 18.21, conc: 12.41 },
      //       { p: "BTG", neg: 7, qty: 100, pm: 18.21, conc: 12.41 },
      //     ],
      //     vendedores: [{ p: "XP", neg: 7, qty: 100, pm: 18.21, conc: 12.41 }],
      //   },
      // ],

      distortions: [],
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
  mounted() {
    this.getDistortions();
    this.createWSClient();
  },
  methods: {
    async getDistortions() {
      this.$api.get("/realtime/distortions").then(
        ({ data }) => {
          this.distortions = data;
        },
        (error) => {}
      );
    },
    toggleInfo() {
      this.infoActive = !this.infoActive;
    },
    submitInfo() {
      this.infoActive = false;
    },
    dropIt() {
      this.isDropped = !this.isDropped;
    },
    changeSort(value) {
      console.log("changeSort", value);
      if (this.sortField == value) this.sortDir = this.sortDir * -1;
      this.sortField = value;
    },
    createWSClient() {
      return new Promise((resolve, reject) => {
        this.connection = new WebSocket(`${import.meta.env.VITE_WSSTREAM_HOST}/?token=${this.$store.state.auth.token}`);

        this.connection.onmessage = (event) => {
          const data = JSON.parse(event.data);

          if (data.type && data.type == "M") {
            if (data.data) this.distortions.unshift(data?.data);
          }
        };

        this.connection.onerror = (event) => {
          console.log("error", error);
          this.SwitchAPI();
          reject();
        };

        this.connection.onopen = (event) => {
          this.connection.send(`C=S;I=distortions;O=3212`);
          this.$notify({
            type: "success",
            title: `Conexão com o servidor realizada com sucesso`,
          });
          console.log("Successfully connected to the echo websocket server...");
          this.loading = false;
          resolve(true);
        };

        this.connection.onclose = (event) => {
          console.log("desconectou");
          this.loading = true;
          this.connection = null;
          if (event.code == 3000) {
            this.$store.dispatch("auth/refresh");
          }
        };
      });
    },
    SwitchAPI() {
      this.isLoading = true;
      this.$api
        .get(
          `/analise-tecnica/screener?filter=${this.selectedOption}&liq=${Number(this.liqMin)}&page=${
            this.page
          }&perPage=${this.pageSize}&timeframe=${this.timeframe}&sortDir=${this.sortDir}`
        )
        .then(
          (response) => {
            this.$notify({
              type: "success",
              title: `Sucesso`,
              text: response.data.message,
            });
            this.equities = response.data.items;
            if (this.isLoading) this.isLoading = false;
          },
          (error) => {
            console.log(error.response);
            console.log(error);
            this.$notify({
              type: "error",
              title: `Error`,
              text: error.response.data.message,
            });
          }
        );
    },
  },
  computed: {
    sortedDistortions() {
      return this.distortions.sort((a, b) => {
        if (a[this.sortField] < b[this.sortField]) return -1 * this.sortDir;
        if (a[this.sortField] > b[this.sortField]) return 1 * this.sortDir;
        return 0;
      });
    },
  },
};
</script>

<style lang="scss">
.list {
  position: absolute;
  width: 204px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  transform-origin: top;
  transition: transform 0.4s ease-in-out;
  overflow: hidden;
  li {
    padding: 10px;

    border-bottom: solid thin #eee;
    border-left: solid medium #cbc;
  }
}

.slide-fade-enter-active {
  transition: all 0.25s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>

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
  height: calc(100% - 50px);
  overflow: auto;
}

.scrollbar__thumb {
  background-color: #2374ff;
}
</style>
