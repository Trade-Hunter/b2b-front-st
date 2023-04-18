<template>
  <HxcMenu>
    <base-modal v-if="modalActive" @close="toggleModal" :submit="SubmitFilter" scrollable title="Filtrar dados">
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
        <h2 class="mb-2 text-xl font-extrabold text-gray-900 dark:text-gray-50 font-mono">Players</h2>
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
import Modal from "@/components/Modal/Modal.vue";
import HxcTable from "@/components/Tables/TableOptions.vue";

import { InformationCircle } from "@/assets/icons/heroicons";

export default {
  components: {
    HxcMenu,
    Modal,
    HxcTable,
  },
  setup() {},
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
      data: [],
      paging: {},
      loading: true,
      paging: { pages: 0, total: 0, page: 0, page_size: 350 },
      columns: [
        {
          name: "Ativo",
          value: "cod",
        },
        { name: "Fechamento", value: "close", format: "float" },
        { name: "Média / Volume", value: "mediaVolume", format: "int" },

        { name: "Dist Ima", value: "distanciaCallDesc", format: "percent", color: true },
        //{ name: 'DI Total Call', value: 'distanciaCallTotal', format: 'percent', color: true },
        { name: "Dist Barreira", value: "distanciaPutDesc", format: "percent", color: true },
        //{ name: 'DI Total Call', value: 'distanciaPutTotal', format: 'percent', color: true },
        { name: "Points Ima", value: "maxYDesc", format: "int" },
        //{ name: 'PI Total', value: 'maxYTotal', format: 'int' },
        { name: "Points Barreira", value: "minYDesc", format: "int" },
        //{ name: 'PB Total', value: 'minYTotal', format: 'int' },
        { name: "Strike Ima", value: "pexMaxYDesc", format: "float" },
        //{ name: 'PxEx I Total', value: 'pexMaxYTotal', format: 'float' },
        { name: "Strike Barreira", value: "pexMinYDesc", format: "float" },
        //{ name: 'PxEx B Total', value: 'pexMinYTotal', format: 'float' },
        {
          name: "Força Ima",
          value: "pointsMaxDesc_mediaVolume",
          format: "percent",
          custom_format: function (obj, value, colIndex, rowIndex) {
            if (value >= 0.1) return `<p class="font-semibold text-green-500">${(value * 100)?.toFixed(2)}%</p>`;
            return (value * 100)?.toFixed(2) + "%";
          },
        },
        {
          name: "Força Barreira",
          value: "pointsMinDesc_mediaVolume",
          format: "percent",
          custom_format: function (obj, value, colIndex, rowIndex) {
            if (value >= 0.1) return `<p class="font-semibold text-green-500">${(value * 100)?.toFixed(2)}%</p>`;
            return (value * 100)?.toFixed(2) + "%";
          },
        },
        { name: "Score", value: "score", format: "float" },
        { name: "Var Ima", value: "varMaxY", format: "int", color: true },
        { name: "Var Barreira", value: "varMinY", format: "int", color: true },
      ],
      connection: null,
    };
  },
  mounted() {
    this.getGexIndex();
  },
  beforeUnmount() {},

  methods: {
    async getGexIndex() {
      const { data } = await this.$api.get(`/options/gex1/screener`);
      this.data = data;
      this.loading = false;
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
  },
  watch: {},
};
</script>

<style></style>
