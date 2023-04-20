<template>
  <div class="h-screen w-screen">
    <div class="m-auto h-full items-center justify-center flex">
      <div class="flex flex-col justify-center">
        <div class="mb-1">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Corretoras</h3>
          <p class="mt-1 text-sm text-gray-500">Gerencie seu basket aqui.</p>
        </div>
        <div class="flex">
          <div class="flex flex-col">
            <h2 class="text-center mb-1 font-medium">Disponível</h2>
            <select
              class="w-64 h-64 border-gray-400 border focus:border-blue-500 rounded-md p-2"
              size="8"
              v-model="selectedFrom"
              @dblclick="moveItem(fromList, selectedFrom, toList)"
            >
              <option v-for="item in fromList" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="flex h-64 flex-col mx-4 justify-center align-middle my-auto">
            <button class="my-4" @click="moveItem(fromList, selectedFrom, toList)">&gt;</button>
            <button class="my-4" @click="moveItem(toList, selectedTo, fromList)">&lt;</button>
            <button class="my-4" @click="moveAll(fromList, toList)">&gt;&gt;</button>
            <button class="my-4" @click="moveAll(toList, fromList)">&lt;&lt;</button>
          </div>
          <div class="flex flex-col">
            <h2 class="text-center mb-1 font-medium">Selecionado</h2>
            <select
              class="w-64 h-64 border-gray-400 border focus:border-blue-500 rounded-md p-2"
              size="8"
              v-model="selectedTo"
              @dblclick="moveItem(toList, selectedTo, fromList)"
            >
              <option v-for="item in toList" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromList: ["XP", "CLEAR", "GOLDMAN", "ORAMA", "UBS"],
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
    moveAll(fromList, toList) {
      toList.push(...fromList);
      fromList.splice(0, fromList.length);
    },
  },
};
</script>

<style>
select:focus {
  outline: none;
  box-shadow: none;
}
button {
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.5rem;
  border: 1px solid #e2e8f0;
  background-color: #edf2f7;
  border-radius: 0.375rem;
  font-size: 1.25rem;
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
