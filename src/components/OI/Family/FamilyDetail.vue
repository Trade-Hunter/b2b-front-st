<template>
  <HxcMenu>
    <div class="flex flex-col overflow-scroll no-scrollbar min-w-full p-1 dark:bg-dark-2">
      <div class="flex flex-col relative">
        <div class="bg-white dark:bg-dark-1 text-black dark:text-white rounded-md shadow-sm drop-shadow-sm mb-2">
          <div class="flex flex-row justify-start mt-1 ml-2 mb-1">
            <h2 class="text-md w-32 text-center py-1 mr-2">OI / Histórico</h2>
            <div
              class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
              position="bottom"
              tooltip="Posição em Aberto"
            >
              <p class="m-auto">Open Interest (OI)</p>
            </div>
            <div
              class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
              position="bottom"
              tooltip="Posição em Aberto"
            >
              <p class="m-auto">Open Interest (OI)</p>
            </div>
            <div
              class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
              position="bottom"
              tooltip="Posição em Aberto"
            >
              <p class="m-auto">Open Interest (OI)</p>
            </div>
            <div class="ml-auto inline-flex">
              <div
                class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
                position="bottom"
                tooltip="Posição em Aberto"
              >
                <p class="m-auto">Selecionar Data</p>
              </div>
              <div
                class="cursor-pointer text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
                position="bottom"
                tooltip="Posição em Aberto"
              >
                <p class="m-auto">Selecionar Vencimento</p>
              </div>
            </div>
          </div>

          <HxcLineChart class="w-full rounded-sm" :options="chart1Opts"></HxcLineChart>
        </div>

        <div class="bg-white dark:bg-dark-1 text-black dark:text-white rounded-md shadow-sm drop-shadow-sm mb-2">
          <div class="flex flex-row justify-start mt-1 ml-2 mb-1">
            <h2 class="text-md w-32 text-center py-1 mr-2">OI / Strike</h2>
            <div
              class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
              position="bottom"
              tooltip="Posição em Aberto"
            >
              <p class="m-auto">Open Interest (OI)</p>
            </div>
            <div
              class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
              position="bottom"
              tooltip="Posição em Aberto"
            >
              <p class="m-auto">Open Interest (OI)</p>
            </div>
            <div
              class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
              position="bottom"
              tooltip="Posição em Aberto"
            >
              <p class="m-auto">Open Interest (OI)</p>
            </div>
            <div class="ml-auto inline-flex">
              <div
                class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
                position="bottom"
                tooltip="Posição em Aberto"
              >
                <p class="m-auto">Selecionar Data</p>
              </div>
              <div
                class="cursor-pointer text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
                position="bottom"
                tooltip="Posição em Aberto"
              >
                <p class="m-auto">Selecionar Vencimento</p>
              </div>
            </div>
          </div>
          <HxcLineChart class="w-full rounded-sm" :options="chart2Opts"></HxcLineChart>
        </div>

        <div class="bg-white dark:bg-dark-1 text-black dark:text-white rounded-md shadow-sm drop-shadow-sm mb-2">
          <div class="flex flex-row justify-start mt-1 ml-2 mb-1">
            <h2 class="text-md text-center w-32 py-1 mr-2">OI / Vencimento</h2>

            <div
              class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
              position="bottom"
              tooltip="Posição em Aberto"
            >
              <p class="m-auto">Open Interest (OI)</p>
            </div>
            <div
              class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
              position="bottom"
              tooltip="Posição em Aberto"
            >
              <p class="m-auto">Open Interest (OI)</p>
            </div>
            <div
              class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
              position="bottom"
              tooltip="Posição em Aberto"
            >
              <p class="m-auto">Open Interest (OI)</p>
            </div>
            <div class="ml-auto inline-flex">
              <div
                class="cursor-pointer rounded-sm text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
                position="bottom"
                tooltip="Posição em Aberto"
              >
                <p class="m-auto">Selecionar Data</p>
              </div>
              <div
                class="cursor-pointer text-sm py-1 mx-1 px-2 bg-blue-500 text-white"
                position="bottom"
                tooltip="Posição em Aberto"
              >
                <p class="m-auto">Selecionar Vencimento</p>
              </div>
            </div>
          </div>
          <HxcLineChart class="w-full rounded-sm" :options="chart3Opts"></HxcLineChart>
        </div>
      </div>
      <div class="h-96 flex-col relative no-scrollbar mb-2 w-full">
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
        >
        </hxc-table>
      </div>
    </div>
  </HxcMenu>
</template>

