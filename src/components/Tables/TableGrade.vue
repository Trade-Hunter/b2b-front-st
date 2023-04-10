<template>
  <div class="top-1/3">
    <vue-element-loading
      :active="loading"
      width="255px"
      height="255px"
      spinner="bar-fade-scale"
      color="#01C38D"
    />
  </div>
  <div
    v-if="search || filterEnabled"
    class="flex flex-row sm:flex-row center mb-2"
  >
    <div class="flex mr-2 bg-transparent" v-if="search">
      <select
        v-model="filterColumn"
        placeholder="Pesquisar"
        class="w-full px-4 py-2 text-base text-black border border-th-green transition duration-500 ease-in-out transform rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-th-green"
      >
        <option
          class="dark:bg-dark-1 bg-white rounded-md"
          v-for="column in FilerBycolumns"
          v-bind:value="column.index"
          :key="column.name"
        >
          {{ column.name }}
        </option>
        <option
          class="dark:bg-dark-1 bg-white rounded-md"
          disabled
          v-bind:value="null"
        >
          Selecionar
        </option>
      </select>
    </div>
    <div class="flex flex-grow mr-2" v-if="search">
      <input
        v-model="filter"
        placeholder="Pesquisar"
        :disabled="this.filterColumn == null"
        class="w-full px-4 py-2 text-base text-black border border-th-green transition duration-500 ease-in-out transform rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-th-green"
      />
    </div>
    <div
      class="mr-2 mt-2 mx-auto md:mt-1 lg:mt-0 py-2 text-th-green"
      v-if="filterEnabled"
      @click="toggleModal()"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="filter-list"
        class="svg-inline--fa fa-filter-list h-6 w-6"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M440 120h48c13.25 0 24-10.75 24-23.1S501.3 72 488 72h-48C426.8 72 416 82.75 416 95.1S426.8 120 440 120zM488 232h-144C330.8 232 320 242.8 320 256s10.75 24 24 24h144C501.3 280 512 269.3 512 256S501.3 232 488 232zM329.5 64H22.48c-18.9 0-29.33 21.5-17.41 35.88L112 225.8V368c0 7.828 3.812 15.17 10.25 19.66l79.1 55.98C206.5 446.6 211.3 448 215.9 448C228.3 448 240 438.2 240 423.1V225.8l106.9-125.9C358.8 85.5 348.4 64 329.5 64zM203.4 194.7L192 208.2v169.7l-32-22.39V208.2L78.34 112h195.3L203.4 194.7zM488 392h-144C330.8 392 320 402.8 320 416s10.75 24 24 24h144c13.25 0 24-10.75 24-24S501.3 392 488 392z"
        ></path>
      </svg>
    </div>
  </div>
  <slot />
  <div
    class="no-scrollbar overflow-scroll bg-white dark:bg-dark-1 relative rounded-t"
  >
    <Observer :emit="true" @intersect="chupa" />
    <custom-scrollbar
      :style="{ height: '100%' }"
      :autoExpand="false"
      class="min-w-full"
    >
      <table class="table w-full table-auto">
        <thead
          class="z-10 text-white sticky tracking-tighter text-xs table-header-group"
        >
          <tr class="bg-blue-500 w-full sticky top-0">
            <th
              v-for="(column, index) in columns"
              :key="column"
              :class="{
                sticky: index == 0,
                'left-0': index == 0,
                'bg-blue-500': index == 0,
              }"
              v-tooltip:bottom.tooltip="column.desc"
              @click="sort(index)"
              v-bind:id="'column.' + index"
              class="table-cell py-1"
            >
              <div class="flex justify-center select-none">
                {{ column.name }}
                <div
                  v-if="currentSort == column.value"
                  class="transform hover:text-white text-white hover:scale-110"
                >
                  <svg
                    v-if="currentSortDir == -1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="arrow-down-short-wide"
                    class="h-4 w-6 svg-inline--fa fa-arrow-down-short-wide"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M320 224H416c17.67 0 32-14.33 32-32s-14.33-32-32-32h-95.1c-17.67 0-32 14.33-32 32S302.3 224 320 224zM320 352H480c17.67 0 32-14.33 32-32s-14.33-32-32-32h-159.1c-17.67 0-32 14.33-32 32S302.3 352 320 352zM320 96h32c17.67 0 31.1-14.33 31.1-32s-14.33-32-31.1-32h-32c-17.67 0-32 14.33-32 32S302.3 96 320 96zM544 416h-223.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32S561.7 416 544 416zM192.4 330.7L160 366.1V64.03C160 46.33 145.7 32 128 32S96 46.33 96 64.03v302L63.6 330.7c-6.312-6.883-14.94-10.38-23.61-10.38c-7.719 0-15.47 2.781-21.61 8.414c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0l87.1-96.09c11.94-13.05 11.06-33.31-1.969-45.27C224.6 316.8 204.4 317.7 192.4 330.7z"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="arrow-up-short-wide"
                    class="h-4 w-6 svg-inline--fa fa-arrow-up-short-wide"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M544 416h-223.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32S561.7 416 544 416zM320 96h32c17.67 0 31.1-14.33 31.1-32s-14.33-32-31.1-32h-32c-17.67 0-32 14.33-32 32S302.3 96 320 96zM320 224H416c17.67 0 32-14.33 32-32s-14.33-32-32-32h-95.1c-17.67 0-32 14.33-32 32S302.3 224 320 224zM320 352H480c17.67 0 32-14.33 32-32s-14.33-32-32-32h-159.1c-17.67 0-32 14.33-32 32S302.3 352 320 352zM151.6 41.95c-12.12-13.26-35.06-13.26-47.19 0l-87.1 96.09C4.475 151.1 5.35 171.4 18.38 183.3c6.141 5.629 13.89 8.414 21.61 8.414c8.672 0 17.3-3.504 23.61-10.39L96 145.9v302C96 465.7 110.3 480 128 480s32-14.33 32-32.03V145.9L192.4 181.3C204.4 194.3 224.6 195.3 237.6 183.3c13.03-11.95 13.9-32.22 1.969-45.27L151.6 41.95z"
                    ></path>
                  </svg>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="z-0 text-xs">
          <tr
            v-for="(item, rowIndex) in sortedCats"
            :key="item"
            class="p-2 text-center text-black dark:text-white border-collapse"
            :class="{
              'bg-gray-200 dark:bg-dark-1': rowIndex % 2 == 0,
            }"
          >
            <td
              v-for="(column, colIndex) in columns"
              :key="column"
              :class="{
                'left-0': colIndex == 0,
                sticky: colIndex == 0,

                'dark:bg-dark-1': !item.color && colIndex == 0,
                'bg-orange-400': item.color,
                'bg-white': colIndex == 0,
                'bg-gray-200 dark:bg-dark-1':
                  !item.color && colIndex == 0 && rowIndex % 2 == 0,
              }"
            >
              <Progress
                class="z-0"
                v-if="column.progress"
                :select="select"
                :eq="item[column.value]"
                :pct="getPCT(colIndex, rowIndex, item[column.value])"
                :position="getPosition(colIndex, rowIndex, item[column.value])"
              ></Progress>

              <span
                class="py-1 px-2"
                v-else
                v-html="format(item[column.value], colIndex, rowIndex)"
              >
              </span>
            </td>
          </tr>
        </tbody>

        <tfoot
          v-if="paging.pages > 1"
          class="text-white tracking-tighter text-xs table-footer-group"
        >
          <tr class="text-center bg-blue-500 w-full sticky bottom-0">
            <td
              v-for="(column, index) in columns"
              :key="column.name"
              :class="{
                sticky: index == 0,
                'left-0': index == 0,
                'bg-blue-500': index == 0,
              }"
              class="py-1"
              v-html="tableTotals(index)"
            ></td>
          </tr>
        </tfoot>
        <Observer
          :emit="true"
          @intersect="intersected(paging.total > data.length)"
        />
      </table>
    </custom-scrollbar>
  </div>
  <div
    v-if="paging.pages > 1"
    class="bg-blue-500 rounded-b-lg flex flex-row xs:flex-row items-end justify-end xs:justify-between drop-shadow-xl"
  >
    <div class="inline-flex xs:mt-0 mb-0.5">
      <span class="text-xs self-end">Exibir</span>
      <select
        v-model="paging.page_size"
        @change="$emit('updateSize', paging.page_size)"
        class="bg-transparent border-none self-end text-xs"
      >
        <option class="self-end text-xs">15</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
        <option>150</option>
      </select>
    </div>
    <div class="inline-flex xs:mt-0 mb-0.5">
      <button
        class="text-xs text-white bg-transparent dark:text-white"
        @click="currentPage--"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        class="text-xs text-white bg-transparent dark:text-white px-1.5"
        @click="currentPage--"
        :class="{ 'bg-blue-700': currentPage == 1 }"
      >
        1
      </button>

      <button
        v-if="currentPage > 2"
        @click="currentPage = 1"
        class="text-xs font-semi-bold text-white bg-transparent rounded-md dark:text-white px-1.5"
        :class="{ 'bg-blue-700': currentPage - 1 == paging.pages }"
      >
        {{ currentPage - 1 }}
      </button>
      <button
        v-if="currentPage > 1"
        @click="currentPage = 1"
        class="text-xs font-semi-bold text-white bg-transparent rounded-md dark:text-white px-1.5"
        :class="{ 'bg-blue-700': 1 }"
      >
        {{ currentPage }}
      </button>
      <button
        @click="currentPage = 1"
        class="text-xs font-semi-bold text-white bg-transparent rounded-md dark:text-white px-1.5"
        :class="{ 'bg-blue-700': currentPage + page2 == currentPage }"
      >
        {{ currentPage + 1 }}
      </button>

      <button
        v-if="currentPage + 1 < paging.pages"
        class="text-xs text-white bg-transparent dark:text-white px-1.5 rounded-lg"
        @click="currentPage--"
        :class="{ 'bg-blue-700': currentPage == paging.pages }"
      >
        {{ paging.pages }}
      </button>
      <button
        v-if="currentPage < paging.pages"
        class="text-xs text-white bg-transparent dark:text-white rounded-lg mr-2"
        @click="currentPage++"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Observer from "./Observer.vue";
