<template>
  <HxcMenu>
    <FilterModal ref="filterModal" :all-columns="selectedComponent.filter" @filter-by-column-values="applyFilters" />
    <div class="grid grid-cols-3 h-full p-4 gap-8">
      <div v-for="component in components" :key="component.name" class="qdrinho overflow-hidden">
        <div class="p-3 flex">
          <h2 class="text-qdrinho uppercase">
            {{ component.name }}
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 ml-auto"
            @click="openFilterModal(component)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div>
        <div class="overflow-y-scroll h-full">
          <table class="mx-auto h-full max-w-full w-full">
            <thead class="bg-[#74747429] sticky top-0">
              <tr class="text-center">
                <th v-for="cl of component.columns" :key="cl.value" class="px-4 py-1">{{ cl.label }}</th>
              </tr>
            </thead>
            <tbody class="h-full overflow-x-visible">
              <tr v-if="loading" class="text-center">
                <td :colspan="component?.columns?.length" class="px-4 py-1"><LoadingSpinner /></td>
              </tr>
              <tr
                v-else
                class="text-center"
                v-for="(row, rowIdx) in filteredData[component.value]"
                :key="`row-${rowIdx}`"
              >
                <td v-for="(cl, cellIdx) in component.columns" :key="cl.value" class="px-4 py-1">
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
import { reactive, computed, ref, onUnmounted } from "vue";
export default {
  components: {
    HxcMenu,
    LoadingSpinner,
    FilterModal,
  },
  data() {
    return { selectedComponent: { filter: undefined } };
  },
  setup() {
    const cellChanged = ref({});
    const data = ref({});
    const loading = ref(true);

    const components = [
      {
        name: "Avat",
        value: "avat",
        columns: [{ label: "Ativo" }],
      },
      {
        name: "Iceberg",
        value: "iceberg",
        columns: [{ label: "Ativo" }],
      },
      {
        name: "Players",
        value: "players",
        columns: [{ label: "Ativo" }],
      },
      {
        name: "Amplitude",
        value: "amplitude",
        columns: [
          { label: "Ativo", value: "ativo", index: 0 },
          { label: "Hora", index: 1 },
          { label: "Últ", index: 2, format: { type: "float" } },
          { label: "Var. %", index: 3, format: { type: "float", color: true } },
          { label: "Amp.", index: 4, format: { type: "float", color: true } },
        ],
        filter: [{ label: "Liquidez", value: "liq", colIndex: 3 }],
      },
      { name: "Distortions", value: "distortions", columns: [{ label: "Ativo" }] },
      { name: "Arbitragem", value: "arbitragem", columns: [{ label: "Ativo" }] },
    ];

    const webSocketUrl = ref(
      `${
        import.meta.env.VITE_WEBSOCKET_HOST
      }/?token=eyJfaWQiOiI2MjY4YzcwZDU0OTAzN2Y2MzIxMTAwN2EiLCJpYXQiOjE2ODIwOTMyMDI4NTd9.eyJhbGciOiJFUzUxMiIsImtpZCI6ImdHS2J2UHphSEFGcDBGMmtCT2pJeUw3TkFPSklvM2t6Tl9ucWlXUW91WTgifQ.ASBJ02SHYWxFhM0nze2x47YH5E6nJezVhZp69_PB3YwVoRIsQn8aq7nrZwO3oTG9fcI3per5rD7pe1nDbZucjvFsAFqkLwn8w-VN2_JSPe0Wzwx8Raxz3nrN-MTX3UMgWcqbMdgBz6qSX-NLaE1epo7M5aizJ0u6AY9_aKrENk-88_Sb`
    );

    const createStruct = () => {
      for (var cp of components) {
        data.value[cp.value] = [];
      }
    };

    const createWebSocket = () => {
      const connection = new WebSocket(webSocketUrl.value);
      connection.onopen = (event) => {
        connection.send(`C=S;I=iceberg;O=3212\r\nC=S;I=amplitude;O=3212\r\nC=S;I=players;O=2134`);
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
          //this.$store.dispatch("auth/refresh");
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
      };
      return connection;
    };

    createStruct();
    const connection = createWebSocket();

    onUnmounted(() => {
      if (connection) {
        connection.close();
      }
    });

    const filters = ref({});

    const applyFilters = (component, selectedFilters) => {
      filters.value[component.value] = selectedFilters;
    };

    const filteredData = computed(() => {
      const result = {};
      for (const key in data.value) {
        if (filters.value[key]) {
          result[key] = data.value[key].filter((row) =>
            filters.value[key].every((filter) => filter.condition(row[filter.colIndex]))
          );
        } else {
          result[key] = data.value[key];
        }
      }
      return result;
    });

    return { cellChanged, connection, components, data, loading, applyFilters, filteredData };
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
    openFilterModal(component) {
      // Call the open method on the FilterModal component and pass the component as a parameter
      console.log(this.$refs);
      this.selectedComponent = { filter: [{ value: "bomdia", label: "oi" }] };

      console.log("oo", this.selectedComponent);
      this.$refs.filterModal.openModal();
    },
    format(format, value) {
      if (!value) return "";
      if (!format) return value;

      if (format.custom_format) return columnObj.custom_format(value);
      switch (format.type) {
        case "int": {
          if (format.color) {
            var color = value >= 0 ? "font-bold text-green-500" : "font-bold text-red-500";

            var el =
              `<span class="${color}">` + value?.toLocaleString("pt-BR", { maximumFractionDigits: 0 }) + "</span>";
            return el;
          }
          return value?.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
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
      }
    },
  },
  watch: {
    "$store.state.auth.token"(newValue) {
      if (this.connection) {
        this.connection.close();
      }
      this.createWebSocket();
    },
  },
};
</script>

<style>
.qdrinho {
  background: #191e24;
  border: 1px solid rgba(42, 91, 112, 0.5);
  border-radius: 4px;
  font-size: 14px;
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

  color: #eaeaea;

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