<script>
import api from "@/services/api/mock";
import HxcTable from "@/components/Tables/Table.vue";
import Highcharts from "highcharts";
import HighDrillDown from "highcharts/modules/drilldown";
import HxcMenu from "@/components/Menu/Menu.vue";
import {
  equityDetail,
  equityDetailDtVen,
  equityDetailStrikes,
  equityDetailHistIQ,
  equityDetailHistTitLan,
  equityDetailFreeFloat,
} from "./apidtDetail";
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import DropdownItem from "@/components/Dropdown/DropdownItem.vue";
HighDrillDown(Highcharts);
import HxcLineChart from "@/components/Chart/HxcLineChart";
export default {
  components: {
    HxcTable,
    HxcMenu,
    Dropdown,
    DropdownItem,
    HxcLineChart,
  },
  data() {
    return {
      data: [],
      paging: {},
      loading: true,
      paging: { pages: 0, total: 0, page: 0, page_size: 50 },
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
          name: "Aberto",
          value: "posTo",
          total: { calcMode: "sum", format: "none" },
          format: "int",
        },
        {
          name: "net_to",
          value: "net_to",
          //total: { calcMode: "sum", format: "none" },
          format: "int",
        },
        {
          name: "net_to_pct",
          value: "net_to_pct",
          //total: { calcMode: "sum", format: "none" },
          format: "percent",
        },
        {
          name: "P/C",
          value: "pc1",
          format: "float",
          custom_format: function (obj, value) {
            if (obj >= 1) return `<span class="text-red-500">${(obj || 0)?.toFixed(2)}</span>`;
            return `<span class="text-green-500">${(obj || 0)?.toFixed(2)}</span>`;
          },
        },
        {
          name: "Coberto",
          value: "poCob",
          total: { calcMode: "sum", format: "none" },
          format: "int",
        },
        {
          name: "P/C",
          value: "pc2",
          format: "float",
        },
        {
          name: "Descoberto",
          value: "posDe",
          total: { calcMode: "sum", format: "none" },
          format: "int",
        },
        {
          name: "P/C",
          value: "pc3",
          format: "float",
        },
        {
          name: "Travada",
          value: "posTr",
          total: { calcMode: "sum", format: "none" },
          format: "int",
        },
        {
          name: "P/C",
          value: "pc4",
          format: "float",
        },
        {
          name: "Lançadores",
          value: "qtdClLan",
          total: { calcMode: "sum", format: "none" },
          format: "int",
        },
        {
          name: "P/C",
          value: "pc5",
          format: "float",
        },
        {
          name: "Titulares",
          value: "qtdClTit",
          total: { calcMode: "sum", format: "none" },
          format: "int",
        },
        {
          name: "P/C",
          value: "pc6",
          format: "float",
        },
      ],
      histYAxisOpts: [
        { k: "Quantidade em Aberto", v: "posabe" },
        { k: "Índice de Qualidade (IQ)", v: "iq" },
        { k: "Titulares e Lançadores", v: "titlan" },
        { k: "OI / Free Float", v: "float" },
      ],
      dropdown_items: ["item 1", "item 2", "item 3", "item 4", "item 4"],

      chart1Opts: {
        chart: {
          type: "column",
          zoomType: "x",
          panning: true,
          panKey: "ctrl",
          width: null,
          height: 200,
          borderWidth: 0,
          plotBackgroundColor: null,
          plotShadow: false,
          animation: true,
          spacing: 5,
          plotBorderWidth: 0,
          backgroundColor: "transparent",
          events: {
            drilldown: function (e) {
              console.log("drilldown", e);
              var chart = this;
              //Show the spinner
              //console.log(e)
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
              console.log("odsds");

              console.log(`thfgfgfis is`, this);

              const chart = this,
                series = chart.series,
                min = series[series.length - 1].processedXData[0],
                max = series[series.length - 1].yData.length - 1; //total arr

              chart.xAxis[0].setExtremes(min, max);

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
          scrollablePlotArea: { scrollPositionX: 1 },
        },

        title: {
          text: null,
        },

        xAxis: {
          type: "category",
          max: 100,
          min: 0,
          crosshair: {
            snap: false,
          },
        },

        yAxis: [
          {
            //tickWidth: 1,
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            opposite: true,
            crosshair: {
              snap: false,
            },
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
          spline: {
            stickyTracking: false,
          },
        },

        series: [
          {
            name: "Coberto",
            id: "john",
            data: equityDetail.series.cob_c,
            stack: "call",
            color: "#7cb5ec",
          },
          {
            name: "Descoberto",
            id: "joe",
            color: "#f45b5b",
            data: equityDetail.series.desc_c,
            stack: "call",
          },
          {
            name: "Travada",
            id: "jane",
            data: equityDetail.series.tr_c,
            stack: "call",
            color: "#434348",
          },
          {
            name: "Put Call Ratio",
            type: "spline",
            color: "#8085e9",
            lineWidth: 2,
            data: equityDetail.series.pcr,
            yAxis: 2,
            marker: {
              enabled: false,
            },
          },
          {
            name: "Coberto-put",
            linkedTo: "john",
            data: equityDetail.series.cob_p,
            color: Highcharts.getOptions().colors[0],
            stack: "put",
          },
          {
            name: "Descoberto-put",
            color: "#f15c80",
            linkedTo: "joe",
            data: equityDetail.series.desc_p,
            stack: "put",
          },
          {
            name: "Travada-put",
            color: "#0d233a",
            linkedTo: "jane",
            data: equityDetail.series.tr_p,
            stack: "put",
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: equityDetail.drill,
        },
      },
      chart2Opts: {
        chart: {
          type: "column",
          zoomType: "x",
          panning: true,
          panKey: "ctrl",
          width: null,
          height: 200,
          borderWidth: 0,
          plotBackgroundColor: null,
          plotShadow: false,
          animation: true,
          spacing: 5,
          plotBorderWidth: 0,
          backgroundColor: "transparent",
          events: {
            drilldown: function (e) {
              console.log("drilldown", e);
              var chart = this;
              //Show the spinner
              //console.log(e)
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
                  max: 150,
                },
              });
              // this.setTitle(null, {
              //   text: "USA",
              // });
            },
            load: function () {
              console.log(`this is`, this);

              const chart = this,
                series = chart.series,
                min = series[series.length - 1].processedXData[0],
                max = chart.xAxis[0].names; //total arr
              console.log("max is", max, max.length);
              chart.xAxis[0].setExtremes(Math.ceil(max.length * 0.15), Math.ceil(max.length * 0.85));

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
          margin: 0,
          type: "category",
          //max: 75,
          min: 0,
          //tickPixelInterval: 0,
          crosshair: {
            snap: false,
          },

          // plotLines: {
          //   value: "33.94",
          // },
        },

        yAxis: [
          {
            allowDecimals: false,
            // min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            opposite: true,
            crosshair: {
              snap: false,
            },
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
          spline: {
            stickyTracking: false,
          },
        },

        series: [
          {
            name: "Coberto",
            id: "john",
            data: equityDetailStrikes.series.cob_c,
            stack: "call",
          },
          {
            name: "Descoberto",
            id: "joe",
            data: equityDetailStrikes.series.desc_c,
            stack: "call",
            color: "#f45b5b",
          },
          {
            name: "Travada",
            id: "jane",
            data: equityDetailStrikes.series.tr_c,
            stack: "call",
            color: "#434348",
          },
          {
            name: "Put Call Ratio",
            type: "spline",
            lineWidth: 2,
            data: equityDetailStrikes.series.pcr,
            yAxis: 2,
            marker: {
              enabled: false,
            },
            color: "#8085e9",
          },
          {
            name: "Coberto-put",
            color: Highcharts.getOptions().colors[0],
            linkedTo: "john",
            data: equityDetailStrikes.series.cob_p,
            stack: "put",
          },
          {
            name: "Descoberto-put",
            color: Highcharts.getOptions().colors[1],
            linkedTo: "joe",
            data: equityDetailStrikes.series.desc_p,
            stack: "put",
            color: "#f15c80",
          },
          {
            name: "Travada-put",
            color: Highcharts.getOptions().colors[2],
            linkedTo: "jane",
            data: equityDetailStrikes.series.tr_p,
            stack: "put",
            color: "#0d233a",
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: equityDetailStrikes.drill,
        },
      },
      chart3Opts: {
        chart: {
          zoomType: "x",
          panning: true,
          panKey: "ctrl",
          type: "column",
          width: null,
          width: null,
          height: 200,
          borderWidth: 0,
          plotBackgroundColor: null,
          plotShadow: false,
          animation: true,
          spacing: 5,
          plotBorderWidth: 0,
          backgroundColor: "transparent",
          events: {
            drilldown: function (e) {
              console.log("drilldown", e);
              var chart = this;
              //Show the spinner
              //console.log(e)
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
                  max: 150,
                },
              });
              // this.setTitle(null, {
              //   text: "USA",
              // });
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
          max: 22,
          min: 0,
          crosshair: {
            snap: false,
          },
        },

        yAxis: [
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            opposite: true,
            crosshair: {
              snap: false,
            },
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
          spline: {
            stickyTracking: false,
          },
        },

        series: [
          {
            name: "Coberto",
            id: "john",
            data: equityDetailDtVen.series.cob_c,
            stack: "call",
            color: "#7cb5ec",
          },
          {
            name: "Descoberto",
            id: "joe",
            data: equityDetailDtVen.series.desc_c,
            stack: "call",
            color: "#f45b5b",
          },
          {
            name: "Travada",
            id: "jane",
            data: equityDetailDtVen.series.tr_c,
            stack: "call",
            color: "#434348",
          },
          {
            name: "Put Call Ratio",
            type: "spline",
            lineWidth: 2,
            data: equityDetailDtVen.series.pcr,
            yAxis: 2,
            marker: {
              enabled: false,
            },
            color: "#8085e9",
          },
          {
            name: "Coberto-put",
            //color: Highcharts.getOptions().colors[2],
            linkedTo: "john",
            data: equityDetailDtVen.series.cob_p,
            stack: "put",
          },
          {
            name: "Descoberto-put",
            //color: Highcharts.getOptions().colors[1],
            linkedTo: "joe",
            data: equityDetailDtVen.series.desc_p,
            stack: "put",
            color: "#f15c80",
          },
          {
            name: "Travada-put",
            color: "#0d233a",
            //color: Highcharts.getOptions().colors[2],
            linkedTo: "jane",
            data: equityDetailDtVen.series.tr_p,
            stack: "put",
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: equityDetailDtVen.drill,
        },
      },
      FilerBycolumns: [
        { name: "Ativo", index: 1 },
        { name: "PCR", index: 2 },
        { name: "Net To", index: 2 },
      ],
    };
  },
  mounted() {
    console.log(this.$route);
    this.getData();
    //this.createChart4();
    //this.createChart5();
  },
  methods: {
    async getData(pgSize = 50) {
      const data = api.get(`open-interest/options?page=1&size=${pgSize}`);
      this.data = data.data;
      this.paging = data.paging;
      console.log("data is ", data);
      this.loading = false;
      //this.createChart3();
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

    c1() {
      Highcharts.chart("c1234", {
        chart: {
          type: "spline",
          zoomType: "x",
          backgroundColor: "transparent",
          height: 100,
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "Fonte: B3",
        },
        credits: {
          enabled: false,
        },
        credits: {
          enabled: true,
          text: "tradehunter.app",
        },
        xAxis: [
          {
            //type: 'datetime',
            categories: [0, 0, 0],
            crosshair: true,
          },
        ],
        plotOptions: {
          series: {
            marker: {
              enabled: false,
              //radius: 3,
            },
          },
        },
        yAxis: [
          {
            // Primary yAxis
            labels: {
              //format: '{value} R$',
              style: {
                color: "rgb(16, 185, 129)",
              },
            },
            title: {
              text: "Calls",
              style: {
                color: "rgb(16, 185, 129)",
              },
            },
            opposite: true,
          },
          {
            // Secondary yAxis
            gridLineWidth: 0,
            title: {
              text: "Puts",
              style: {
                color: "rgb(239, 68, 68)",
              },
            },
            labels: {
              style: {
                color: "rgb(239, 68, 68)",
              },
            },
          },
          {
            // Secondary yAxis
            gridLineWidth: 0,
            title: {
              text: "Fechamento",
              style: {
                color: "rgba(33, 150, 243, 1)",
              },
            },
            labels: {
              style: {
                color: "rgba(33, 150, 243, 1)",
              },
            },
          },
        ],
        tooltip: {
          shared: true,
        },
        legend: {
          //floating: true,
          backgroundColor: "transparent",
        },
        series: [
          {
            name: "Calls",
            type: "spline",
            yAxis: 1,
            data: [
              81644200, 91907800, 109195500, 116922900, 128922100, 135518000, 142625100, 143103600, 143083900,
              146529800, 153405500, 153788800, 159275000, 164087900, 168676000, 172465800, 178793100, 194326700,
              193309500, 194403800, 198695700, 198577200, 96434700, 104166700, 108150500, 114691300, 119128700,
              121416400, 122318600, 142548300, 151539400, 165590700, 166349400, 169535800, 165092000, 167436800,
              173095900, 180189700, 182767400, 187403900, 191923500, 80563700, 88879800, 95302800, 112681900, 127393600,
              128099100, 130539200, 131656500, 135227900, 139867900, 141191100, 144923900, 148809900, 151021900,
              156954700, 154920700, 156114700, 159121300, 163342400, 188434200, 83855200, 83184500, 84955200, 84013000,
              85232200, 88954900, 89239700, 93473600, 96652700, 102007600, 137550700, 150706300, 154938100, 159252200,
              166421100, 170559700, 179614100, 191207800, 193897800, 206741200, 214503100, 218243800, 215546500,
              218298600, 217649700, 86503600, 90584500, 88817600, 93761600, 97686700, 99304200, 103411000, 118799500,
              121462300, 129719700, 134157200, 134768500, 136930500, 138449300, 143072800, 146212700, 149819900,
              154122400, 158435800, 82266800, 89162100, 90670300, 98167700, 101658800, 107132900, 109679800, 118758700,
              119666700, 120626700, 123494200, 122734800, 136398600, 134212900, 262931100,
            ],
            color: "rgb(16, 185, 129)",
          },
          {
            name: "Puts",
            type: "spline",
            yAxis: 0,
            color: "rgb(239, 68, 68)",
            data: [
              0.4, 0.39, 0.37, 0.38, 0.37, 0.39, 0.4, 0.4, 0.4, 0.41, 0.39, 0.39, 0.39, 0.38, 0.38, 0.4, 0.4, 0.41,
              0.43, 0.42, 0.41, 0.44, 0.44, 0.46, 0.46, 0.47, 0.47, 0.48, 0.51, 0.5, 0.53, 0.55, 0.52, 0.53, 0.56, 0.51,
              0.48, 0.49, 0.48, 0.49, 0.49, 0.41, 0.44, 0.44, 0.44, 0.42, 0.44, 0.47, 0.48, 0.51, 0.5, 0.47, 0.48, 0.46,
              0.47, 0.49, 0.48, 0.46, 0.47, 0.46, 0.41, 0.4, 0.41, 0.41, 0.39, 0.4, 0.4, 0.42, 0.43, 0.43, 0.45, 0.43,
              0.42, 0.45, 0.41, 0.4, 0.4, 0.4, 0.41, 0.41, 0.47, 0.45, 0.43, 0.44, 0.43, 0.42, 0.38, 0.38, 0.42, 0.39,
              0.4, 0.39, 0.39, 0.35, 0.37, 0.35, 0.35, 0.36, 0.35, 0.35, 0.44, 0.45, 0.45, 0.4, 0.44, 0.41, 0.44, 0.41,
              0.41, 0.42, 0.39, 0.4, 0.4, 0.41, 0.41, 0.46, 0.48, 0.51, 0.56, 0.54,
            ],
          },
          {
            name: "Fechamentos",
            type: "spline",
            data: [
              83.64, 81.46, 76.74, 75.44, 74.4, 78.38, 80.32, 79.45, 79.1, 78.7, 78.04, 76.63, 76.08, 72.96, 72.06,
              75.06, 74.31, 74.22, 76.45, 76.12, 74.2, 76.17, 77.51, 79.1, 80.17, 80.41, 80.37, 81.77, 82.66, 82.24,
              84.17, 85.76, 84.38, 84.47, 86.44, 83.47, 80.64, 80.66, 78.11, 77.95, 77.91, 73.84, 72.02, 72.5, 71.88,
              69.25, 71.18, 74.45, 75.79, 75.16, 73.03, 71.64, 71.23, 70.88, 71.54, 73.62, 71.92, 69.47, 69.68, 69.44,
              64.82, 65.22, 65.56, 65.71, 64.28, 65.41, 66.02, 67.24, 67.12, 67.27, 67.43, 66.54, 64.94, 67.01, 64.41,
              64.04, 64.87, 65.42, 66.77, 66.82, 69.15, 69.8, 68.3, 69.95, 68.23, 67.72, 66.96, 65.98, 70.21, 67.95,
              69.27, 68.23, 66.91, 64.97, 64.5, 63.89, 62.92, 65.22, 63.67, 64.51, 69.55, 70.15, 68.25, 67, 68.35,
              68.25, 70.46, 69.45, 68.45, 70.02, 68.57, 68, 67.68, 68.34, 68.43, 72.04, 74, 75.79, 76.96, 75.23,
            ],
            yAxis: 2,
            color: "rgba(33, 150, 243, 0.2)",
            tooltip: {
              valueDecimals: 2,
              valuePrefix: "R$",
            },
            visible: false,
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  floating: false,
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                  x: 0,
                  y: 0,
                },
                yAxis: [
                  {
                    labels: {
                      align: "right",
                      x: 0,
                      y: -6,
                    },
                    showLastLabel: false,
                  },
                  {
                    labels: {
                      align: "left",
                      x: 0,
                      y: -6,
                    },
                    showLastLabel: false,
                  },
                  {
                    // visible: false,
                  },
                ],
              },
            },
          ],
        },
      });
    },
    createChart3() {
      Highcharts.chart("chart1", {
        chart: {
          type: "column",
          zoomType: "x",
          panning: true,
          panKey: "ctrl",
          width: null,
          height: 200,
          borderWidth: 0,
          plotBackgroundColor: null,
          plotShadow: false,
          animation: true,
          spacing: 5,
          plotBorderWidth: 0,
          backgroundColor: "transparent",
          events: {
            drilldown: function (e) {
              console.log("drilldown", e);
              var chart = this;
              //Show the spinner
              //console.log(e)
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
              console.log("odsds");

              console.log(`thfgfgfis is`, this);

              const chart = this,
                series = chart.series,
                min = series[series.length - 1].processedXData[0],
                max = series[series.length - 1].yData.length - 1; //total arr

              chart.xAxis[0].setExtremes(min, max);

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
          scrollablePlotArea: { scrollPositionX: 1 },
        },

        title: {
          text: null,
        },

        xAxis: {
          type: "category",
          max: 100,
          min: 0,
          crosshair: {
            snap: false,
          },
        },

        yAxis: [
          {
            //tickWidth: 1,
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            opposite: true,
            crosshair: {
              snap: false,
            },
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
          spline: {
            stickyTracking: false,
          },
        },

        series: [
          {
            name: "Coberto",
            id: "john",
            data: equityDetail.series.cob_c,
            stack: "call",
            color: "#7cb5ec",
          },
          {
            name: "Descoberto",
            id: "joe",
            color: "#f45b5b",
            data: equityDetail.series.desc_c,
            stack: "call",
          },
          {
            name: "Travada",
            id: "jane",
            data: equityDetail.series.tr_c,
            stack: "call",
            color: "#434348",
          },
          {
            name: "Put Call Ratio",
            type: "spline",
            color: "#8085e9",
            lineWidth: 2,
            data: equityDetail.series.pcr,
            yAxis: 2,
            marker: {
              enabled: false,
            },
          },
          {
            name: "Coberto-put",
            linkedTo: "john",
            data: equityDetail.series.cob_p,
            color: Highcharts.getOptions().colors[0],
            stack: "put",
          },
          {
            name: "Descoberto-put",
            color: "#f15c80",
            linkedTo: "joe",
            data: equityDetail.series.desc_p,
            stack: "put",
          },
          {
            name: "Travada-put",
            color: "#0d233a",
            linkedTo: "jane",
            data: equityDetail.series.tr_p,
            stack: "put",
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: equityDetail.drill,
        },
      });
    },
    createChartIQ() {
      Highcharts.chart("chart1", {
        chart: {
          type: "column",
          zoomType: "x",
          panning: true,
          panKey: "ctrl",
          width: null,
          height: 250,
          events: {
            drilldown: function (e) {
              console.log("drilldown", e);
              var chart = this;
              //Show the spinner
              //console.log(e)
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
              // this.setTitle(null, {
              //   text: "USA",
              // });
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
          scrollPositionX: 1,
        },

        title: {
          text: null,
        },

        xAxis: {
          type: "category",
          max: 100,
          min: 0,
          crosshair: {
            snap: false,
          },
        },

        yAxis: [
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            opposite: true,
            crosshair: {
              snap: false,
            },
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
          spline: {
            stickyTracking: false,
          },
        },

        series: [
          {
            name: "Índice de Qualidade",
            id: "john",
            data: equityDetailHistIQ.series.iq_c,
            stack: "call",
            color: Highcharts.getOptions().colors[2],
          },

          {
            name: "IQ CALL / PUT",
            type: "spline",
            color: "#8085e9",
            lineWidth: 2,
            data: equityDetailHistIQ.series.iq_cp,
            yAxis: 2,
            marker: {
              enabled: false,
            },
          },
          {
            name: "Índice de Qualidade",
            linkedTo: "john",
            data: equityDetailHistIQ.series.iq_p,
            color: Highcharts.getOptions().colors[5],
            stack: "put",
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: equityDetailHistIQ.drill,
        },
      });
    },
    createChartTitLan() {
      Highcharts.chart("chart1", {
        chart: {
          type: "column",
          zoomType: "x",
          panning: true,
          panKey: "ctrl",
          width: null,
          height: 250,
          events: {
            drilldown: function (e) {
              console.log("drilldown", e);
              var chart = this;
              //Show the spinner
              //console.log(e)
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
          scrollPositionX: 1,
        },

        title: {
          text: null,
        },

        xAxis: {
          type: "category",
          max: 100,
          min: 0,
          crosshair: {
            snap: false,
          },
        },

        yAxis: [
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            opposite: true,
            crosshair: {
              snap: false,
            },
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
          spline: {
            stickyTracking: false,
          },
        },

        series: [
          {
            name: "Titulares",
            id: "john",
            data: equityDetailHistTitLan.series.tit_c,
            stack: "call",
            color: "#7cb5ec",
          },
          {
            name: "Lançadores",
            id: "joe",
            color: "#f45b5b",
            data: equityDetailHistTitLan.series.lan_c,
            stack: "call",
          },

          {
            name: "IQ CALL / PUT",
            type: "spline",
            color: "#8085e9",
            lineWidth: 2,
            data: equityDetailHistTitLan.series.iq_cp,
            yAxis: 2,
            marker: {
              enabled: false,
            },
          },
          {
            name: "Titulares-put",
            linkedTo: "john",
            data: equityDetailHistTitLan.series.tit_p,
            color: Highcharts.getOptions().colors[0],
            stack: "put",
          },
          {
            name: "Lançadores-put",
            color: "#f15c80",
            linkedTo: "joe",
            data: equityDetailHistTitLan.series.lan_p,
            stack: "put",
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: equityDetailHistTitLan.drill,
        },
      });
    },
    createChartFloat() {
      Highcharts.chart("chart1", {
        chart: {
          type: "column",
          zoomType: "x",
          panning: true,
          panKey: "ctrl",
          width: null,
          height: 280,
          events: {
            drilldown: function (e) {
              console.log("drilldown", e);
              var chart = this;
              //Show the spinner
              //console.log(e)
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
          scrollPositionX: 1,
        },

        title: {
          text: null,
        },

        xAxis: {
          type: "category",
          max: 100,
          min: 0,
          crosshair: {
            snap: false,
          },
        },

        yAxis: [
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            opposite: true,
            crosshair: {
              snap: false,
            },
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
          spline: {
            stickyTracking: false,
          },
        },

        series: [
          {
            name: "float",
            id: "john",
            data: equityDetailFreeFloat.series.float_c,
            stack: "call",
            color: "#7cb5ec",
          },
          {
            name: "dir",
            id: "joe",
            color: "#f45b5b",
            data: equityDetailFreeFloat.series.dir_c,
            stack: "call",
          },

          {
            name: "OI / Float (CALL / PUT)",
            type: "spline",
            color: "#8085e9",
            lineWidth: 2,
            data: equityDetailFreeFloat.series.float_cp,
            yAxis: 2,
            marker: {
              enabled: false,
            },
          },
          {
            name: "OI / Float",
            type: "spline",
            color: "#8085e9",
            lineWidth: 2,
            data: equityDetailFreeFloat.series.dir_cp,
            yAxis: 2,
            marker: {
              enabled: false,
            },
          },
          {
            name: "float-put",
            linkedTo: "john",
            data: equityDetailFreeFloat.series.float_p,
            color: Highcharts.getOptions().colors[0],
            stack: "put",
          },
          {
            name: "dir-put",
            color: "#f15c80",
            linkedTo: "joe",
            data: equityDetailFreeFloat.series.dir_p,
            stack: "put",
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: equityDetailFreeFloat.drill,
        },
      });
    },

    createChart4() {
      Highcharts.chart("chart2", {
        chart: {
          type: "column",
          zoomType: "x",
          panning: true,
          panKey: "ctrl",
          width: null,
          height: 200,
          borderWidth: 0,
          plotBackgroundColor: null,
          plotShadow: false,
          animation: true,
          spacing: 5,
          plotBorderWidth: 0,
          backgroundColor: "transparent",
          events: {
            drilldown: function (e) {
              console.log("drilldown", e);
              var chart = this;
              //Show the spinner
              //console.log(e)
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
                  max: 150,
                },
              });
            },
            load: function () {
              console.log(`this is`, this);

              const chart = this,
                series = chart.series,
                min = series[series.length - 1].processedXData[0],
                max = chart.xAxis[0].names; //total arr
              console.log("max is", max, max.length);
              chart.xAxis[0].setExtremes(Math.ceil(max.length * 0.15), Math.ceil(max.length * 0.85));

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
          margin: 0,
          type: "category",
          //max: 75,
          min: 0,
          //tickPixelInterval: 0,
          crosshair: {
            snap: false,
          },

          // plotLines: {
          //   value: "33.94",
          // },
        },

        yAxis: [
          {
            allowDecimals: false,
            // min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            opposite: true,
            crosshair: {
              snap: false,
            },
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
          spline: {
            stickyTracking: false,
          },
        },

        series: [
          {
            name: "Coberto",
            id: "john",
            data: equityDetailStrikes.series.cob_c,
            stack: "call",
          },
          {
            name: "Descoberto",
            id: "joe",
            data: equityDetailStrikes.series.desc_c,
            stack: "call",
            color: "#f45b5b",
          },
          {
            name: "Travada",
            id: "jane",
            data: equityDetailStrikes.series.tr_c,
            stack: "call",
            color: "#434348",
          },
          {
            name: "Put Call Ratio",
            type: "spline",
            lineWidth: 2,
            data: equityDetailStrikes.series.pcr,
            yAxis: 2,
            marker: {
              enabled: false,
            },
            color: "#8085e9",
          },
          {
            name: "Coberto-put",
            color: Highcharts.getOptions().colors[0],
            linkedTo: "john",
            data: equityDetailStrikes.series.cob_p,
            stack: "put",
          },
          {
            name: "Descoberto-put",
            color: Highcharts.getOptions().colors[1],
            linkedTo: "joe",
            data: equityDetailStrikes.series.desc_p,
            stack: "put",
            color: "#f15c80",
          },
          {
            name: "Travada-put",
            color: Highcharts.getOptions().colors[2],
            linkedTo: "jane",
            data: equityDetailStrikes.series.tr_p,
            stack: "put",
            color: "#0d233a",
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: equityDetailStrikes.drill,
        },
      });
    },
    createChart5() {
      Highcharts.chart("chart3", {
        chart: {
          zoomType: "x",
          panning: true,
          panKey: "ctrl",
          type: "column",
          width: null,
          width: null,
          height: 200,
          borderWidth: 0,
          plotBackgroundColor: null,
          plotShadow: false,
          animation: true,
          spacing: 5,
          plotBorderWidth: 0,
          backgroundColor: "transparent",
          events: {
            drilldown: function (e) {
              console.log("drilldown", e);
              var chart = this;
              //Show the spinner
              //console.log(e)
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
                  max: 150,
                },
              });
              // this.setTitle(null, {
              //   text: "USA",
              // });
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
          max: 22,
          min: 0,
          crosshair: {
            snap: false,
          },
        },

        yAxis: [
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            crosshair: {
              snap: false,
            },
          },
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: null,
            },
            opposite: true,
            crosshair: {
              snap: false,
            },
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
          spline: {
            stickyTracking: false,
          },
        },

        series: [
          {
            name: "Coberto",
            id: "john",
            data: equityDetailDtVen.series.cob_c,
            stack: "call",
            color: "#7cb5ec",
          },
          {
            name: "Descoberto",
            id: "joe",
            data: equityDetailDtVen.series.desc_c,
            stack: "call",
            color: "#f45b5b",
          },
          {
            name: "Travada",
            id: "jane",
            data: equityDetailDtVen.series.tr_c,
            stack: "call",
            color: "#434348",
          },
          {
            name: "Put Call Ratio",
            type: "spline",
            lineWidth: 2,
            data: equityDetailDtVen.series.pcr,
            yAxis: 2,
            marker: {
              enabled: false,
            },
            color: "#8085e9",
          },
          {
            name: "Coberto-put",
            //color: Highcharts.getOptions().colors[2],
            linkedTo: "john",
            data: equityDetailDtVen.series.cob_p,
            stack: "put",
          },
          {
            name: "Descoberto-put",
            //color: Highcharts.getOptions().colors[1],
            linkedTo: "joe",
            data: equityDetailDtVen.series.desc_p,
            stack: "put",
            color: "#f15c80",
          },
          {
            name: "Travada-put",
            color: "#0d233a",
            //color: Highcharts.getOptions().colors[2],
            linkedTo: "jane",
            data: equityDetailDtVen.series.tr_p,
            stack: "put",
          },
        ],
        drilldown: {
          allowPointDrilldown: false,
          series: equityDetailDtVen.drill,
        },
      });
    },

    changeScale(chart, item, index) {
      if (chart == "historico") {
      } else if (chart == "strike") {
      } else {
      }
      console.log("change scale called", chart, item, index);
    },

    changeYAxis(chart, item, index) {
      if (chart == "historico") {
        if (item.v == "iq") {
          this.createChartIQ();
        } else if (item.v == "titlan") {
          this.createChartTitLan();
        } else if (item.v == "float") {
          this.createChartFloat();
        } else {
          this.createChart3();
        }
      } else if (chart == "strike") {
      } else {
      }
      console.log("change yAxis called", chart, item, index);
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

.container-new {
  background-color: #fff;

  z-index: 999;

  box-shadow: 0 0 1em 0 rgba(51, 51, 51, 0.25);
  border-radius: 0.5em;

  display: block;
  overflow: hidden;
  position: relative;
}

.container-new:before {
  background: #fff;

  background-size: cover;
  content: "";
  -webkit-filter: blur(10px);
  filter: blur(10px);
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100vw;
}
.container-new:after {
  background: rgba(155, 147, 147, 0.1);
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}
</style>
