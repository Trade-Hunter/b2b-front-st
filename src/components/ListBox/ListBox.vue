<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center">
      <h2 class="text-2xl font-bold mb-2">Available Items</h2>
      <select
        class="w-64 h-64 border-gray-400 border-2 rounded-md p-2"
        size="8"
        v-model="selectedFrom"
        @dblclick="moveItem(fromList, selectedFrom, toList)"
      >
        <option v-for="item in fromList" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>
    <div class="flex flex-col items-center mx-4">
      <button class="my-4" @click="moveItem(fromList, selectedFrom, toList)">&gt;</button>
      <button class="my-4" @click="moveItem(toList, selectedTo, fromList)">&lt;</button>
    </div>
    <div class="flex flex-col items-center">
      <h2 class="text-2xl font-bold mb-2">Selected Items</h2>
      <select
        class="w-64 h-64 border-gray-400 border-2 rounded-md p-2"
        size="8"
        v-model="selectedTo"
        @dblclick="moveItem(toList, selectedTo, fromList)"
      >
        <option v-for="item in toList" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromList: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      toList: [],
      selectedFrom: "",
      selectedTo: "",
    };
  },
  methods: {
    moveItem(fromList, selectedItem, toList) {
      const index = fromList.indexOf(selectedItem);
      if (index !== -1) {
        fromList.splice(index, 1);
        toList.push(selectedItem);
      }
    },
  },
};
</script>

<style>
select:focus {
  outline: none;
  box-shadow: none;
}
</style>