import VueElementLoading from "vue-element-loading";
import { getCurrentInstance, ref, reactive, toRef } from "vue";
import Progress from "../Options/Strategy/Simulator/Progress.vue";
export default {
  props: {
    search: { type: Boolean },
    data: {
      type: Array,
    },
    columns: {
      type: Array,
    },
    toggleModal: {
      type: Function,
    },
    gradeCh: {
      type: Function,
    },
    FilerBycolumns: {
      type: Array,
    },
    filterEnabled: { type: Boolean },
    defaultSort: { type: Object },
    footer: { type: Boolean },
    intersected: {
      type: Function,
    },
    paging: {
      type: Object,
    },
    loading: {
      type: Boolean,
    },
  },
  components: {
    Observer,
    VueElementLoading,
    Progress,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    theme() {
      const theme = this.$store.getters.getTheme;
      theme === "light"
        ? (document.body.style["background-color"] = "#f2f4f7 ")
        : (document.body.style["background-color"] = "#2a2e39");
      return theme;
    },
    selectedTheme() {
      return this.theme === "light" ? "white-theme" : "";
    },
    cols() {
      return this.equities.length >= 1 ? Object.keys(this.equities[0]) : [];
    },
    filteredCats() {
      return this.data.filter((c) => {
        if (this.filter == "") return true;
        return (
          c[this.columns[0].value]
            .toLowerCase()
            .indexOf(this.filter.toLowerCase()) >= 0
        );
      });
    },
    sortedCats() {
      return this.filteredCats
        .sort((a, b) => {
          if (a[this.currentSort] < b[this.currentSort])
            return -1 * this.currentSortDir;
          if (a[this.currentSort] > b[this.currentSort])
            return 1 * this.currentSortDir;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.paging.page_size;
          let end = this.currentPage * this.paging.page_size;
          if (index >= start && index <= end) return true;
        });
    },
    tableLength() {
      console.log(this.sortedCats.length);
      return this.sortedCats.length;
    },
  },

  data() {
    return {
      users: [{}],
      visualizationMobile: false,
      sort_asc: true,
      page: 1,
      isShowModal: false,
      filter: "",
      value: null,
      totalAberto: 0,
      totalAberto2: 0,
      titulares: 0,
      titulares2: 0,
      lancadores: 0,
      lancadores2: 0,
      varTotal: 0,
      varTotal2: 0,
      currentSort: null,
      currentSortDir: null,
      currentPage: 1,
      pageSize: 250,
      filterColumn: null,

      // define options
    };
  },

  created() {
    if (this.defaultSort) {
      const { col, dir } = this.defaultSort;
      this.currentSort = col;
      this.currentSortDir = dir;
    }
  },
  setup() {
    let equities = ref([]);
    //let data = ref([]);
    //let loading = ref(true);

    // api.get("/aberto/opcoes").then(
    //   (response) => {
    //     equities.value = response.data.items;
    //     data.value = response.data.items;
    //     loading.value = false;
    //   },
    //   (error) => {
    //     console.log(error.response);
    //     console.log(error);
    //     //this.$notify({
    //     //  type: 'error',
    //     //  title: `Error`,
    //     //  text: error.response.data.message,
    //     //});
    //   }
    // );

    const scroll = ref({ scrollEl: HTMLDivElement });

    const handleClickScrollToTop = () => {
      if (!scroll.value.scrollEl) return;
      scroll.value.scrollEl.scrollTo({ top: 0, behavior: "smooth" });
    };

    return { equities, scroll, handleClickScrollToTop };
  },
  mounted() {
    console.log("ths", this.data);
  },
  methods: {
    select(side, eq) {
      this.gradeCh(side, eq);
    },
    getPCT(colI, rowI, label) {
      const p = this.columns[colI].progress;
      const pct =
        25 + Math.floor(this.sortedCats[rowI][p.value]) >= 100
          ? Math.floor(this.sortedCats[rowI][p.value])
          : Math.floor(this.sortedCats[rowI][p.value]) + 25;

      return pct;
    },
    getPosition(colI, rowI, label) {
      const p = this.columns[colI].progress;
      return p.position;
    },
    createProgressBar(colI, rowI, label) {
      //console.log(`ev is`, event);
      if (!this.columns[colI].progress) return label;
      else {
        const p = this.columns[colI].progress;
        const pct =
          25 + Math.floor(this.sortedCats[rowI][p.value]) >= 100
            ? Math.floor(this.sortedCats[rowI][p.value])
            : Math.floor(this.sortedCats[rowI][p.value]) + 25;

        return `<div class="group relative flex content-center justify-center bg-gray-700 text-center" style="">
  <div class="relative px-2 ${
    p.position == "right" ? "ml-auto rounded-l-sm" : "mr-auto rounded-r-sm"
  } flex justify-center text-center" style="width: ${pct}%; background: linear-gradient(0.75turn, rgba(0, 129, 255, 1), ${pct}%, rgba(72, 154, 247,1));">
    <span class="invisible mx-auto inline-flex px-1 group-hover:visible">22</span>
  </div>
  <div class="absolute">
    <span class="z-10 inline-flex group-hover:invisible">${label}</span>
  </div>
  <div class="invisible absolute flex w-full flex-row justify-center gap-x-2 group-hover:visible">
    <div @click="(event) => warn('Form cannot be submitted yet.', event)"><button class="rounded-sm bg-green-500 px-2 text-white" >C</button></div>
    <div><button class="rounded-sm bg-red-500 px-2 text-white">V</button></div>
  </div>
</div>`;
        return `<div class='text-center content-center justify-center flex group relative' style="">
        <div class="" >
  <div class=" z-0 my-1" style="width: 80%; background: linear-gradient(0.75turn, rgba(0, 129, 255, 1), 40%, rgba(72, 154, 247,1));">
   <span class="my-1 w-full justify-center invisible ">1</span>
  </div>
  <button class="absolute z-0 my-1 w-full justify-center group-hover:invisible">PETR4124</button>
  <div class="invisible absolute z-10 flex w-full flex-row justify-center gap-x-2 group-hover:visible">
    <div><button class="my-1 bg-green-500 px-2 text-white">C</button></div>
    <div><button class="my-1 bg-red-500 px-2 text-white">V</button></div>
  </div>
</div></div>`;
        return `<div class='text-center content-center justify-center flex group relative' style="">
        <div class="relative flex  text-center justify-center  ${
          p.position == "right"
            ? "ml-auto rounded-l-sm"
            : "mr-auto rounded-r-sm"
        }" style="width: ${pct}%; background: linear-gradient(0.75turn, rgba(0, 129, 255, 1), ${pct}%, rgba(72, 154, 247,1));">
          <span class="inline-flex mx-auto px-1 invisible group-hover:visible" >${
            this.sortedCats[rowI][p.label]
          }</span>
        </div>
        <div class="absolute">
        <span class="z-10 inline-flex  group-hover:invisible">${label}</span>
        </div>

        </div>`;
      }
    },
    async chupa(e) {
      console.log("no topo");
      //if (this.currentPage > 1) this.currentPage--;
    },

    format(value, Colindex, rowIndex, inFooter = false) {
      var columnObj = this.columns[Colindex];

      if (columnObj.custom_format)
        return columnObj.custom_format(value, Colindex, rowIndex);
      switch (columnObj.format) {
        case "int": {
          if (columnObj.color) {
            var color =
              value >= 0
                ? "font-bold text-green-500"
                : "font-bold text-red-500";
            if (inFooter) color = "font-bold text-white";
            var el =
              `<span class="${color}">` +
              value?.toLocaleString("pt-BR", { maximumFractionDigits: 0 }) +
              "</span>";
            return el;
          }
          return value?.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
        }
        case "float": {
          if (columnObj.color) {
            var color =
              value >= 0
                ? "font-bold text-green-500"
                : "font-bold text-red-500";
            if (inFooter) color = "font-bold text-white";
            var el = `<span class="${color}">` + value?.toFixed(2) + "</span>";
            return el;
          }
          return Number(value)?.toFixed(2);
        }
        case "string": {
          return value;
        }
        case "percent": {
          if (columnObj.color) {
            var color =
              value >= 0
                ? "font-bold text-green-500"
                : "font-bold text-red-500";
            if (inFooter) color = "font-bold text-white";
            var el =
              `<span class="${color}">` + value?.toFixed(2) + "%" + "</span>";
            return el;
          }
          return (value * 100)?.toFixed(2) + "%";
        }
        case "hora": {
          return (
            value?.toString().slice(0, 2) + ":" + value.toString().slice(2)
          );
        }
        case "date": {
          return new Date(value)?.toLocaleString();
        }
        default: {
          return value;
        }
      }
    },
    tableTotals(columnIndex) {
      if (this.data.length > 0 && this.columns[columnIndex].total) {
        const column = this.columns[columnIndex].value;
        const { calcMode, format } = this.columns[columnIndex].total;
        switch (calcMode) {
          case "none": {
            return "";
          }
          case "count": {
            return this.data.length;
          }
          case "sum": {
            return this.format(
              this.data
                .map((item) => item[column])
                .reduce((a, b) => {
                  return a + b;
                })
                .toLocaleString("pt-BR", { maximumFractionDigits: 0 }),
              columnIndex,
              null,
              true
            );
          }
          case "mean": {
            return this.format(
              this.data
                ?.map((item) => item[column])
                ?.reduce((a, b) => {
                  return a + b;
                }) / this.sortedCats.length,
              columnIndex,
              null,
              true
            );
          }
          case "mean:locale": {
            return this.format(
              this.data
                ?.map((item) => item[column])
                ?.reduce((a, b) => {
                  return a + b;
                }) / this.sortedCats.length,
              columnIndex,
              null,
              true
            );
          }
          case "mean:percent": {
            return this.format(
              this.data
                ?.map((item) => item[column])
                ?.reduce((a, b) => {
                  return a + b;
                }) / this.sortedCats.length,
              columnIndex,
              null,
              true
            );
          }
          default: {
            console.log("not found", calcMode);
          }
        }
      }
    },
    SubmitFilter() {
      this.totalAberto2 = this.totalAberto;
      this.varTotal2 = this.varTotal;
      this.titulares2 = this.titulares;
      this.lancadores2 = this.lancadores;
      this.equities = this.data.filter(
        (item) =>
          item.total > Number(this.totalAberto) &&
          item.titular > Number(this.titulares) &&
          item.lancador > Number(this.lancadores) &&
          Math.abs(item.vartotal) >= Number(this.varTotal)
      );
      this.isShowModal = false;
    },
    sort(column_index) {
      if (this.currentSort == this.columns[column_index].value)
        this.currentSortDir = this.currentSortDir === 1 ? -1 : 1;
      this.currentSort = this.columns[column_index].value;
    },
    toggleModal() {
      this.isShowModal = !this.isShowModal;
      this.value = null;
    },
    toggleSorting(column) {
      this.sort_asc = !this.sort_asc;
      this.currentSort = column;
    },
    getUsers() {
      this.$api.get("/aberto/opcoes").then(
        (response) => {
          this.equities = response.data;
          this.data = response.data;
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
  watch: {
    "paging.page"(newv, oldv) {
      console.log("newv isd", newv);
      this.currentPage = newv;
    },
    data(nv, ov) {
      if (!ov.length) {
      }
      console.log("data grade", nv);
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
<style>
.scrollbar__wrapper {
  width: calc(100%);
  height: calc(100%);
}
</style>
