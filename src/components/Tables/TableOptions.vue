<template>
  <div class="top-1/3">
    <vue-element-loading :active="loading" width="255px" height="255px" spinner="bar-fade-scale" color="#01C38D" />
  </div>
  <div v-if="search || filterEnabled" class="flex flex-row sm:flex-row center mb-2 text-xs">
    <div class="flex h-8 mr-1 bg-transparent" v-if="search">
      <select
        v-model="filterColumn"
        placeholder="Pesquisar"
        class="shadow-md bg-white dark:bg-dark-1 w-full px-2 text-xs text-black dark:text-white focus:outline-none focus:ring-none focus:ring-th-green"
      >
        <option
          class="dark:bg-dark-1 bg-white rounded-md"
          v-for="column in FilerBycolumns"
          v-bind:value="column"
          :key="column.name"
        >
          {{ column.name }}
        </option>
        <option class="dark:bg-dark-1 bg-white rounded-md" disabled v-bind:value="null">Selecionar</option>
      </select>
    </div>
    <div class="flex shadow-md h-8 flex-grow bg-white dark:bg-dark-1" v-if="search">
      <input
        v-model="filter"
        placeholder="Pesquisar"
        :disabled="this.filterColumn == null"
        class="w-full px-2 text-xs text-black dark:text-white bg-white dark:bg-dark-1 focus:outline-none focus:ring-none focus:ring-th-green"
      />
      <svg
        v-if="filterEnabled"
        @click="toggleModal()"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 m-auto ml-2 mr-2 text-black dark:text-white bg-inherit"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
        />
      </svg>
    </div>
  </div>
  <slot />
  <div class="flex h-full no-scrollbar overflow-auto bg-white dark:bg-dark-1 relative rounded-t">
    <!-- <Observer :emit="true" @intersect="chupa" /> -->

    <custom-scrollbar :style="{ height: '100%' }" :autoExpand="false" class="min-w-full h-full">
      <div
        v-if="dataError"
        class="bg-dark-2 absolute h-full w-full flex items-center content-center rounded-t text-gray-200"
        style="z-index: 999"
      >
        <div class="m-auto">
          <div class="mb-1 text-lg">Informação Indispoível</div>
          <div>Estamos fazendo uma manutenção no momento. Por favor, tente novamente mais tarde.</div>
        </div>
      </div>
      <table class="table w-full h-full table-auto">
        <thead class="z-10 text-gray-50 sticky tracking-tighter text-xs table-header-group">
          <tr class="bg-blue-500 w-full sticky top-0">
            <th
              v-for="(column, index) in columns"
              :key="column.name"
              :class="{
                sticky: index == 0,
                'left-0': index == 0,
              }"
              v-tooltip:bottom.tooltip="column.desc"
              @click="sort(index)"
              class="table-cell py-1"
            >
              <div class="flex justify-center select-none font-normal">
                {{ column.name }}
                <div
                  v-if="currentSort == column.value"
                  class="inline-flex transform hover:text-white text-white hover:scale-110"
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
              'bg-gray-200 dark:bg-dark-2': rowIndex % 2 == 0,
            }"
          >
            <td
              v-for="(column, colIndex) in columns"
              :key="column.name"
              :class="{
                'left-0': colIndex == 0,
                sticky: colIndex == 0,
                'bg-white ': colIndex == 0,
                'bg-gray-200 dark:bg-dark-2': colIndex == 0 && rowIndex % 2 == 0,
                'dark:bg-dark-1': colIndex == 0 && rowIndex % 2 !== 0,
              }"
              class="py-1 px-2"
              v-html="format(item[column.index !== undefined ? column.index : column.value], colIndex, rowIndex)"
            ></td>
          </tr>
        </tbody>

        <tfoot
          v-if="paging.pages > 1 || footer"
          class="text-white tracking-tighter text-xs table-footer-group rounded-b"
        >
          <tr class="text-center bg-blue-500 w-full sticky bottom-0">
            <td
              v-for="(column, index) in columns"
              :key="column.name"
              :class="{
                sticky: index == 0,
                'left-0': index == 0,
              }"
              class="py-1"
              v-html="tableTotals(index)"
            ></td>
          </tr>
        </tfoot>
        <!-- <Observer :emit="true" @intersect="intersected(paging.total > data.length)" /> -->
      </table>
    </custom-scrollbar>
  </div>
  <div
    v-if="tableLength / pageSize > 1"
    class="bg-blue-500 rounded-b-lg flex flex-row xs:flex-row items-end justify-end xs:justify-between drop-shadow-xl"
  >
    <div class="inline-flex xs:mt-0 mb-0.5">
      <button v-if="currentPage !== 1" class="text-xs text-white bg-transparent dark:text-white" @click="currentPage--">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        v-for="i in Math.min(tablePages, 5)"
        :key="i"
        class="text-xs text-white bg-transparent dark:text-white px-2"
        :class="{ 'bg-blue-700': currentPage == currentPage + i - 1 }"
        @click="currentPage = currentPage + i - 1"
      >
        {{ currentPage + i - 1 }}
      </button>

      <button
        v-if="currentPage < tablePages"
        class="text-xs text-white bg-transparent dark:text-white rounded-lg"
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
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Observer from "./Observer.vue";
import VueElementLoading from "vue-element-loading";
import { getCurrentInstance, ref, reactive, toRef } from "vue";

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
    dataError: {
      type: Boolean,
    },
  },
  components: {
    Observer,
    VueElementLoading,
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
      //console.log('filter', this.filter, this.currentSort);
      if (this.filter.length < 3) return this.data;

      return this.data?.filter((c) => {
        if (this.filter == "") return true;

        return c[this.filterColumn?.value]?.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
      });
    },
    sortedCats() {
      return this.filteredCats
        .sort((a, b) => {
          if (a[this.currentSort] < b[this.currentSort]) return -1 * this.currentSortDir;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * this.currentSortDir;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index <= end) return true;
        });
    },
    tableLength() {
      return this.data.length;
    },
    tablePages() {
      return Math.ceil(this.data.length / this.pageSize);
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
      pageSize: 100,
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
  mounted() {},
  methods: {
    async chupa() {
      console.log("no topo");
      //if (this.currentPage > 1) this.currentPage--;
    },

    format(value, Colindex, rowIndex, inFooter = false) {
      var columnObj = this.columns[Colindex];

      if (typeof value == "undefined") return "-";
      if (value == "NaN") return "-";

      if (columnObj.custom_format)
        return columnObj.custom_format(this.sortedCats[rowIndex], value, Colindex, rowIndex, inFooter);

      switch (columnObj.format) {
        case "dateUS": {
          const locale = "en-US";
          const options = {
            timeZone: "Europe/London",
          };

          return new Date(value)?.toLocaleDateString("pt-BR", options);
        }

        case "int": {
          if (columnObj.color) {
            var color = value >= 0 ? "font-bold text-green-500" : "font-bold text-red-500";
            if (inFooter) color = "font-bold text-white";
            var el =
              `<span class="${color}">` + value?.toLocaleString("pt-BR", { maximumFractionDigits: 0 }) + "</span>";
            return el;
          }
          return value?.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
        }
        case "float": {
          if (columnObj.color) {
            var color = value >= 0 ? "font-bold text-green-500" : "font-bold text-red-500";
            if (inFooter) color = "font-bold text-white";
            var el =
              `<span class="${color}">` +
              value?.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) +
              "</span>";
            return el;
          }
          return Number(value)?.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        }
        case "string": {
          return value;
        }
        case "percent": {
          if (columnObj.color) {
            var color = value >= 0 ? "font-bold text-green-500" : "font-bold text-red-500";
            if (inFooter) color = "font-bold text-white";
            var el = `<span class="${color}">` + (value * 100)?.toFixed(2) + "%" + "</span>";
            return el;
          }
          return (value * 100)?.toFixed(2) + "%";
        }

        case "percentM": {
          if (columnObj.color) {
            var color = value >= 0 ? " text-green-500" : " text-red-500";
            if (inFooter) color = "font-bold text-white";
            var el = `<span class="${color}">` + value?.toFixed(2) + "%" + "</span>";
            return el;
          }
          return `${Number(value)?.toFixed(2)}%`;
        }
        case "hora": {
          return value?.toString().slice(0, 2) + ":" + value.toString().slice(2);
        }
        case "time": {
          const options = {
            timeZone: "America/Scoresbysund",
          };
          return new Date(value)?.toLocaleTimeString("pt-BR").slice(0, 5);
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

.scrollbar__thumb {
  background-color: #07368780;
}
</style>
