<template>
  <HxcMenu>
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
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div>
        <div class="overflow-y-scroll h-full">
          <table class="mx-auto overflow-x-visible h-full max-w-full w-full">
            <thead class="bg-[#74747429] sticky top-0">
              <tr class="text-center">
                <th class="px-4 py-1">ATIVO</th>
                <th class="px-4 py-1">ULT</th>
                <th class="px-4 py-1">VAR</th>
                <th class="px-4 py-1">PROJ/MÉDIA</th>
                <th class="px-4 py-1">VOL PROJETADO</th>
              </tr>
            </thead>
            <tbody class="">
              <tr class="text-center" v-for="i in 11" :key="i">
                <td class="px-4 py-1">VALE3</td>
                <td class="px-4 py-1">80.51</td>
                <td class="px-4 py-1">1.44%</td>
                <td class="px-4 py-1">0.83</td>
                <td class="px-4 py-1">1.389.621.540</td>
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
export default {
  components: {
    HxcMenu,
  },
  data() {
    return {
      components: [
        {
          name: "Avat",
          columns: [
            { label: "Ativo" },
            { label: "Ult" },
            { label: "VAR" },
            { label: "PROJ/MÉDIA" },
            { label: "VOL PROJETADO" },
          ],
        },
        { name: "Iceberg" },
        { name: "Players" },
        { name: "Amplitude" },
        { name: "Distortions" },
        { name: "Arbitragem" },
      ],
    };
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
</style>
