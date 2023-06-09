<template>
  <HxcMenu>
    <FilterModal
      class=""
      ref="filterModal"
      :all-columns="selectedComponent.filter"
      @filter-by-column-values="applyFilters"
    />
    <Modal @close="toggleInfo" :submit="submitInfo" scrollable title="Informações Úteis" ref="modalInfo">
      <div v-for="topic in infoKeys" :key="topic" class="font-mono w-full">
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
    </Modal>
    <div class="grid grid-cols-3 h-full p-4 gap-8">
      <div
        v-for="(component, componentIdx) in components"
        :key="component.name"
        class="qdrinho bg-white overflow-y-auto flex flex-col h-full custom-scrollbar"
      >
        <div class="p-3 flex">
          <router-link class="text-qdrinho text-black uppercase" :to="component.href">{{ component.name }}</router-link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 ml-auto text-black"
            @click="openFilterModal(component)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          <InformationCircle class="ml-2" @click="showInfo(componentIdx)" />
        </div>

        <div class="flex h-full overflow-y-scroll custom-scrollbar">
          <!-- <div v-if="component.value == 'iceberg'" class="flex justify-center mx-auto items-center h-full">
            <div class="text-center text-4xl tracking-widest font-bold text-black">EM BREVE</div>
          </div> -->
          <!-- <div v-if="loading" class="flex justify-center mx-auto items-center h-full">
            <div class="text-center text-4xl tracking-widest font-bold text-black"><LoadingSpinner /></div>
          </div> -->

          <table class="mx-auto max-w-full h-min w-full" :class="{ 'h-full': loading }">
            <thead class="bg-[#E7E7E7] dark:bg-[#2A2D33] z-10 leading-6 text-gray-700 font-thin sticky top-0">
              <tr class="text-center">
                <th
                  v-for="cl of component.columns"
                  :key="cl.value"
                  class="px-2 whitespace-nowrap py-1 font-normal cursor-pointer"
                  @click="changeSort(component.value, cl.index)"
                  :class="cl.ident"
                >
                  {{ cl.label }}
                </th>
              </tr>
            </thead>
            <tbody class="z-0 h-full overflow-y-auto relative">
              <tr v-if="loading" class="text-center">
                <td :colspan="component?.columns?.length" class="px-4 py-1"><LoadingSpinner /></td>
              </tr>
              <tr
                v-else
                class="text-center text-black z-0"
                v-for="(row, rowIdx) in data[component.value]"
                :key="`row-${rowIdx}`"
              >
                <td v-for="(cl, cellIdx) in component.columns" :key="cl.value" class="px-2 py-1" :class="cl.ident">
                  <span
                    v-html="format(cl.format, row[cl.index])"
                    :class="{
                      blink: cellChanged[`${component.value}-${rowIdx}-${cellIdx}`],
                    }"
                  ></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </HxcMenu>
</template>

<script>
import HxcMenu from "@/components/Menu/Menu.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue"; // Import the LoadingSpinner component
import FilterModal from "@/components/Modal/FilterModal.vue"; // import the FilterModal component
import Modal from "@/components/Modal/Modal.vue";
import { InformationCircle } from "@/assets/icons/heroicons";
import { reactive, watch, computed, ref, onUnmounted } from "vue";
import { useStore } from "vuex";

