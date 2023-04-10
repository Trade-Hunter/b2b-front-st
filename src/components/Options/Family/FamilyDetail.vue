<template>
  <HxcMenu>
    <base-modal v-if="modalActive" @close="toggleModal" :submit="SubmitFilter" scrollable title="Filtrar dados">
      <div class="grid gap-x-2 grid-cols-1 lg:grid-cols-4 w-full">
        <div>
          <hxc-label text="OI Aberto"></hxc-label>
          <hxc-range-input v-model:value="oiAberto" :min="0" :step="10" :max="500"></hxc-range-input>
        </div>
        <div>
          <hxc-label text="OI / Free Float"></hxc-label>
          <hxc-range-input v-model:value="oiFloat" :min="0" :step="10" :max="500"></hxc-range-input>
        </div>
        <div>
          <hxc-label text="OI Net"></hxc-label>
          <hxc-range-input v-model:value="oiNet" :min="0" :step="10" :max="500"></hxc-range-input>
        </div>
        <div>
          <hxc-label text="Notional"></hxc-label>
          <hxc-range-input v-model:value="oiNotional" :min="0" :step="10" :max="500"></hxc-range-input>
        </div>
      </div>

      <hr class="my-4 border-gray-200" />
      <template v-slot:footer>
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <hxc-btn @click="SubmitFilter" text="Confirmar"> </hxc-btn>
        </span>
      </template>
    </base-modal>
    <base-modal v-if="infoActive" @close="toggleInfo" :submit="submitInfo" scrollable title="Informações Úteis">
      <div v-for="topic in infoTopics" :key="topic" class="font-mono w-full">
        <div class="subheader text-blue-500 font-semibold">
          {{ topic.title }}
        </div>
        <div class="spacer"></div>
        <div class="subheader divide-y text-sm ml-1 text-black dark:text-white">
          {{ topic.description }}
        </div>
        <hr class="mt-2 mb-2 border-gray-200 dark:border-gray-400" />
        <div class="grid grid-flow-dense grid-cols-3 gap-y-1">
          <div v-for="subtopic in topic.subtopics" :key="subtopic" class="text-input rounded-l-md pl-2 mb-1">
            <div class="subheader text-blue-500 text-sm font-semibold">• {{ subtopic.title }}</div>
            <div class="spacer"></div>
            <p class="ml-4 my-auto text-xs text-black dark:text-white">
              {{ subtopic.description }}
            </p>
          </div>
        </div>
        <hr class="mt-1 mb-4" />
      </div>
    </base-modal>
    <div class="flex flex-col no-scrollbar overflow-scroll min-w-full h-full pl-2 pt-1">
      <div class="flex">
        <h2 class="mb-2 text-xl font-extrabold text-gray-900 dark:text-gray-50 font-mono">Realtime {{ id }}</h2>
        <div
          class="ml-auto mr-2 cursor-pointer"
          v-tooltip:left.tooltip="'Entenda a dinâmica dessa tela.'"
          @click="toggleInfo"
        >
          <InformationCircle class="hover:scale-125" />
        </div>
      </div>

      <hxc-table
        @update-size="getData"
        :search="true"
        :filterEnabled="true"
        :loading="loading"
        :intersected="intersected"
        :data="data"
        :paging="paging"
        :columns="columns"
        :FilerBycolumns="FilerBycolumns"
        :toggleModal="toggleModal"
        :footer="true"
      >
      </hxc-table>
    </div>
  </HxcMenu>
</template>

<script>
import HxcMenu from "@/components/Menu/Menu.vue";
import api from "@/services/api/mock";
import HxcTable from "@/components/Tables/Table.vue";
import Highcharts from "highcharts";
import HighDrillDown from "highcharts/modules/drilldown";

