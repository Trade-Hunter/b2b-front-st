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
        <div class="grid grid-flow-dense grid-cols-1 md:grid-cols-3 gap-y-1">
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
    <div class="flex flex-col no-scrollbar overflow-visible md:overflow-scroll h-full min-w-full pl-2 pt-1">
      <div
        class="flex z-10 bg-white dark:bg-dark-1 py-1 rounded-sm drop-shadow-sm shadow-sm underline text-blue-500 justify-center flex-col md:flex-row mb-1"
      >
        <div
          v-for="(chart, index) in availableCharts"
          :key="chart.value"
          @click="changeChart(chart.value, index)"
          v-tooltip:bottom.tooltip="chart.tooltip"
          class="cursor-pointer rounded-sm drop-shadow-xl py-1 mx-1 px-2 hover:bg-gray-100/60 hover:text-blue-900 dark:hover:bg-gray-200"
          :class="currentChart == chart.value ? ' bg-blue-500 text-white' : ''"
        >
          {{ chart.name }}
        </div>
        <div
          class="text-center md:ml-auto mr-2 cursor-pointer"
          v-tooltip:left.tooltip="'Entenda a dinâmica dessa tela.'"
          @click="toggleInfo"
        >
          <InformationCircle class="hover:scale-125" />
        </div>
      </div>

      <div class="rounded-sm mb-2 shadow-sm drop-shadow-xl bg-white dark:bg-dark-1 p-1">
        <HxcLineChart id="chart1" class="w-full rounded-sm" :options="chart_opts"></HxcLineChart>
      </div>
      <div class="flex flex-col no-scrollbar overflow-visible md:overflow-scroll h-500 md:h-full min-w-full">
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
    </div>
  </HxcMenu>
</template>

