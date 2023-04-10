<template>
  <div
    v-if="search || filterEnabled"
    class="flex flex-row sm:flex-row center mb-2"
  >
    <div class="flex mr-2 bg-transparent" v-if="search">
      <select
        v-model="filterColumn"
        placeholder="Pesquisar"
        class="w-full px-4 py-2 text-base text-black border border-blue-500 transition duration-500 ease-in-out transform rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-th-green"
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
        class="w-full px-4 py-2 text-base text-black border border-blue-500 transition duration-500 ease-in-out transform rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-th-green"
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
    class="h-full overflow-auto bg-white dark:bg-dark-1 relative rounded drop-shadow-xl"
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
            class="table-cell px-1 py-1"
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
          v-for="(item, rowIndex) in sortedData"
          @change="$emit('update:sortedData', $event.target.sortedData)"
          :key="rowIndex"
          class="font-semibold text-center text-black dark:text-white border-t border-green-400 dark:border-blue-700"
          :class="{
            'bg-gray-200 dark:bg-dark-2': rowIndex % 2 == 0,
          }"
        >
          <td
            v-for="(column, colIndex) in columns"
            :key="column"
            :class="{
              'left-0': colIndex == 0,
              sticky: colIndex == 0,
              'bg-white': colIndex == 0,
              'bg-gray-200 dark:bg-dark-2': colIndex == 0 && rowIndex % 2 == 0,
              'dark:bg-dark-1': colIndex == 0,
            }"
            class="py-1 px-2"
          >
            <select
              v-model="item[column.value]"
              @change="changeField(item[column.value], colIndex, rowIndex)"
              v-if="column.mutable && column.mutable.type == 'select'"
              class="bg-transparent w-full text-center"
            >
              <option
                v-for="item in column.mutable.options"
                :value="item"
                :key="item.id"
                class="bg-transparent dark:bg-dark-1"
              >
                {{ item }}
              </option>
            </select>

            <div
              class="w-full"
              v-if="!column.mutable"
              v-html="format(item[column.value], colIndex, rowIndex)"
            ></div>

            <input
              v-model="item[column.value]"
              @keyup.delete="colIndex == 0 ? (item[column.value] = null) : 0"
              @change="handleChange(item[column.value], colIndex, rowIndex)"
              v-if="column.mutable && column.mutable.type == 'input'"
              class="bg-transparent text-center w-full"
            />
          </td>
        </tr>
        <tr
          @change="$emit('update:sortedData', 1)"
          class="font-semibold text-center text-black dark:text-white border-t border-green-400 dark:border-blue-700"
          :class="{
            'bg-gray-200 dark:bg-dark-1': 1,
          }"
        >
          <td
            v-for="(column, colIndex) in defaultList"
            :key="column"
            :class="{
              'left-0': colIndex == 0,
              sticky: colIndex == 0,
              'bg-white': colIndex == 0,
              'bg-gray-200 dark:bg-dark-2': colIndex == 0 && rowIndex % 2 == 0,
              'dark:bg-dark-1': colIndex == 0,
            }"
            class="py-1 px-2"
          >
            <select
              v-model="selectedIOptions[column.value]"
              v-if="column.mutable && column.mutable.type == 'select'"
              @keyup.delete="selectedIOptions[column.value] = null"
              @keyup.enter="tableFinish()"
              @change="tableFinish()"
              class="bg-transparent w-min text-center"
            >
              <option
                v-for="item in formatFilter(
                  filterOpts(
                    column.value,
                    column.mutable.exclude,
                    column.mutable.ignore
                  ),
                  column.value,
                  column.mutable
                )"
                :value="item"
                :key="item.id"
                v-html="format2(item, colIndex)"
                class="bg-transparent w-full dark:bg-dark-1 text-black dark:text-white"
              ></option>
            </select>

            <div
              class="w-8 text-center justify-center"
              v-if="!column.mutable"
              v-html="
                format(selectedIOptions[column.value], colIndex, rowIndex)
              "
            ></div>

            <input
              v-model="selectedIOptions[column.value]"
              @change="tableFinish()"
              v-if="column.mutable && column.mutable.type == 'input'"
              class="bg-transparent text-center w-16"
            />
          </td>
        </tr>
      </tbody>

      <tfoot
        v-if="footer && data.length"
        class="text-white font-semibold tracking-tighter text-xs table-footer-group"
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
            class="py-1 px-2"
            v-html="tableTotals(index)"
          ></td>
        </tr>
      </tfoot>
    </table>
  </div>
  <div
    v-if="totalPages > 1"
    class="px-1 pt-2 rounded-b-lg border-t flex flex-col xs:flex-row items-center xs:justify-between"
  >
    <div class="inline-flex xs:mt-0">
      <button
        v-if="currentPage > 1"
        class="text-xs text-gray-900 dark:text-white font-semibold px-3 rounded-lg"
        @click="currentPage--"
      >
        Anterior
      </button>
      <button
        @click="currentPage = page2"
        v-for="page2 in totalPages"
        :key="page2"
        class="text-xs font-semi-bold text-white bg-blue-500 rounded-md dark:text-white py-2 px-2 mr-2"
        :class="{ 'bg-blue-600': page2 == currentPage }"
      >
        {{ page2 }}
      </button>
      <button
        v-if="currentPage < totalPages"
        class="text-xs text-gray-900 dark:text-white font-semibold py-1 px-3 rounded-lg mr-2"
        @click="currentPage++"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar.vue";