import Dropdown from "@/components/Dropdown/Dropdown.vue";
import DropdownItem from "@/components/Dropdown/DropdownItem.vue";
import HxcLineChart from "@/components/Chart/HxcLineChart2";
import { InformationCircle } from "@/assets/icons/heroicons";
import BaseModal from "@/components/Modal/BaseModal.vue";
import HxcRangeInput from "@/components/Inputs/RangeInput.vue";
import HxcLabel from "@/components/Labels/Label.vue";
import HxcSelect from "@/components/Selects/Select.vue";
import axios from "axios";
HighDrillDown(Highcharts);
import { ref } from "vue";
export default {
  components: {
    HxcMenu,
    HxcTable,
    Dropdown,
    DropdownItem,
    HxcLineChart,
    InformationCircle,
    BaseModal,
    HxcRangeInput,
    HxcLabel,
    HxcSelect,
  },
  setup() {},
  data() {
    return {
      modalActive: false,
      oiAberto: 0,
      oiFloat: 0,
      oiNet: 0,
      oiNotional: 0,
      infoActive: false,
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
      availableCharts: [
        {
          name: "Open Interest (OI)",
          value: "oi",
          tooltip: "Posição em Aberto",
          series: [
            {
              name: "Coberto",
              id: "john",
              data: [],
              stack: "call",
              color: "#90ed7d",
            },
            {
              name: "Descoberto",
              id: "joe",
              data: [],
              stack: "call",
              color: "#f45b5b",
            },
            {
              name: "Travada",
              id: "jane",
              data: [],
              stack: "call",
              color: "#f28f43",
            },
            {
              name: "Coberto-put",
              linkedTo: "john",
              data: [],
              stack: "put",
              color: "#31c912",
            },
            {
              name: "Descoberto-put",
              color: "#f23f3f",
              linkedTo: "joe",
              data: [],
              stack: "put",
            },
            {
              name: "Travada-put",
              linkedTo: "jane",
              data: [],
              stack: "put",
              color: "#f5822a",
            },
            {
              name: "Put Call Ratio",
              type: "spline",
              lineWidth: 2,
              color: "#2f7ed8",
              data: [],
              yAxis: 2,
              marker: {
                enabled: false,
              },
            },
          ],
          drill: [],
        },
        {
          name: "OI / Free Float",
          value: "oi_float",
          tooltip: "Posição em Aberto / Ações em circulação",
          series: [
            {
              name: "Coberto",
              id: "john",
              data: [],
              stack: "call",
              color: "#90ed7d",
            },
            {
              name: "Descoberto",
              id: "joe",
              data: [],
              stack: "call",
              color: "#f45b5b",
            },
            {
              name: "Travada",
              id: "jane",
              data: [],
              stack: "call",
              color: "#f28f43",
            },
            {
              name: "Coberto-put",
              linkedTo: "john",
              data: [],
              stack: "put",
              color: "#31c912",
            },
            {
              name: "Descoberto-put",
              color: "#f23f3f",
              linkedTo: "joe",
              data: [],
              stack: "put",
            },
            {
              name: "Travada-put",
              linkedTo: "jane",
              data: [],
              stack: "put",
              color: "#f5822a",
            },
            {
              name: "Put Call Ratio",
              type: "spline",
              lineWidth: 2,
              color: "#2f7ed8",
              data: [],
              yAxis: 2,
              marker: {
                enabled: false,
              },
            },
          ],
          drill: [],
        },
        {
          name: "Net Total %",
          value: "net_total_pct",
          tooltip: "Saldo Em Aberto / Posição em Aberto (%)",
          series: [
            {
              name: "Coberto",
              id: "john2",
              data: [],
              stack: "call",
              color: "#90ed7d",
            },
            {
              name: "Descoberto",
              id: "joe",
              data: [],
              stack: "call",
              color: "#f45b5b",
            },
            {
              name: "Travada",
              id: "jane",
              data: [],
              stack: "call",
              color: "#f28f43",
            },
            {
              name: "Put Call Ratio",
              type: "spline",
              lineWidth: 2,
              color: "#2f7ed8",
              data: [],
              yAxis: 2,
              marker: {
                enabled: false,
              },
            },
          ],
          drill: [],
        },
        {
          name: "Net Descoberto %",
          value: "net_de_pct",
          tooltip: "Saldo Descoberto / Posição em Aberto (%)",
          series: [
            {
              name: "Descoberto",
              id: "joe",
              data: [],
              stack: "call",
              color: "#f45b5b",
            },

            {
              name: "Put Call Ratio",
              type: "spline",
              lineWidth: 2,
              color: "#2f7ed8",
              data: [],
              yAxis: 2,
              marker: {
                enabled: false,
              },
            },
          ],
          drill: [],
        },
        {
          name: "IQ",
          value: "iq",
          tooltip: "Índice de Qualidade (IQ) das CALL / PUTS",
          series: [
            {
              name: "IQ",
              id: "john",
              data: [],
              stack: "call",
              color: "#f45b5b",
            },
            {
              name: "IO-put",
              linkedTo: "john",
              data: [],
              stack: "put",
              color: "#f23f3f",
            },
            {
              name: "Put Call Ratio",
              type: "spline",
              lineWidth: 2,
              color: "#2f7ed8",
              data: [],
              yAxis: 2,
              marker: {
                enabled: false,
              },
              //showInLegend: true,
            },
          ],
          drill: [],
        },
        {
          name: "Delta Δ",
          value: "delta",
          tooltip: "Total de Delta (Δ) Aberto",
          series: [
            {
              name: "Delta OI",
              id: "john",
              data: [],
              stack: "call",
              color: "#f45b5b",
            },
            {
              name: "Delta OI-put",
              linkedTo: "john",
              data: [],
              stack: "put",
              color: "#f23f3f",
            },
            {
              name: "Put Call Ratio",
              type: "spline",
              lineWidth: 2,
              color: "#2f7ed8",
              data: [],
              yAxis: 2,
              marker: {
                enabled: false,
              },
            },
          ],
          drill: [],
        },
        {
          name: "Gamma Γ",
          value: "gamma",
          tooltip: "Total de Gamma (Γ) Aberto",
          series: [
            {
              name: "Gamma OI",
              id: "john",
              data: [],
              stack: "call",
              color: "#f45b5b",
            },
            {
              name: "Gamma OI-put",
              linkedTo: "john",
              data: [],
              stack: "put",
              color: "#f23f3f",
            },
            {
              name: "Put Call Ratio",
              type: "spline",
              lineWidth: 2,
              color: "#2f7ed8",
              data: [],
              yAxis: 2,
              marker: {
                enabled: false,
              },
            },
          ],
          drill: [],
        },
      ],
      currentChart: "oi",
      FilerBycolumns: [
        { name: "Ativo", index: 2 },
        { name: "PCR", index: 2 },
        { name: "Net To", index: 2 },
      ],
      data: [],
      paging: {},
      loading: true,
      paging: { pages: 0, total: 0, page: 0, page_size: 350 },
      columns: [
        {
          name: "Ticker",
          value: "symbol",
          id: 1,
          total: { calcMode: "count", format: "none" },
          format: "none",
        },
        { name: "Strike", value: "ExrcPric", format: "float" },
        { name: "Vencimento", value: "TradgEndDt", format: "dateUS" },
        { name: "Dias", value: "ExrcDays", format: "int" },
        {
          name: "Hora",
          value: "nexxusReceivedAt",
          id: 2,

          format: "time",
        },
        {
          name: "Negócios",
          value: "neg",
          id: 2,
          total: { calcMode: "sum", format: "int" },
          format: "int",
        },
        {
          name: "Cotação",
          value: "close",
          id: 3,
          total: { calcMode: "mean", format: "float" },
          format: "float",
        },
        {
          name: "Variação",
          value: "changePerc",
          id: 4,
          total: { calcMode: "none", format: "none" },
          format: "float",
          color: true,
        },
        {
          name: "Quantidade",
          value: "qtt",
          id: 4,
          total: { calcMode: "sum", format: "int" },
          format: "int",
        },
        {
          name: "Volume",
          value: "vtt",
          id: 4,
          total: { calcMode: "sum", format: "int" },
          format: "int",
        },
        {
          name: "Notional Day",
          value: "notionalDay",
          id: 5,
          total: { calcMode: "sum", format: "int" },
          format: "int",
        },
        {
          name: "Spread",
          value: "spread",
          id: 4,
          total: { calcMode: "none", format: "none" },
          format: "float",
        },
        {
          name: "Mínima",
          value: "low",
          id: 5,
          total: { calcMode: "none", format: "none" },
          format: "float",
        },
        {
          name: "Máxima",
          value: "high",
          id: 5,
          total: { calcMode: "none", format: "none" },
          format: "float",
        },

        {
          name: "Vol. Implícita",
          value: "volImp",
          id: 5,
          total: { calcMode: "mean", format: "float" },
          format: "percent",
        },

        {
          name: "Taxa Coberta",
          value: "taxaCoberta",
          format: "percentM",
          total: { calcMode: "mean", format: "percentM" },
        },
        {
          name: "Proteção Coberta",
          value: "protecao",
          format: "percentM",
          total: { calcMode: "mean", format: "percentM" },
        },
        {
          name: "Delta",
          value: "delta",
          id: 5,
          total: { calcMode: "none", format: "none" },
          format: "float",
        },
        {
          name: "Gamma",
          value: "gamma",
          id: 5,
          total: { calcMode: "none", format: "none" },
          format: "float",
        },
        {
          name: "Vega",
          value: "vega",
          id: 5,
          total: { calcMode: "none", format: "none" },
          format: "float",
        },
        {
          name: "Theta",
          value: "theta",
          id: 5,
          total: { calcMode: "none", format: "none" },
          format: "float",
        },
        {
          name: "Rho",
          value: "rho",
          id: 5,
          total: { calcMode: "none", format: "none" },
          format: "float",
        },
        {
          name: "Tipo",
          value: "moneyness",
          id: 5,
          total: { calcMode: "none", format: "none" },
          format: "none",
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    //this.getData();
    //this.getData2();
    this.createWSClient();
  },
  methods: {
    createWSClient() {
      return new Promise((resolve, reject) => {
        this.connection = new WebSocket(
          `${import.meta.env.VITE_WSSTREAM_HOST}/options?page=${this.page}&pageSize=${this.pageSize}&token=${
            this.$store.state.auth.token
          }&liq=50000000`
        );

        this.connection.onmessage = (event) => {
          const data = JSON.parse(event.data);

          if (data.type && data.type == "M") {
            for (var obj of data?.data) {
              var index = this.data.findIndex((item) => item.symbol === obj.symbol);
              if (index !== -1) {
                this.data[index] = obj;
              } else {
                this.data.push(obj);
              }
            }
          }
        };

        this.connection.onerror = (event) => {
          this.SwitchAPI();
          reject();
        };

        this.connection.onopen = (event) => {
          const parsed = {
            symbol: this.id.includes("CALL")
              ? this.id.slice(0, -4)
              : this.id.includes("PUT")
              ? this.id.slice(0, -3)
              : this.id,
            type: this.id.includes("CALL") ? "CALL" : "PUT",
          };
          this.connection.send(
            `C=S;I=${
              !this.id.includes("CALL") && !this.id.includes("PUT")
                ? `options2_asset;Q=${parsed.symbol}`
                : `options_det;Q=${parsed.symbol};O=${parsed.type}`
            }`
          );

          this.$notify({
            type: "success",
            title: `Conexão com o servidor realizada com sucesso`,
          });
          console.log("Successfully connected to the echo websocket server...");
          this.loading = false;
          resolve(true);
        };

        this.connection.onclose = (event) => {
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
    toggleModal() {
      this.modalActive = !this.modalActive;
    },
    SubmitFilter() {
      this.modalActive = false;
    },
    toggleInfo() {
      this.infoActive = !this.infoActive;
    },
    submitInfo() {
      this.infoActive = false;
    },
    async intersected(trigger) {
      console.log("oewoweow", trigger);
      if (!this.loading && trigger) {
        console.log(this.paging.page + 1);
        this.loading = true;

        setTimeout(() => {
          const data = api.get(`open-interest/options?page=${this.paging.page + 1}&size=${this.paging.page_size}`);
          console.log("dta inserte", data);
          this.paging = data.paging;
          console.log("data data", data.data);
          this.data = [...this.data, ...data.data];
          console.log("new this data", this.data);
          this.loading = false;
        }, 1500);
      }
    },
  },
};
</script>

<style></style>
