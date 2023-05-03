<template>
  <Modal
    ref="modal"
    title="Filtrar Dados"
    description="Filtre os dados exibidos aqui."
    @submit="onSubmit"
    @close="onClose"
    :cancelLabel="'Fechar'"
    :confirmLabel="'Aplicar Filtros'"
  >
    <div class="grid gap-3 grid-cols-1 text-black lg:grid-cols-2 w-full">
      <div v-for="column in allColumns" :key="column.value" class="flex flex-col gap-y-2">
        <label :for="column">{{ column.label }}</label>
        <div
          class="flex gap-x-2"
          :class="
            columnFilters[column.value].query && ['basket'].includes(columnFilters[column.value].query)
              ? 'flex-col'
              : ''
          "
        >
          <select
            :id="column"
            v-model="columnFilters[column.value].query"
            class="ring-gray-300 ring-1 ring-inset bg-transparent rounded-lg w-full py-2 px-3 text-gray-900"
          >
            <option class="bg-gray-200" value="" disabled selected>Selecione</option>
            <option class="bg-gray-200" v-for="(option, index) in filterOptions" :key="index" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <input
            v-if="
              columnFilters[column.value].query &&
              ['equals', 'notEquals', 'contains', 'notContains', 'startsWith', 'endsWith'].includes(
                columnFilters[column.value].query
              )
            "
            type="text"
            v-model="columnFilters[column.value].value"
            class="ring-gray-300 ring-1 ring-inset bg-transparent rounded-lg w-full py-2 px-3 text-gray-900"
          />
          <input
            v-if="columnFilters[column.value].query === 'regex'"
            type="text"
            v-model="columnFilters[column.value].value"
            class="ring-gray-300 ring-1 ring-inset bg-transparent rounded-lg w-full py-2 px-3 text-gray-900"
          />
          <input
            v-if="
              columnFilters[column.value].query &&
              ['greaterThan', 'lessThan'].includes(columnFilters[column.value].query)
            "
            type="number"
            v-model="columnFilters[column.value].value"
            class="ring-gray-300 ring-1 ring-inset bg-transparent rounded-lg w-full py-2 px-3 text-gray-900"
          />
          <input
            v-if="columnFilters[column.value].query === 'range'"
            type="range"
            v-model="columnFilters[column.value].value"
            :min="columnFilters[column.value].rangeMin"
            :max="columnFilters[column.value].rangeMax"
            class="ring-gray-300 ring-1 ring-inset bg-transparent rounded-lg w-full py-2 px-3 text-gray-900"
          />

          <DatePicker
            v-if="['beforeThan', 'afterThan', 'dateRange', 'dateSelect'].includes(columnFilters[column.value].query)"
            :id="column"
            :modelValue="columnFilters[column.value][columncolumn.valueFilters[column.value].value]"
            @update:modelValue="(date) => (columnFilters[column.value][columnFilters[column.value].value] = date)"
            :range="columnFilters[column.value].value === 'dateRange'"
            :datepicker-options="
              filterOptions.find((option) => option.value === columnFilters[column.value].value)?.config.options ||
              datePickerOptions
            "
          />

          <div class="">
            <ListBox
              v-if="columnFilters[column.value].query && ['basket'].includes(columnFilters[column.value].query)"
              :column="[column.value]"
              :title="columnFilters[column.value].title"
              :description="columnFilters[column.value].description"
              :fromListLabel="columnFilters[column.value].fromListLabel"
              :toListLabel="columnFilters[column.value].toListLabel"
              :initialFromList="columnFilters[column.value].initialFromList"
              :initialToList="columnFilters[column.value].initialToList"
              @list-changed="onListChanged"
            />
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";
import Modal from "@/components/Modal/Modal.vue";
import DatePicker from "@vuepic/vue-datepicker";
import ListBox from "@/components/ListBox/ListBox.vue";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChevronUpDownIcon,
    Modal,
    DatePicker,
    ListBox,
  },
  props: {
    allColumns: Array,
  },

  data() {
    return {
      columnFilters: {},

      typeFilters: {
        string: ["equals", "notEquals", "contains", "notContains", "startsWith", "endsWith", "regex"],
        date: ["dateSelect", "afterThan", "beforeThan", "dateRange"],
        number: ["equals", "notEquals", "greaterThan", "lessThan", "range"],
      },
      filterOptions: [
        { value: "equals", label: "Igual a" },
        //{ value: "notEquals", label: "Diferente de" },
        //{ value: "contains", label: "Contém" },
        //{ value: "notContains", label: "Não contém" },
        //{ value: "startsWith", label: "Começa com" },
        //{ value: "endsWith", label: "Termina com" },
        { value: "regex", label: "Expressão regular" },
        { value: "greaterThan", label: "Maior que" },
        { value: "lessThan", label: "Menor que" },
        { value: "basket", label: "Basket" },
        //{ value: "range", label: "Faixa de valores" },
        // {
        //   value: "dateSelect",
        //   label: "Data igual",
        //   config: {
        //     type: "datepicker",
        //     options: {
        //       mode: "single",
        //       format: "dd/MM/yyyy",
        //       placeholder: "Selecione uma data",key
        //       inputFormat: "dd/MM/yyyy",
        //       locale: "pt-BR",
        //     },
        //   },
        // },
        // {
        //   value: "afterThan",
        //   label: "Depois de",
        //   config: {
        //     type: "datepicker",
        //     options: {
        //       mode: "single",
        //       format: "dd/MM/yyyy",
        //       placeholder: "Selecione uma data",
        //       inputFormat: "dd/MM/yyyy",
        //       locale: "pt-BR",
        //     },
        //   },
        // },
        // {
        //   value: "beforeThan",
        //   label: "Antes de",
        //   config: {
        //     type: "datepicker",
        //     options: {
        //       mode: "single",
        //       format: "dd/MM/yyyy",
        //       placeholder: "Selecione uma data",
        //       inputFormat: "dd/MM/yyyy",
        //       locale: "pt-BR",
        //     },
        //   },
        // },
        // {
        //   value: "dateRange",
        //   label: "Intervalo de datas",
        //   config: {
        //     type: "datepicker-range",
        //     options: {
        //       mode: "range",
        //       format: "dd/MM/yyyy",
        //       placeholder: ["Data inicial", "Data final"],
        //       inputFormat: "dd/MM/yyyy",
        //       locale: "pt-BR",
        //     },
        //   },
        // },
      ],
      datePickerValue: [],
    };
  },
  mounted() {
    console.log("sdosdosd", this.allColumns);
    this.setFilterColumns();
  },
  methods: {
    onListChanged(column, { fromList, toList }) {
      this.columnFilters[column[0]].value = toList.join(",");
      console.log("Column:", column);
      console.log("From list:", fromList);
      console.log("To list:", toList);
    },
    setFilterColumns() {
      this.columnFilters = this.allColumns?.reduce((filters, column) => {
        console.log("column", column);
        filters[column.value] = {
          idx: column.index,
          value: "",
          text: "",
          number: null,
          regex: "",
          date: null,
        };
        if (column.type === "number" && column.filter?.filterOptions?.range) {
          filters[column.value].value = "";
          filters[column.value].rangeMin = column.filter.filterOptions.range.min;
          filters[column.value].rangeMax = column.filter.filterOptions.range.max;
        }

        if (column.type === "basket" && column?.filterOptions) {
          filters[column.value].type = "includes";
          filters[column.value].value = "";
          filters[column.value].title = "Corretoras";
          filters[column.value].description = "Gerencie seu basket aqui.";
          filters[column.value].fromListLabel = "Disponível";
          filters[column.value].toListLabel = "Selecionado";
          filters[column.value].initialFromList = column.filterOptions.initialFromList;
          filters[column.value].initialToList = [];
        }
        return filters;
      }, {});
    },
    toggleColumn(column) {
      this.$emit("column-toggled", column);
    },
    openModal() {
      this.setFilterColumns();
      this.$refs.modal.open();
    },
    onSubmit() {
      const filters = {};
      for (const column of this.allColumns) {
        const filter = this.columnFilters[column.value];
        if (filter?.value) {
          filters[column.value] = filter;
        }
      }
      const queryOpts = [];
      for (var key of Object.keys(filters)) {
        console.log("aoba", filters[key]);
        queryOpts.push({
          queryName: filters[key].query,
          queryIdx: filters[key].idx,
          queryType: filters[key].type,
          queryValue: filters[key].value,
        });
      }

      this.$emit("filter-by-column-values", queryOpts);
      console.log("thios2", this.$refs, "sd", this.$refs.modal);
      //this.$refs.modal.submit();
    },
    onClose() {
      this.columnFilters = {};
    },

    updateFilterOption(column, option) {
      if (option === "range") {
        this.$set(this.columnFilters, column, { value: option, range: "", rangeMin: 0, rangeMax: 100 });
      } else if (option === "dateRange") {
        this.$set(this.columnFilters, column, { value: option, dateRange: [] });
      } else {
        this.$set(this.columnFilters, column, { value: option, text: "" });
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  watch: {
    allColumns(newV, oldV) {
      console.log("[FilterModal] allColumns", this.allColumns);
      this.setFilterColumns();
    },
  },
};
</script>
