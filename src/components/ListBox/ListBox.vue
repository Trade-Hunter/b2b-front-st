<template>
  <!-- <div class="h-screen w-screen"> -->
  <!-- <div class="items-center justify-center flex flex-col"> -->
  <div class="flex flex-col justify-center">
    <!-- <div class="mb-1">
        <h3 class="text-base font-semibold leading-6 text-gray-900">{{ title }}</h3>
        <p class="mt-1 text-sm text-gray-500">{{ description }}</p>
      </div> -->
    <div class="flex">
      <div class="flex flex-col">
        <h2 class="text-center mb-1 font-medium">{{ fromListLabel }}</h2>
        <select
          class="w-56 h-52 border-gray-400 bg-transparent text-gray-900 border focus:border-blue-500 rounded-md p-2"
          size="8"
          v-model="selectedFrom"
          @dblclick="moveItem(fromList, selectedFrom, toList)"
        >
          <option v-for="item in fromList" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="h-52 flex flex-col items-end place-self-end justify-center">
        <button class="my-2 h-8 w-8" @click="moveItem(fromList, selectedFrom, toList)">&gt;</button>
        <button class="my-2 h-8 w-8" @click="moveItem(toList, selectedTo, fromList)">&lt;</button>
        <button class="my-2 h-8 w-8" @click="moveAll(fromList, toList)">&gt;&gt;</button>
        <button class="my-2 h-8 w-8" @click="moveAll(toList, fromList)">&lt;&lt;</button>
      </div>
      <div class="flex flex-col">
        <h2 class="text-center mb-1 font-medium">{{ toListLabel }}</h2>
        <select
          class="w-56 h-52 border-gray-400 bg-transparent text-gray-900 border focus:border-blue-500 rounded-md p-2"
          size="8"
          v-model="selectedTo"
          @dblclick="moveItem(toList, selectedTo, fromList)"
        >
          <option v-for="item in toList" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
    </div>
  </div>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    fromListLabel: String,
    toListLabel: String,
    initialFromList: Array,
    initialToList: Array,
    column: String,
  },
  data() {
    return {
      fromList: this.initialFromList || [],
      toList: this.initialToList || [],
      selectedFrom: "",
      selectedTo: "",
    };
  },
  mounted() {
    this.fromList = this.initialFromList;
  },
  methods: {
    moveItem(fromList, selectedItem, toList) {
      const index = fromList.indexOf(selectedItem);
      if (index !== -1) {
        fromList.splice(index, 1);
        toList.push(selectedItem);
        this.$emit("list-changed", this.column, { fromList: this.fromList, toList: this.toList });
      }
    },
    moveAll(fromList, toList) {
      toList.push(...fromList);
      fromList.splice(0, fromList.length);
      this.$emit("list-changed", this.column, { fromList: this.fromList, toList: this.toList });
    },
  },
};
</script>
<style scoped>
select:focus {
  outline: none;
  box-shadow: none;
}
button {
  margin: 0.5rem;
  border: 1px solid #e2e8f0;
  background-color: #edf2f7;
  border-radius: 0.375rem;

  font-weight: bold;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;
}
button:hover {
  background-color: #e2e8f0;
}
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.flex-1 {
  flex: 1;
}
</style>