<script>
import HxcMenu from "@/components/Menu/Menu.vue";
import api from "@/services/api/mock";
import HxcTable from "@/components/Tables/Table.vue";
import Highcharts from "highcharts";
import HighDrillDown from "highcharts/modules/drilldown";
import { chartIndex, opcFile, tableIndex } from "./api-index";
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import DropdownItem from "@/components/Dropdown/DropdownItem.vue";
import HxcLineChart from "@/components/Chart/HxcLineChart";
import { InformationCircle } from "@/assets/icons/heroicons";
import BaseModal from "@/components/Modal/BaseModal.vue";
import HxcRangeInput from "@/components/Inputs/RangeInput.vue";
import HxcLabel from "@/components/Labels/Label.vue";
import HxcSelect from "@/components/Selects/Select.vue";
HighDrillDown(Highcharts);

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
        },
        {
          name: "OI / Free Float",
          value: "oi_float",
          tooltip: "Posição em Aberto / Ações em circulação",
        },
        {
          name: "Net Total %",
          value: "net_total_pct",
          tooltip: "Saldo Em Aberto / Posição em Aberto (%)",
        },
        {
          name: "Net Descoberto %",
          value: "net_de_pct",
          tooltip: "Saldo Descoberto / Posição em Aberto (%)",
        },
        {
          name: "IQ",
          value: "iq",
          tooltip: "Índice de Qualidade (IQ) das CALL / PUTS",
        },
        {
          name: "Delta Δ",
          value: "delta",
          tooltip: "Total de Delta (Δ) Aberto",
        },
        {
          name: "Gamma Γ",
          value: "gamma",
          tooltip: "Total de Gamma (Γ) Aberto",
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
          name: "Ativo",
          value: "nm",
          total: { calcMode: "count", format: "none" },
          format: "none",
          custom_format: function (obj, value) {
            return `<a href="/open-interest/options/equities/${value}" class="w-full text-center text-blue-500">${value}</a>`;
          },
        },
        {
          name: "OI Aberto",
          value: "posTo",
          total: { calcMode: "sum", format: "none" },
          format: "int",
        },
        {
          name: "Var. 1D",
          value: "oi_chg",
          //total: { calcMode: "sum", format: "none" },
          format: "percentM",
          desc: "Variacao 1D",
        },
        {
          name: "OI / Float",
          value: "oi_float",
          //total: { calcMode: "sum", format: "none" },
          format: "percentM",
          desc: "OI / Free Float",
        },
        {
          name: "Qtd. Dia / OI",
          value: "oi_qtt",
          total: { calcMode: "sum", format: "none" },
          format: "percentM",
        },

        {
          name: "OI Desc. %",
          value: "net_de",
          format: "float",
        },
        {
          name: "OI Desc. / Float %",
          value: "net_de_float",
          format: "float",
        },
        {
          name: "Titulares",
          value: "net_de",
          format: "float",
        },
        {
          name: "Var. %",
          value: "net_de",
          format: "float",
        },
        {
          name: "Lancadores",
          value: "net_de",
          format: "float",
        },
        {
          name: "Var. %",
          value: "net_de",
          format: "float",
        },
        {
          name: "IQ",
          value: "iq_cp",
          format: "float",
        },
        {
          name: "Δ Tot / Média",
          value: "delta_avg",
          total: { calcMode: "sum", format: "none" },
          format: "int",
        },
        {
          name: "Notional",
          value: "notional",
          format: "float",
        },
        {
          name: "Vol Imp",
          value: "vol_cp",
          format: "float",
        },
      ],
      chart_opts: {
        chart: {
          type: "column",
          panning: true,
          zoomType: "x",
          panKey: "ctrl",
          events: {
            drilldown: function (e) {
              console.log("drilldown", e);
              var chart = this;

              chart.update({
                plotOptions: {
                  column: {
                    stacking: undefined,
                  },
                },
                xAxis: {
                  max: 3,
                },
              });
            },
            drillup: function () {
              this.update({
                plotOptions: {
                  column: {
                    stacking: "normal",
                  },
                },
                xAxis: {
                  max: 50,
                },
              });
            },
            load: function () {
              console.log(`this is`, this);
              const chart = this;
              const moveLeft = () => {
                let { min, max, dataMin } = chart.xAxis[0].getExtremes();
                if (min - 3 >= dataMin) {
                  min -= 3;
                  max -= 3;
                }
                chart.xAxis[0].setExtremes(min, max);
              };
              const moveRight = () => {
                let { min, max, dataMax } = chart.xAxis[0].getExtremes();
                if (max + 3 <= dataMax) {
                  min += 3;
                  max += 3;
                }
                chart.xAxis[0].setExtremes(min, max);
              };
              const leftArrowUrl = "https://cdn-icons-png.flaticon.com/512/271/271220.png";
              const rightArrowUrl = "https://cdn-icons-png.flaticon.com/512/271/271228.png";
              const leftArrow = chart.renderer.image(leftArrowUrl, 0, 150, 30, 30).attr({ zIndex: 10 });
              const rightArrow = chart.renderer
                .image(rightArrowUrl, this.chartWidth - 30, 150, 30, 30)
                .attr({ zIndex: 10 });
              leftArrow.on("click", moveLeft).add();
              rightArrow.on("click", moveRight).add();
            },
          },
        },

        title: {
          text: null,
        },

        xAxis: {
          type: "category",
          max: 50,
          min: 0,
        },

        yAxis: [
          {
            title: {
              text: null,
            },
            allowDecimals: false,
            min: 0,
          },
          {
            title: {
              text: null,
            },
            allowDecimals: false,
            min: 0,
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: "sdsdsdsd",
            },
            opposite: true,
          },
        ],

        tooltip: {
          formatter: function () {
            return (
              "<b>" +
              this.x +
              "</b><br/>" +
              this.series.name +
              ": " +
              this.y +
              "<br/>" +
              "Total: " +
              this.point.stackTotal
            );
          },
        },

        legend: {
          labelFormatter: function () {
            return this.name.split("-")[0];
          },
        },

        plotOptions: {
          column: {
            stacking: "normal",
          },
        },

        series: [
          {
            name: "Coberto",
            id: "john",
            data: chartIndex.series.cob_c,
            stack: "call",
            color: "#90ed7d",
          },
          {
            name: "Descoberto",
            id: "joe",
            data: chartIndex.series.desc_c,
            stack: "call",
            color: "#f45b5b",
          },
          {
            name: "Travada",
            id: "jane",
            data: chartIndex.series.tr_c,
            stack: "call",
            color: "#f28f43",
          },
          {
            name: "Put Call Ratio",
            type: "spline",
            lineWidth: 2,
            color: "#2f7ed8",
            data: chartIndex.series.pcr,
            yAxis: 2,
            marker: {
              enabled: false,
            },
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: chartIndex.drill,
        },
      },
    };
  },
  mounted() {
    this.getData();
    this.loadChart(this.currentChart);
  },
  methods: {
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

    async getData(pgSize = 350) {
      const data = api.get(`open-interest/options?page=1&size=${pgSize}`);
      this.data = data.data;
      this.paging = data.paging;
      console.log("data is ", data);
      this.loading = false;
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

    createChart() {
      Highcharts.chart("chart1", {
        chart: {
          type: "column",

          events: {
            drilldown: function (e) {
              console.log("drilldown", e);
              var chart = this;
              console.log(`to no drill`, chart);
            },
            drillup: function () {
              this.setTitle(null, {
                text: "USA",
              });
            },
          },
        },

        title: {
          text: "UEFA CL top scorers by season",
        },

        yAxis: {
          min: 0,
          title: {
            text: "Goals",
          },
        },
        xAxis: {
          type: "category",
          max: 30,
        },
        legend: { enabled: true },

        plotOptions: {
          series: {
            stacking: "normal",
          },
          column: {
            tooltip: {
              pointFormatter: function () {
                console.log("thius", this);
                return this.series.name + ": " + this.y + "<br/>" + "Total: " + this.stackTotal;
              },
            },
          },
          pie: {
            allowPointSelect: true,
            cursor: "pointer",

            tooltip: {
              pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
            },
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
              distance: -50,
              filter: {
                property: "percentage",
                operator: ">",
                value: 4,
              },
            },
          },
        },
        series: [
          {
            name: "Coberto",
            data: [
              {
                x: "PETR4",
                y: 62.74,
                drilldown: "PETR4",
              },
              {
                name: "test2",
                y: 10.57,
                drilldown: "test2",
              },
            ],
          },
          {
            name: "Coberto",
            data: [
              {
                x: "PETR4",
                y: 62.74,
                drilldown: "PETR4",
              },
              {
                name: "test2",
                y: 10.57,
                drilldown: "test2",
              },
            ],
          },
          {
            name: "Descoberto",
            data: [
              {
                name: "PETR4",
                y: 12.74,
                drilldown: "PETR4",
              },
              {
                name: "test2",
                y: 10.57,
                drilldown: "test2",
              },
            ],
          },
          {
            name: "Travada",
            data: [
              {
                name: "PETR4",
                y: 22.94,
                drilldown: "PETR4",
              },
              {
                name: "test4",
                y: 23,
                drilldown: "test4",
              },
            ],
          },
          {
            name: "Put Call Ratio",
            type: "line",
            data: [
              {
                name: "test3",
                y: 15,
                drilldown: "test3",
              },
              {
                name: "test4",
                y: 23,
                drilldown: "test4",
              },
            ],
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: [
            {
              id: "PETR4",
              name: "PETR4",

              data: [
                [
                  { name: "CALL", y: 0.1 },
                  { name: "PUT", y: 0.1 },
                ],
              ],
            },
            {
              id: "test3",
              data: [
                ["bbb", 23],
                ["bbs", 12],
                ["bbbb", 5],
              ],
            },
          ],
        },
      });
    },

    createChart2() {
      this.chart_opts = {
        chart: {
          type: "column",
        },
        title: {
          text: "Highcharts multi-series drilldown",
        },
        subtitle: {
          text: "The <em>allowPointDrilldown</em> option makes point clicks drill to the whole category",
        },
        xAxis: {
          type: "category",
        },

        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
            },
            stacking: "normal",
          },
        },

        series: [
          {
            name: "CALL",
            data: [
              {
                name: "VALE3",
                y: 5,
                drilldown: "republican-2010",
              },
              {
                name: "PETR4",
                y: 2,
                drilldown: "democrats-2010",
              },
              {
                name: "TASA4",
                y: 4,
                drilldown: "other-2010",
              },
            ],
          },
          {
            name: "PUT",
            data: [
              {
                name: "VALE3",
                y: 4,
                drilldown: "republican-2014",
              },
              {
                name: "PETR4",
                y: 4,
                drilldown: "democrats-2014",
              },
              {
                name: "TASA4",
                y: 4,
                drilldown: "other-2014",
              },
            ],
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: [
            {
              id: "republican-2010",
              name: "Republican 2010",
              data: [
                ["East", 4],
                ["West", 2],
                ["North", 1],
                ["South", 4],
              ],
            },
            {
              id: "democrats-2010",
              name: "Republican 2010",
              data: [
                ["East", 6],
                ["West", 2],
                ["North", 2],
                ["South", 4],
              ],
            },
            {
              id: "other-2010",
              name: "Other 2010",
              data: [
                ["East", 2],
                ["West", 7],
                ["North", 3],
                ["South", 2],
              ],
            },
            {
              id: "republican-2014",
              name: "Republican 2014",
              data: [
                ["East", 2],
                ["West", 4],
                ["North", 1],
                ["South", 7],
              ],
            },
            {
              id: "democrats-2014",
              name: "Democrats 2014",
              data: [
                ["East", 4],
                ["West", 2],
                ["North", 5],
                ["South", 3],
              ],
            },
            {
              id: "other-2014",
              name: "Other 2014",
              data: [
                ["East", 7],
                ["West", 8],
                ["North", 2],
                ["South", 2],
              ],
            },
          ],
        },
      };
    },

    createChart3() {
      //this.chart_opts =
    },

    loadChart(nv) {},
  },
  watch: {
    currentChart(nv, ov) {
      this.loadChart(nv);
    },
  },
};
</script>

<style></style>