import { CORRETORAS } from "@/constants/corretoras";
export default {
  components: {
    HxcMenu,
    LoadingSpinner,
    FilterModal,
    InformationCircle,
    Modal,
  },
  data() {
    return { selectedComponent: { filter: undefined }, infoKeys: [] };
  },
  setup() {
    const store = useStore();
    const cellChanged = ref({});
    const data = ref({});
    const loading = ref(true);
    const selComponent = ref("");
    const components = [
      {
        name: "Avat",
        value: "avat",
        href: "/avat",
        columns: [
          { label: "Ativo", value: "", index: 0, ident: "text-left" },
          { label: "Hora", value: "", index: 1, format: { type: "hora" }, ident: "text-right" },
          { label: "Últ.", index: 2, format: { type: "float" }, ident: "text-right" },
          { label: "Var. %", value: "", index: 3, format: { type: "float", color: true }, ident: "text-right" },
          { label: "AVAT", value: "", index: 6, format: { type: "float" }, ident: "text-right" },
        ],
        filter: [
          { label: "Liquidez Mínima", value: "liqmin", index: 5 },
          //{ label: "Intervalo Mínimo", value: "minInterval", index: 4 },
          { label: "AVAT Min", value: "avatMin", index: 6 },
        ],
        default: {
          query: [
            {
              queryName: "greaterThan",
              queryIdx: 5,
              queryType: "",
              queryValue: 25000000,
            },
          ],

          sortIdx: 6,
          order: "dsc",
        },
        info: [
          {
            title: "Métricas Disponíveis",
            description: "Veja o que significa cada métrica.",
            subtopics: [
              {
                title: "Ativo",
                description: "Instrumento referente.",
              },
              {
                title: "Hora",
                description: "Hora de negociação.",
              },
              {
                title: "Últ.",
                description: "Último preço do ativo.",
              },
              {
                title: "Var. %",
                description: "Variação em percentual.",
              },
              {
                title: "Average Volume at Time (AVAT)",
                description: "Volume projetado em relação á média diária de volume.",
              },
            ],
          },
        ],
      },
      {
        name: "Iceberg",
        value: "iceberg",
        href: "/iceberg",
        columns: [
          { label: "Ativo", value: "", index: 0, ident: "text-left" },
          { label: "C/V", value: "", index: 1, ident: "text-right" },
          { label: "Quant", value: "", index: 3, ident: "text-right" },
          { label: "Preço", value: "", index: 2, format: { type: "float" }, ident: "text-right" },
          { label: "Broker", value: "", index: 4 },
          { label: "Repet", value: "", index: 5 },
          // { label: "Ativo", value: "", index: 0 },
        ],
        filter: [
          { label: "Lote Min", value: "lotemin", index: 3 },
          { label: "Repet Min", value: "repetmin", index: 5 },
        ],
        default: {
          sortIdx: 1,
          order: "dsc",
        },
        info: [
          {
            title: "Métricas Disponíveis",
            description: "Veja o que significa cada métrica.",
            subtopics: [
              {
                title: "Ativo",
                description: "",
              },
              {
                title: "Hora",
                description: "",
              },
              {
                title: "Type",
                description: "",
              },
              {
                title: "Size",
                description: "",
              },
            ],
          },
        ],
      },
      {
        name: "Players",
        value: "players",
        href: "/players",
        columns: [
          { label: "Ativo", value: "", index: 0, ident: "text-left" },
          { label: "Hora", value: "", index: 1, format: { type: "hora" }, ident: "text-right" },
          { label: "Últ.", value: "", index: 2, format: { type: "float" }, ident: "text-right" },
          { label: "Point", value: "", index: 4, format: { type: "float", color: true }, ident: "text-right" },
          { label: "Score", value: "", index: 5, format: { type: "float" }, ident: "text-right" },
          { label: "% Qtt", value: "", index: 21, format: { type: "float" }, ident: "text-right" },
          { label: "Var5Min", value: "", index: 22, format: { type: "float" }, ident: "text-right" },
          //{ label: "Interval", value: "", index: 5, format: { type: "float" } },
          //{ label: "Price", value: "", index: 5, format: { type: "float" } },
          //{ label: "Ativo", value: "", index: 0 },
          //TODO: ordernacao default score
        ],
        filter: [
          //{ label: "Player", value: "player" },
          { label: "Liquidez Minima", value: "liqMin", index: 19 },
        ],
        default: {
          sortIdx: 5,
          order: "dsc",
        },
        info: [
          {
            title: "Métricas Disponíveis",
            description: "Veja o que significa cada métrica.",
            subtopics: [
              {
                title: "Ativo",
                description: "Instrumento referente.",
              },
              {
                title: "Hora",
                description: "Hora de negociação.",
              },
              {
                title: "Últ.",
                description: "Último preço do ativo.",
              },
              {
                title: "Var. %",
                description: "Variação em percentual.",
              },
              {
                title: "Points",
                description:
                  "Algorítmo proprietário que mede cada negócio em relação aos dois principais players acrescentando ou decrescentando pontos",
              },
              {
                title: "Score",
                description: "Points / Número de negócios",
              },
            ],
          },
        ],
      },
      {
        name: "Amplitude",
        value: "amplitude",
        href: "/amplitude",
        columns: [
          { label: "Ativo", value: "ativo", index: 0, ident: "text-left" },
          { label: "Hora", index: 1, format: { type: "hora" }, ident: "text-right" },
          { label: "Últ.", index: 2, format: { type: "float" }, ident: "text-right" },
          //{ label: "Var. %", index: 7, format: { type: "float", color: true } },
          { label: "Amp. 2", index: 3, format: { type: "float", color: true }, ident: "text-right" },
          { label: "Amp. 5", index: 7, format: { type: "float", color: true }, ident: "text-right" },
        ],
        filter: [
          { label: "Liquidez", value: "liq", index: 13 },
          { label: "Preço Mín.", value: "preco", index: 2 },
          { label: "Amplitude 2", value: "amp2", index: 3 },
          { label: "Amplitude 5", value: "amp5", index: 7 },
          //TODO: sort default amplitude
        ],
        default: {
          sortIdx: 3,
          order: "dsc",
          query: [
            {
              queryName: "greaterThan",
              queryIdx: 13,
              queryType: "",
              queryValue: 25000000,
            },
          ],
        },
        info: [
          {
            title: "Métricas Disponíveis",
            description: "Veja o que significa cada métrica.",
            subtopics: [
              {
                title: "Ativo",
                description: "Instrumento referente.",
              },
              {
                title: "Hora",
                description: "Hora de negociação.",
              },
              {
                title: "Últ.",
                description: "Último preço do ativo.",
              },
              {
                title: "Amp.",
                description: "Amplitude de osciçação de um ativo em 2 ou 5 minutos",
              },
            ],
          },
        ],
      },
      {
        name: "Distortions",
        value: "distortions",
        href: "/distortions",
        columns: [
          { label: "Ativo", value: "", index: 0, ident: "text-left" },
          { label: "Hora", value: "", index: 11, format: { type: "hora" }, ident: "text-right" },
          { label: "Últ.", value: "", index: 5, format: { type: "float" }, ident: "text-right" },
          { label: "Var. %", value: "", index: 6, format: { type: "float", color: true }, ident: "text-right" },
          { label: "Quantidade", value: "", index: 3, format: { type: "int" }, ident: "text-right" },
          { label: "Financeiro", value: "", index: 4, format: { type: "int" }, ident: "text-right" },
        ],
        filter: [
          {
            label: "Compradores",
            value: "compradores",
            type: "basket",
            index: 7,
            filterOptions: {
              title: "Corretoras",
              description: "Gerencie seu basket aqui.",
              fromListLabel: "Disponível",
              toListLabel: "Selecionado",
              initialFromList: [...CORRETORAS],
              initialToList: [],
            },
          },
          {
            label: "Vendedores",
            value: "Vendedores",
            type: "basket",
            index: 8,
            filterOptions: {
              title: "Corretoras",
              description: "Gerencie seu basket aqui.",
              fromListLabel: "Disponível",
              toListLabel: "Selecionado",
              initialFromList: [...CORRETORAS],
              initialToList: [],
            },
          },
          { label: "Financeiro Mínimo", value: "financeiroMin", index: 4 },
        ],
        default: {
          sortIdx: 11,
          order: "dsc",
        },
        info: [
          {
            title: "Métricas Disponíveis",
            description: "Veja o que significa cada métrica.",
            subtopics: [
              {
                title: "Ativo",
                description: "Instrumento referente.",
              },
              {
                title: "Hora",
                description: "Hora de negociação.",
              },
              {
                title: "Últ.",
                description: "Último preço do ativo.",
              },
              {
                title: "Var. %",
                description: "Variação em percentual.",
              },
              {
                title: "Quantidade",
                description: "Volume em quantidade de ações",
              },
              {
                title: "Financeiro",
                description: "Volume em R$ do Distortion.",
              },
            ],
          },
        ],
      },
      {
        name: "Arbitragem",
        value: "arbitragem",
        href: "/arbitragem",
        columns: [
          {
            label: "Setor",
            value: "",
            index: 6,
            ident: "text-left",
            format: {
              custom_format: (value) => {
                return `<a class="text-blue-500" href="/arbitragem/setor/${value}">${value}</a>`;
              },
            },
          },
          // { label: "Hora", value: "", index: 1 },
          { label: "Méd %", value: "", index: 7, format: { type: "float", color: true }, ident: "text-right" },
          { label: "Pior", value: "", index: 8, ident: "text-left" },
          { label: "%.", value: "", index: 9, format: { type: "float", color: true }, ident: "text-right" },
          { label: "%", value: "", index: 11, format: { type: "float", color: true }, ident: "text-right" },
          { label: "Melhor", value: "", index: 10, ident: "text-left" },
          { label: "Quant.", value: "", index: 12, ident: "text-right" },
          //{ label: "Proj.", value: "", index: 4, format: { type: "int" } },
          //{ label: "Ativo", value: "", index: 0 },
        ],
        filter: [
          //{ label: "Liquidez Mínima", value: "liqMin", index: 4 },
          { label: "Setor", value: "sec", index: 6 },
          { label: "Quant.", value: "quant", index: 12 },
          //TODO: filtro deffault liq minima 5mm
          //TODO: sort ordem alfabetica
        ],
        info: [
          {
            title: "Métricas Disponíveis",
            description: "Veja o que significa cada métrica.",
            subtopics: [
              {
                title: "Setor",
                description: "Setor de classificação",
              },
              {
                title: "Méd %",
                description: "Oscilaçäo média do setor.",
              },
              {
                title: "Pior",
                description: "Pior desempenho do setor",
              },
              {
                title: "Min. %",
                description: "Variação em % do pior desempenho do setor.",
              },
              {
                title: "Max. %",
                description: "Variação em % do melhor desempenho do setor.",
              },
              {
                title: "Melhor",
                description: "Melhor desempenho do setor.",
              },
              {
                title: "Quant.",
                description: "Quantidade de ações no setor.",
              },
            ],
          },
        ],

        // default: {
        //   sortIdx: 3,
        //   order: "dsc",
        // },
      },
    ];

    const webSocketUrl = ref(`${import.meta.env.VITE_WEBSOCKET_HOST}/?token=${store.state.auth.token}`);
    const filters = ref({});

    const createStruct = () => {
      for (var cp of components) {
        data.value[cp.value] = [];

        filters.value[cp.value] = {
          query: cp.default?.query || "",
          sortIdx: cp.default?.sortIdx || 1,
          order: cp.default?.order || "dsc",
          limit: 15,
        };
      }

      //console.log("dash", store.state.theme.DASH_OPTS);
      if (store.state.theme.DASH_OPTS) {
        filters.value = store.state.theme.DASH_OPTS;
        for (var key of Object.keys(filters.value)) {
          for (var query of filters.value[key].query) {
            const cpIdx = components.findIndex((item) => item.value == key);
            if (cpIdx !== -1) {
              const findIdx = components[cpIdx].filter.findIndex((item) => item.index == query.queryIdx);
              if (findIdx !== -1) {
                console.log("findIdx");
                components[cpIdx].filter[findIdx].queryName = query.queryName;
                components[cpIdx].filter[findIdx].queryValue = query.queryValue;
              }
            }
          }
        }
      }
    };

    const getMessage = () => {
      const queryOpts = [];
      for (var key of Object.keys(filters.value)) {
        queryOpts.push(
          `C=S;I=${key};Q=${encodeURIComponent(btoa(JSON.stringify(filters.value[key].query)))};S=${
            filters.value[key].sortIdx
          };O=${filters.value[key].order};L=${filters.value[key].limit}`
        );
      }
      console.log("opa", queryOpts);
      return queryOpts.join("\r\n");
    };

    const toggleSelCp = (sel) => {
      selComponent.value = sel;
    };

    const createWebSocket = () => {
      try {
        const connection = new WebSocket(webSocketUrl.value);
        connection.onopen = (event) => {
          connection.send(getMessage());
          //connection.send(`C=S;I=iceberg;O=3212\r\nC=S;I=amplitude;O=3212\r\nC=S;I=players;O=2134`);
          // this.$notify({
          //   type: "success",
          //   title: `Conexão com o servidor realizada com sucesso`,
          // });
          loading.value = false;
        };
        connection.onerror = (event) => {
          console.log("Connection error", event);
        };
        connection.onclose = (event) => {
          console.log("desconectou");
          //this.loading = true;
          //this.connection = null;
          if (event.code == 3000) {
            store.dispatch("auth/refresh");
          } else {
            const randomDelay = Math.floor(Math.random() * 5000) + 1000; // Random delay between 1 and 6 seconds
            setTimeout(() => {
              console.log("Reconnecting...");
              createWebSocket();
            }, randomDelay);
          }
          loading.value = true;
        };
        connection.onmessage = (event) => {
          const dataEv = JSON.parse(event.data);

          //console.log(data.value);
          if (dataEv.type == "E") console.log("erro websocket message");

          // Update the cellChanged object
          for (let rowIndex in dataEv.data) {
            // Initialize the data structure if it doesn't exist
            if (data.value[dataEv.ch][rowIndex] === undefined) {
              data.value[dataEv.ch][rowIndex] = [];
            }

            for (let cellIndex in dataEv.data[rowIndex]) {
              const cellKey = `${dataEv.ch}-${rowIndex}-${cellIndex}`;
              if (cellChanged.value[cellKey] === undefined) {
                cellChanged.value[cellKey] = false;
              } else if (data.value[dataEv.ch][rowIndex][cellIndex] !== dataEv.data[rowIndex][cellIndex]) {
                cellChanged.value[cellKey] = true;
                setTimeout(() => {
                  cellChanged.value[cellKey] = false;
                }, 1000);
              }

              // Update the data
              data.value[dataEv.ch][rowIndex][cellIndex] = dataEv.data[rowIndex][cellIndex];
            }
          }
          //console.log("sdsdsdsdsd", dataEv.data.length);
          if (dataEv.data.length < 1) {
            //console.log("sdsdsdsdsd1", dataEv.ch);
            data.value[dataEv.ch] = [];
          }
        };
        return connection;
      } catch (error) {
        console.log("error", error);
      }
    };

    const changeSort = (cp, index) => {
      filters.value[cp].sortIdx = index;
      filters.value[cp].order = filters.value[cp].order == "dsc" ? "asc" : "dsc";
      if (connection) {
        connection.send(getMessage());
      }
    };

    createStruct();
    const connection = createWebSocket();

    onUnmounted(() => {
      if (connection) {
        connection.close();
      }
    });

    watch(store.state.auth.token, (newUsername) => {
      if (connection) {
        connection.close();
      }
      createWebSocket();
    });

    const applyFilters = (selectedFilters) => {
      console.log("[applyFilters]", selComponent.value, selectedFilters);

      const cpIdx = components.findIndex((item) => item.value == selComponent.value);
      if (cpIdx !== -1) {
        //components[cpIdx].filter
        console.log("aaa", components[cpIdx]);
        for (var key of selectedFilters) {
          console.log("keytyy", key);
          const filterIdx = components[cpIdx].filter.findIndex((item) => item.index == key.queryIdx);
          if (filterIdx !== -1) {
            console.log("achei", components[cpIdx].filter[filterIdx], key);
            components[cpIdx].filter[filterIdx].queryName = key.queryName;
            components[cpIdx].filter[filterIdx].queryValue = key.queryValue;
          }
        }
      }
      filters.value[selComponent.value].query = selectedFilters;

      if (connection) {
        connection.send(getMessage());
      }

      store.commit("theme/SET_DASH_OPTS", filters.value);
    };

    // const filteredData = computed(() => {
    //   const result = {};
    //   for (const key in data.value) {
    //     if (filters.value[key]) {
    //       result[key] = data.value[key].filter((row) =>
    //         filters.value[key].every((filter) => filter.condition(row[filter.colIndex]))
    //       );
    //     } else {
    //       result[key] = data.value[key];
    //     }
    //   }
    //   return result;
    // });

    return {
      cellChanged,
      connection,
      components,
      data,
      loading,
      applyFilters,
      toggleSelCp,
      changeSort,
    };
  },
  computed: {},
  mounted() {
    //this.createStruct();
    //this.createWebSocket();
  },
  beforeUnmount() {
    if (this.connection) {
      this.connection.close();
    }
  },
  methods: {
    showInfo(idx) {
      this.infoKeys = this.components[idx].info;
      this.$refs.modalInfo.open();
    },
    openFilterModal(component) {
      // Call the open method on the FilterModal component and pass the component as a parameter
      console.log(this.$refs);
      this.toggleSelCp(component.value);
      //this.selectedComponent = { filter: [{ value: "bomdia", label: "oi" }] };
      this.selectedComponent = { value: component.value, filter: component.filter };

      console.log("oo", this.selectedComponent);
      this.$refs.filterModal.openModal();
    },
    format(format, value) {
      if (!value) return "";
      if (!format) return value;

      if (format.custom_format) return format.custom_format(value);
      switch (format.type) {
        case "int": {
          if (format.color) {
            var color = value >= 0 ? "font-bold text-green-500" : "font-bold text-red-500";

            var el =
              `<span class="${color}">` +
              Number(value)?.toLocaleString("pt-BR", { maximumFractionDigits: 0 }) +
              "</span>";
            return el;
          }
          return Number(value)?.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
        }
        case "float": {
          if (format.color) {
            let color;
            if (value > 0) color = "text-green-500";
            if (value < 0) color = "text-red-500";
            var el =
              `<span class="${color}">` +
              Number(Number(value)?.toFixed(2) || 0)?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) +
              "</span>";
            return el;
          }
          return Number(Number(value)?.toFixed(2) || 0)?.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }
        case "string": {
          return value;
        }
        case "percent": {
          if (format.color) {
            var color = value >= 0 ? "text-green-500" : "text-red-500";

            var el = `<span class="${color}">` + (value * 100 || 0)?.toFixed(2) + "%" + "</span>";
            return el;
          }
          return (value * 100 || 0)?.toFixed(2) + "%";
        }
        case "percentM": {
          if (format.color) {
            var color = value >= 0 ? "text-green-500" : "text-red-500";

            var el = `<span class="${color}">` + value.toFixed(2) + "%" + "</span>";
            return el;
          }
          return value?.toFixed(2) + "%";
        }
        case "hora": {
          return value?.toString().slice(0, 2) + ":" + value.toString().slice(2);
        }
      }
    },
  },
};
</script>

<style>
.qdrinho {
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid rgba(42, 91, 112, 0.5);
}

.text-qdrinho {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 0.3em;

  border-bottom: 1px solid #2a5b70;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.blink {
  animation: blink 1s linear infinite;
}
</style>
