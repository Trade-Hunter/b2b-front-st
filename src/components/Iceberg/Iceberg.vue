<template>
  <HxcMenu>
    <Modal :submit="SubmitFilter" scrollable title="Filtrar dados" ref="modalFilter">
      <div class="grid gap-x-2 grid-cols-1 lg:grid-cols-4 w-full">
        <div>
          <hxc-label text="Pontuação Mínima"></hxc-label>
          <hxc-range-input v-model:value="filtroPtt" :min="0" :step="5000" :max="10000000"></hxc-range-input>
        </div>
      </div>

      <hr class="my-4 border-gray-200" />
      <template v-slot:footer>
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <hxc-btn @click="SubmitFilter" text="Confirmar"> </hxc-btn>
        </span>
      </template>
    </Modal>
    <Modal :submit="submitInfo" scrollable title="Informações Úteis" ref="modalInfo">
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
    </Modal>
    <div class="flex flex-col no-scrollbar overflow-scroll min-w-full h-full pl-2 pt-1">
      <div class="flex">
        <h2 class="mb-2 text-xl font-extrabold text-gray-900 dark:text-gray-50 font-mono">Iceberg</h2>
        <div
          class="ml-auto mr-2 cursor-pointer"
          v-tooltip:left.tooltip="'Entenda a dinâmica dessa tela.'"
          @click="toggleInfo"
        >
          <InformationCircle class="hover:scale-125" @click="showInfo" />
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
import Modal from "@/components/Modal/Modal.vue";
import HxcTable from "@/components/Tables/TableOptions.vue";

import { InformationCircle } from "@/assets/icons/heroicons";
import { useStore } from "vuex";
import { ref, onUnmounted } from "vue";

export default {
  components: {
    HxcMenu,
    Modal,
    HxcTable,
    InformationCircle,
  },
  setup() {
    const store = useStore();
    const cellChanged = ref({});
    const data = ref([]);
    const loading = ref(true);

    const webSocketUrl = ref(`${import.meta.env.VITE_WEBSOCKET_HOST}/?token=${store.state.auth.token}`);

    const createWebSocket = () => {
      try {
        const connection = new WebSocket(webSocketUrl.value);
        connection.onopen = (event) => {
          connection.send(`C=S;I=iceberg;Q=;S=;L;=500`);
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
            if (data.value[rowIndex] === undefined) {
              data.value[rowIndex] = [];
            }

            for (let cellIndex in dataEv.data[rowIndex]) {
              const cellKey = `${dataEv.ch}-${rowIndex}-${cellIndex}`;
              if (cellChanged.value[cellKey] === undefined) {
                cellChanged.value[cellKey] = false;
              } else if (data.value[rowIndex][cellIndex] !== dataEv.data[rowIndex][cellIndex]) {
                cellChanged.value[cellKey] = true;
                setTimeout(() => {
                  cellChanged.value[cellKey] = false;
                }, 1000);
              }

              // Update the data
              data.value[rowIndex][cellIndex] = dataEv.data[rowIndex][cellIndex];
            }
          }

          if (dataEv.data.length < 1) {
            data.value = [];
          }
        };
        return connection;
      } catch (error) {
        console.log("error", error);
      }
    };

    const connection = createWebSocket();

    onUnmounted(() => {
      if (connection) {
        connection.close();
      }
    });

    return { connection, data, loading };
  },
  data() {
    return {
      modalActive: false,
      filtroPtt: 0,
      infoActive: false,
      infoTopics: [
        {
          title: "Métricas da Tabela",
          description: "Veja o que significa cada métrica da tabela",
          subtopics: [
            {
              title: "Points Ima",
              description: "Points Imã",
            },
            {
              title: "Points Barreira",
              description: "Points Barreira",
            },

            {
              title: "Strike",
              description: "Preço de Exercício",
            },
          ],
        },
      ],

      currentChart: "oi",
      FilerBycolumns: [
        {
          name: "Família",
          value: "symbol",
          index: 0,
        },
      ],

      paging: {},

      paging: { pages: 0, total: 0, page: 0, page_size: 350 },
      columns: [
        {
          name: "Ativo",
          value: "cod",
          index: 0,
          ident: "text-left",
        },
        {
          name: "C/V",
          value: "",
          format: "hora",
          index: 1,
          ident: "text-right",
        },
        {
          name: "Quant",
          value: "",
          format: "",
          index: 3,
          ident: "text-right",
        },
        {
          name: "Preço",
          value: "",
          format: "float",
          index: 2,
          ident: "text-right",
        },
        {
          name: "Broker",
          value: "",
          format: "float",
          index: 4,
          ident: "text-right",
        },
        {
          name: "Repet",
          value: "",
          format: "float",
          index: 5,
          ident: "text-right",
        },
        // {
        //   name: "Quantidade",
        //   value: "",
        //   format: "",
        // },
        // {
        //   name: "Financeiro",
        //   value: "",
        //   format: "",
        // },
        // {
        //   name: "Quantidade / Média",
        //   value: "",
        //   format: "",
        // },
        // {
        //   name: "Comprador",
        //   value: "",
        //   format: "",
        // },
        // {
        //   name: "Vendedor",
        //   value: "",
        //   format: "",
        // },
        // {
        //   name: "Últ / MM 60",
        //   value: "",
        //   format: "",
        // },
      ],
      connection: null,
    };
  },
  mounted() {},
  beforeUnmount() {},

  methods: {
    showInfo() {
      this.$refs.modalInfo.open();
    },
    toggleModal() {
      this.$refs.modalFilter.open();
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
  },
  watch: {},
};
</script>

<style></style>