import { toRefs, computed } from "vue";
export default {
  components: {
    Navbar,
  },
  computed: {
    totalPages() {
      return Math.round(this.filteredCats?.length / this.pageSize);
    },
    cols() {
      return this.data && this.data.length >= 1
        ? Object.keys(this.data[0])
        : [];
    },
    filteredCats() {
      if (this.filter.length < 3) return this.data;
      else if (this.currentSort)
        return this.data?.filter((c) => {
          if (this.filter == "") return true;
          return (
            c[this.columns[this.filterColumn]?.value]
              ?.toLowerCase()
              .indexOf(this.filter.toLowerCase()) >= 0
          );
        });
    },
    sortedData() {
      return this.filteredCats
        ?.sort((a, b) => {
          if (a[this.currentSort] < b[this.currentSort])
            return -1 * this.currentSortDir;
          if (a[this.currentSort] > b[this.currentSort])
            return 1 * this.currentSortDir;
          return 0;
        })
        ?.filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    },
    avOpts() {
      return this.availableOpts;
    },
  },
  setup(props) {
    const {
      FilerBycolumns,
      changeField,
      columns,
      data,
      defaultSort,
      filterEnabled,
      footer,
      search,
      getResults,
      toggleModal,
      equity,
      availableOpts: avOpts,
    } = toRefs(props);
    //console.log(availableOpts);
    // const FilerBycolumns = computed(() => props.FilerBycolumns);
    // const changeField = computed(() => props.changeField);
    // const columns = computed(() => props.columns);
    // const data = computed(() => props.data);
    // const defaultSort = computed(() => props.defaultSort);
    // const filterEnabled = computed(() => props.filterEnabled);
    // const footer = computed(() => props.footer);
    // const getResults = computed(() => props.getResults);
    // const search = computed(() => props.search);
    // const toggleModal = computed(() => props.toggleModal);
    const availableOpts = computed(() => props.availableOpts);

    return {
      FilerBycolumns,
      changeField,
      columns,
      data,
      defaultSort,
      filterEnabled,
      footer,
      getResults,
      search,
      toggleModal,
      equity,
      avOpts,
      availableOpts,
      availableOpts: avOpts,
    };
  },

  data() {
    return {
      filter: "",
      currentSort: null,
      currentSortDir: null,
      currentPage: 1,
      pageSize: 500,
      filterColumn: null,
      defaultList: [
        {
          name: "symbol",
          value: "symbol",
          mutable: { type: "select" },
        },
        {
          name: "type",
          value: "type",
          mutable: { type: "select", exclude: true },
        },
        {
          name: "TradgEndDt",
          value: "TradgEndDt",
          mutable: { type: "select", exclude: true },
        },
        {
          name: "oper",
          value: "oper",
          mutable: {
            type: "select",
            ignore: true,
            options: ["COMPRA", "VENDA"],
          },
        },
        {
          name: "qty",
          value: "qty",
          mutable: { type: "input" },
        },
        {
          name: "ExrcPric",
          value: "ExrcPric",
          mutable: { type: "select", exclude: true },
        },
        {
          name: "close",
          value: "close",
          mutable: { type: "input" },
        },
        {
          name: "total",
          value: "total",
          //mutable: { type: "select", options: ["COMPRA", "VENDA"] },
        },
        {
          name: "volImp",
          value: "volImp",
          //mutable: { type: "select", options: ["COMPRA", "VENDA"] },
        },
        {
          name: "delta",
          value: "delta",
          //mutable: { type: "select", options: ["COMPRA", "VENDA"] },
        },
        {
          name: "gamma",
          value: "gamma",
          //mutable: { type: "select", options: ["COMPRA", "VENDA"] },
        },
        {
          name: "theta",
          value: "theta",
          //mutable: { type: "select", options: ["COMPRA", "VENDA"] },
        },
        {
          name: "vega",
          value: "vega",
          //mutable: { type: "select", options: ["COMPRA", "VENDA"] },
        },
      ],
      selectedIOptions: {
        _id: "",
        symbol: "",
        type: "",
        TradgEndDt: "",
        oper: "",
        qty: null,
        ExrcPric: 0,
        close: 0,
        total: 0,
        volImp: 0,
        delta: 0,
        gamma: 0,
        theta: 0,
        theta_perc: 0,
        vega: 0,
      },

      // availableOpts: [
      //   {
      //     symbol: "ATIVO",
      //     type: "-",
      //     TradgEndDt: "",

      //     ExrcPric: "",
      //     close: 0.09,
      //     total: 0,
      //     volImp: 0,
      //     delta: 0,
      //     gamma: 0,
      //     theta: 0,
      //     theta_perc: 0,
      //     vega: 0,
      //   },
      //   {
      //     symbol: "PETRG309",
      //     type: "PUT",
      //     TradgEndDt: "17/06/2022",

      //     ExrcPric: 35.59,
      //     close: 0.09,
      //     total: 920,
      //     volImp: 32.45,
      //     delta: 150,
      //     gamma: 0.12,
      //     theta: 0.31,
      //     theta_perc: 31.12,
      //     vega: 0.23,
      //   },
      //   {
      //     symbol: "PETRG531",
      //     type: "CALL",
      //     TradgEndDt: "17/06/2022",

      //     ExrcPric: 53.31,
      //     close: 0.09,
      //     total: 920,
      //     volImp: 32.45,
      //     delta: 150,
      //     gamma: 0.12,
      //     theta: 0.31,
      //     theta_perc: 31.12,
      //     vega: 0.23,
      //   },
      //   {
      //     symbol: "PETRG409",
      //     type: "CALL",
      //     TradgEndDt: "17/07/2022",

      //     ExrcPric: 40.59,
      //     close: 0.09,
      //     total: 920,
      //     volImp: 32.45,
      //     delta: 150,
      //     gamma: 0.12,
      //     theta: 0.31,
      //     theta_perc: 31.12,
      //     vega: 0.23,
      //   },
      //   {
      //     symbol: "PETRJ190",
      //     type: "CALL",
      //     TradgEndDt: "17/09/2022",
      //     ExrcPric: 19.9,
      //     close: 0.09,
      //     total: 920,
      //     volImp: 32.45,
      //     delta: 150,
      //     gamma: 0.12,
      //     theta: 0.31,
      //     theta_perc: 31.12,
      //     vega: 0.23,
      //   },
      // ],
      filteredOpts: [],
    };
  },
  created() {
    if (this.defaultSort) {
      const { col, dir } = this.defaultSort;
      this.currentSort = col;
      this.currentSortDir = dir;
    }
    console.log("this available opts", this.availableOpts);
  },
  props: {
    search: { type: Boolean },
    data: {
      type: Array,
    },
    availableOpts: {
      type: Array,
    },
    columns: {
      type: Array,
    },
    toggleModal: {
      type: Function,
    },
    changeField: {
      type: Function,
    },
    getResults: {
      type: Function,
    },
    FilerBycolumns: {
      type: Array,
    },
    filterEnabled: { type: Boolean },
    defaultSort: { type: Object },
    footer: { type: Boolean },
  },
  methods: {
    gradeCh(side, symbol) {
      console.log("chamando grade Ch la", symbol);

      const findSer = this.filteredOpts.findIndex(
        (item) => item.symbol == symbol
      );

      console.log(findSer);
      if (findSer !== -1) {
        for (const x of Object.keys(this.selectedIOptions)) {
          if (this.filteredOpts[findSer][x])
            this.selectedIOptions[x] = this.filteredOpts[findSer][x];
        }
      }
      this.selectedIOptions.oper = side;
    },
    handleChange(i, c, r) {
      this.changeField(i, c, r);
    },
    tableFinish() {
      console.log("chamou no table finish", this.selectedIOptions);
      if (
        this.selectedIOptions["symbol"] &&
        this.selectedIOptions["qty"] &&
        this.selectedIOptions["close"] &&
        this.selectedIOptions["oper"]
      ) {
        console.log(this.selectedIOptions);
        console.log("adicionando no data");
        this.data.push({
          symbol: this.selectedIOptions.symbol,
          type: this.selectedIOptions.type,
          TradgEndDt: this.selectedIOptions.TradgEndDt,
          side: this.selectedIOptions.oper,
          qty: Number(this.selectedIOptions.qty),
          ExrcPric: this.selectedIOptions.ExrcPric,
          close: this.selectedIOptions.close,
          total: this.selectedIOptions.total,
          volImp: this.selectedIOptions.volImp,
          delta: this.selectedIOptions.delta,
          gamma: this.selectedIOptions.gamma,
          theta: this.selectedIOptions.theta,
          vega: this.selectedIOptions.vega,
          _id: this.selectedIOptions._id,
        });

        this.selectedIOptions = {
          _id: "",
          symbol: "",
          type: "",
          TradgEndDt: "",
          oper: "",
          qty: 0,
          ExrcPric: 0,
          close: 0,
          total: 0,
          volImp: 0,
          delta: 0,
          gamma: 0,
          theta: 0,
          theta_perc: 0,
          vega: 0,
        };
        this.filteredOpts = [];

        this.getResults();
      }
    },
    formatFilter(f, v, m) {
      const keys = {};
      if (m && m.ignore) {
        f = m.options.map((item) => (keys[item] = 1));
      } else {
        f.map((item) => (keys[item[v]] = 1));
      }

      return Object.keys(keys);
    },
    totSelected() {
      var selected = 0;
      var obj = {};
      for (const key of Object.keys(this.selectedIOptions))
        if (this.selectedIOptions[key]) {
          selected += 1;
          obj[key] = 1;
        }
      return { selected, obj };
    },
    filterOpts(field, exclude, ignore) {
      const totalS = this.totSelected();
      let items = this.filteredOpts
        ? this.filteredOpts && totalS.selected > 1
          ? this.filteredOpts
          : this.availableOpts
        : this.availableOpts;

      const filtered = items.filter((item) =>
        this.selectedIOptions.symbol
          ? item.symbol == this.selectedIOptions.symbol
          : 1 ||
            ignore ||
            totalS.selected < 1 ||
            (totalS.selected == 1 && totalS.obj[field] && exclude) ||
            (this.selectedIOptions.type
              ? item.type == this.selectedIOptions.type
              : 1 && Number(this.selectedIOptions.ExrcPric)
              ? item.ExrcPric == Number(this.selectedIOptions.ExrcPric)
              : 1 && this.selectedIOptions.TradgEndDt
              ? item.TradgEndDt == this.selectedIOptions.TradgEndDt
              : 1)
      );
      this.filteredOpts = filtered;

      return filtered;
    },

    format2(value, colIndex) {
      var columnObj = this.columns[colIndex];
      switch (columnObj.format) {
        case "date": {
          console.log("date is", value);
          if (!value) return "-";
          return new Date(value)?.toLocaleDateString("pt-BR") || "-";
        }
        default: {
          return value;
        }
      }
    },
    format(value, Colindex, rowIndex, inFooter = false) {
      var columnObj = this.columns[Colindex];

      const mutable = columnObj.mutable;
      if (mutable && !inFooter) {
        if (mutable.type == "input")
          return `<input value="${value}" type="text" class="w-full text-center bg-transparent"></input>`;
        else if (mutable.type == "select")
          return `{{{column}}}<select v-model="data[${rowIndex}].${columnObj.value}">
    <option v-for="item in ${mutable.options}" :value="item" :key="item.id">
      {{ item.name }}
    </option>
  </select>`;
      }

      if (columnObj.custom_format)
        return columnObj.custom_format(
          this.sortedData[rowIndex],
          value,
          Colindex,
          rowIndex
        );
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
            var el =
              `<span class="${color}">` +
              Number(value?.toFixed(2) || 0)?.toLocaleString("en-US") +
              "</span>";
            return el;
          }
          return Number(value?.toFixed(2) || 0)?.toLocaleString("en-US");
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
              `<span class="${color}">` +
              (value * 100 || 0)?.toFixed(2) +
              "%" +
              "</span>";
            return el;
          }
          return (value * 100 || 0)?.toFixed(2) + "%";
        }
        case "percentM": {
          if (columnObj.color) {
            var color =
              value >= 0
                ? "font-bold text-green-500"
                : "font-bold text-red-500";
            if (inFooter) color = "font-bold text-white";
            var el =
              `<span class="${color}">` + value.toFixed(2) + "%" + "</span>";
            return el;
          }
          return value?.toFixed(2) + "%";
        }
        case "hora": {
          return (
            value?.toString()?.slice(0, 2) + ":" + value?.toString()?.slice(2)
          );
        }
        case "time": {
          const options = {
            timeZone: "America/Scoresbysund",
          };
          return new Date(value)?.toLocaleTimeString("pt-BR").slice(0, 5);
        }
        case "time2": {
          const options = {
            timeZone: "America/Scoresbysund",
          };
          return new Date(value)
            ?.toLocaleTimeString("pt-BR", options)
            .slice(0, 5);
        }
        case "date": {
          //console.log("formatr eh");
          if (!value) return "";
          return new Date(value)?.toLocaleDateString("pt-BR");
        }
        case "datetime": {
          if (!value) return "-";
          return new Date(value)?.toLocaleString("pt-BR")?.slice(0, -3);
        }
        case "dateUS": {
          const locale = "en-US";
          const options = {
            timeZone: "Europe/London",
          };

          return new Date(value)?.toLocaleDateString("pt-BR", options);
        }

        default: {
          return value;
        }
      }
    },
    tableTotals(columnIndex) {
      if (
        this.data &&
        this.data.length > 0 &&
        this.columns[columnIndex].total
      ) {
        const column = this.columns[columnIndex].value;
        const { calcMode, format, calcModeOpts } =
          this.columns[columnIndex].total;
        switch (calcMode) {
          case "none": {
            return "";
          }
          case "count": {
            return this.data.length;
          }
          case "sum": {
            return this.format(
              this.sortedData
                ?.map((item) => Number(item[column]))
                ?.reduce((x, y) => x + y, 0),
              columnIndex,
              null,
              true
            );
          }

          case "WeightedMean": {
            return this.format(
              this.sortedData
                ?.map((item) => item[column] * item[calcModeOpts.weightColumn])
                ?.reduce((x, y) => x + y, 0) /
                this.sortedData
                  ?.map((item) => item[calcModeOpts.weightColumn])
                  ?.reduce((x, y) => x + y, 0),
              columnIndex,
              null,
              true
            );
          }

          case "mean": {
            return this.format(
              this.sortedData
                ?.map((item) => item[column])
                ?.reduce((x, y) => x + y, 0) / this.sortedData?.length,
              columnIndex,
              null,
              true
            );
          }
          case "mean:locale": {
            return this.format(
              this.sortedData
                ?.map((item) => item[column])
                ?.reduce((x, y) => x + y, 0) / this.sortedData?.length,
              columnIndex,
              null,
              true
            );
          }
          case "mean:percent": {
            return this.format(
              this.sortedData
                ?.map((item) => item[column])
                ?.reduce((x, y) => x + y, 0) /
                (this.sortedData?.length * 100),
              columnIndex,
              null,
              true
            );
          }
          default: {
            console.log("not found");
          }
        }
      }
    },
    SubmitFilter() {
      console.log("enviado!!");
      console.log(this.contratosAberto, this.financeiroAberto);
      console.log(typeof this.contratosAberto);
      this.data = this.data.filter(
        (item) => item.qtt_aberto > Number(this.contratosAberto)
      );
      this.data = this.data.filter(
        (item) => item.vtt_aberto > Number(this.financeiroAberto)
      );
      console.log(this.data);
      this.isShowModal = false;
    },
    sort(column_index) {
      if (this.currentSort == this.columns[column_index].value)
        this.currentSortDir = this.currentSortDir === 1 ? -1 : 1;
      this.currentSort = this.columns[column_index].value;
    },

    toggleSorting(column) {
      this.sort_asc = !this.sort_asc;
      this.currentSort = column;
    },

    sendEvent() {
      this.$notify({
        type: "success",
        title: `Nova máxima!!`,
        text: `O Ativo ${newItems[i].cod} fez uma nova máxima`,
      });
    },
    toggleVisualization() {
      this.visualizationMobile = !this.visualizationMobile;
      console.log("eai bb");
    },
  },
  watch: {
    availableOpts(nv, ov) {
      this.filteredOpts = [];
      console.log("atualizei avOpts", nv);
    },
    selectedIOptions: {
      handler(nV, oV) {
        if (nV.symbol) {
          const justF =
            !oV.oper || !oV.type || !oV.TradgEndDt || !oV.ExrcPric || !oV.close;

          const findSer = this.filteredOpts.findIndex(
            (item) => item.symbol == nV.symbol
          );

          if (findSer !== -1) {
            for (const x of Object.keys(this.selectedIOptions)) {
              if (this.filteredOpts[findSer][x])
                this.selectedIOptions[x] = this.filteredOpts[findSer][x];
            }
          }

          if (justF && nV.symbol !== this.equity) this.tableFinish();
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap");
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
