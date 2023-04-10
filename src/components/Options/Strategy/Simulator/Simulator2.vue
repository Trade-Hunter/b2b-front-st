<template>
  <HxcMenu>
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
    <base-modal v-if="modalActive" @close="toggleModal" :submit="SubmitFilter" scrollable title="Filtrar dados">
      <div class="flex flex-row w-full">
        <div id="search_params" class="w-1/4 mr-4 font-mono">
          <div class="subheader mb-2">Parâmetros da Estratégia</div>
          <div class="spacer"></div>
          <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 flex flex-row">
            <div class="w-2/5"><label for="query">Vencimento</label></div>
            <div class="grow w-3/5 bg-dark-1">
              <select v-model="option.dtVen" @change="changeEquity()" class="bg-transparent w-full text-center">
                <option v-for="item in dates" :value="item" :key="item._id" class="bg-transparent dark:bg-dark-1">
                  {{ new Date(item).toLocaleDateString("pt-BR") }}
                </option>
              </select>
            </div>
          </div>
          <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 flex flex-row">
            <div class="w-2/5"><label for="query">Tipo</label></div>
            <div class="grow w-3/5 bg-dark-1">
              <select v-model="serieType" @change="changeEquity()" class="bg-transparent w-full text-center">
                <option v-for="item in optionTypes" :value="item" :key="item._id" class="bg-transparent dark:bg-dark-1">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 flex flex-row">
            <div class="w-2/5"><label for="query">Strike</label></div>
            <div class="grow w-3/5 bg-dark-1">
              <select v-model="serie" @change="changeEquity()" class="bg-transparent w-full text-center">
                <option
                  v-for="item in filteredSeries"
                  :value="item"
                  :key="item._id"
                  class="bg-transparent dark:bg-dark-1"
                >
                  {{ item.ExrcPric }}
                </option>
              </select>
            </div>
          </div>
          <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 flex flex-row">
            <div class="w-2/5"><label for="query">Série</label></div>
            <div class="grow w-3/5 bg-dark-1">
              <select v-model="serie" @change="changeEquity()" class="bg-transparent w-full text-center">
                <option
                  v-for="item in filteredSeries"
                  :value="item"
                  :key="item._id"
                  class="bg-transparent dark:bg-dark-1"
                >
                  {{ item.symbol }}
                </option>
              </select>
            </div>
          </div>

          <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 flex flex-row">
            <div class="w-2/5"><label for="query">Lado</label></div>
            <div class="grow w-3/5 bg-dark-1">
              <select v-model="option.side" @change="changeEquity()" class="bg-transparent w-full text-center">
                <option v-for="item in optionSides" :value="item" :key="item._id" class="bg-transparent dark:bg-dark-1">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 flex flex-row">
            <div class="w-2/5"><label for="query">Quantidade</label></div>
            <div class="grow w-3/5 bg-dark-1">
              <input v-model="option.qty" class="bg-transparent w-full text-center" />
            </div>
          </div>

          <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-4 flex flex-row">
            <div class="w-2/5"><label for="query">Cotação</label></div>
            <div class="grow w-3/5 bg-dark-1 flex flex-row">
              <div class="grow">
                <select v-model="quoteType" class="bg-transparent text-center w-full">
                  <option v-for="item in quoteTypes" :value="item" :key="item" class="bg-transparent dark:bg-dark-1">
                    {{ item }}
                  </option>
                </select>
              </div>
              <div class="w-1/2" v-if="quoteType == 'Manual'">
                <input v-model="serie.close" type="number" class="bg-dark-1 w-full" id="query" placeholder="" />
              </div>
            </div>
          </div>
        </div>

        <div id="search_params" class="grow font-mono">
          <div class="subheader mb-2">Estratégias Pré Definidas</div>
          <div class="grid grid-flow-row grid-cols-4">
            <div class="px-2 w-full">
              <div class="w-full mb-2 text-black">
                <span class="text-white">Iron Condor</span>
                <div class="mt-1">
                  <div class="inline-flex bg-gray-400 px-2 rounded-lg">Neutro</div>
                  <div class="inline-flex bg-orange-400 mx-1 px-2 rounded-lg">Ganho Limitado</div>
                  <div class="inline-flex bg-green-500 mx-1 px-2 rounded-lg">Risco Limitado</div>
                </div>
              </div>

              <div class="subheader mb-2">
                <div>
                  <img src="https://marketchameleon.com/Static/BenchmarkDiagrams/IronCondor.png" />
                </div>
                <div></div>
              </div>
            </div>
            <div class="px-2 w-full">
              <div class="w-full mb-2 text-black">
                <span class="text-white">Iron Condor</span>
                <div class="mt-1">
                  <div class="inline-flex bg-gray-400 px-2 rounded-lg">Neutro</div>
                  <div class="inline-flex bg-orange-400 mx-1 px-2 rounded-lg">Ganho Limitado</div>
                  <div class="inline-flex bg-green-500 mx-1 px-2 rounded-lg">Risco Limitado</div>
                </div>
              </div>

              <div class="subheader mb-2">
                <div>
                  <img src="https://marketchameleon.com/Static/BenchmarkDiagrams/IronCondor.png" />
                </div>
                <div></div>
              </div>
            </div>
            <div class="px-2 w-full">
              <div class="w-full mb-2 text-black">
                <span class="text-white">Iron Condor</span>
                <div class="mt-1">
                  <div class="inline-flex bg-gray-400 px-2 rounded-lg">Neutro</div>
                  <div class="inline-flex bg-orange-400 mx-1 px-2 rounded-lg">Ganho Limitado</div>
                  <div class="inline-flex bg-green-500 mx-1 px-2 rounded-lg">Risco Limitado</div>
                </div>
              </div>

              <div class="subheader mb-2">
                <div>
                  <img src="https://marketchameleon.com/Static/BenchmarkDiagrams/IronCondor.png" />
                </div>
                <div></div>
              </div>
            </div>
            <div class="px-2 w-full">
              <div class="w-full mb-2 text-black">
                <span class="text-white">Iron Condor</span>
                <div class="mt-1">
                  <div class="inline-flex bg-gray-400 px-2 rounded-lg">Neutro</div>
                  <div class="inline-flex bg-orange-400 mx-1 px-2 rounded-lg">Ganho Limitado</div>
                  <div class="inline-flex bg-green-500 mx-1 px-2 rounded-lg">Risco Limitado</div>
                </div>
              </div>

              <div class="subheader mb-2">
                <div>
                  <img src="https://marketchameleon.com/Static/BenchmarkDiagrams/IronCondor.png" />
                </div>
                <div></div>
              </div>
            </div>
            <div class="px-2 w-full">
              <div class="w-full mb-2 text-black">
                <span class="text-white">Iron Condor</span>
                <div class="mt-1">
                  <div class="inline-flex bg-gray-400 px-2 rounded-lg">Neutro</div>
                  <div class="inline-flex bg-orange-400 mx-1 px-2 rounded-lg">Ganho Limitado</div>
                  <div class="inline-flex bg-green-500 mx-1 px-2 rounded-lg">Risco Limitado</div>
                </div>
              </div>

              <div class="subheader mb-2">
                <div>
                  <img src="https://marketchameleon.com/Static/BenchmarkDiagrams/IronCondor.png" />
                </div>
                <div></div>
              </div>
            </div>
            <div class="px-2 w-full">
              <div class="w-full mb-2 text-black">
                <span class="text-white">Iron Condor</span>
                <div class="mt-1">
                  <div class="inline-flex bg-gray-400 px-2 rounded-lg">Neutro</div>
                  <div class="inline-flex bg-orange-400 mx-1 px-2 rounded-lg">Ganho Limitado</div>
                  <div class="inline-flex bg-green-500 mx-1 px-2 rounded-lg">Risco Limitado</div>
                </div>
              </div>

              <div class="subheader mb-2">
                <div>
                  <img src="https://marketchameleon.com/Static/BenchmarkDiagrams/IronCondor.png" />
                </div>
                <div></div>
              </div>
            </div>
            <div class="px-2 w-full">
              <div class="w-full mb-2 text-black">
                <span class="text-white">Iron Condor</span>
                <div class="mt-1">
                  <div class="inline-flex bg-gray-400 px-2 rounded-lg">Neutro</div>
                  <div class="inline-flex bg-orange-400 mx-1 px-2 rounded-lg">Ganho Limitado</div>
                  <div class="inline-flex bg-green-500 mx-1 px-2 rounded-lg">Risco Limitado</div>
                </div>
              </div>

              <div class="subheader mb-2">
                <div>
                  <img src="https://marketchameleon.com/Static/BenchmarkDiagrams/IronCondor.png" />
                </div>
                <div></div>
              </div>
            </div>
            <div class="px-2 w-full">
              <div class="w-full mb-2 text-black">
                <span class="text-white">Iron Condor</span>
                <div class="mt-1">
                  <div class="inline-flex bg-gray-400 px-2 rounded-lg">Neutro</div>
                  <div class="inline-flex bg-orange-400 mx-1 px-2 rounded-lg">Ganho Limitado</div>
                  <div class="inline-flex bg-green-500 mx-1 px-2 rounded-lg">Risco Limitado</div>
                </div>
              </div>

              <div class="subheader mb-2">
                <div>
                  <img src="https://marketchameleon.com/Static/BenchmarkDiagrams/IronCondor.png" />
                </div>
                <div></div>
              </div>
            </div>

            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      <hr class="my-4 border-gray-200" />
      <template v-slot:footer>
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <hxc-btn @click="SubmitFilter" text="Confirmar"> </hxc-btn>
        </span>
      </template>
    </base-modal>

    <div class="flex h-full px-1 flex-col">
      <div class="flex mt-1 h-8 z-20 py-1 flex-row mb-2">
        <div class="bg-blue-500 flex h-full my-auto text-center rounded-sm md:mr-1">
          <span class="font-mono my-auto px-2">Ativo</span>
          <select v-model="equity" @change="changeEquity()" class="w-24 h-full px-2 dark:bg-dark-1 rounded-r-sm">
            <option v-for="item in equities" :value="item" :key="item" class="bg-transparent dark:bg-dark-1">
              {{ item }}
            </option>
          </select>
        </div>

        <div class="bg-blue-500 flex h-full my-auto text-center rounded-sm md:mr-1">
          <span class="font-mono my-auto px-2">Cotação</span>
          <select v-model="quoteType" class="w-26 h-full px-2 dark:bg-dark-1 rounded-r-sm">
            <option v-for="item in quoteTypes" :value="item" :key="item" class="bg-transparent dark:bg-dark-1">
              {{ item }}
            </option>
          </select>
          <div class="inline-flex h-full border border-1 border-dark-1 w-16" v-if="quoteType == 'Manual'">
            <input
              v-model="equityObj.close"
              type="number"
              class="bg-dark-1 text-white h-full border-none px-2 text-center w-full rounded-r-sm"
              placeholder="0"
            />
          </div>
        </div>

        <div class="bg-blue-500 flex h-full my-auto text-center rounded-sm md:mr-1">
          <span class="font-mono my-auto px-2">Vencimento</span>
          <select v-model="option.dtVen" @change="changeEquity()" class="w-32 h-full px-2 dark:bg-dark-1 rounded-r-sm">
            <option v-for="item in dates" :value="item" :key="item._id" class="bg-transparent dark:bg-dark-1">
              {{ new Date(item).toLocaleDateString("pt-BR") }}
            </option>

            <option v-for="item in maturityDates" :value="dates[0]" :key="item" class="bg-transparent dark:bg-dark-1">
              {{ new Date(dates[0]).toLocaleDateString("pt-BR") }}
            </option>
          </select>
        </div>

        <div class="bg-blue-500 flex h-full my-auto text-center rounded-sm md:mr-1">
          <span class="font-mono my-auto px-2">Strike</span>
          <div class="w-40 h-full dark:bg-dark-1 rounded-r-sm">
            <Slider v-model:value="valueSlider" :step="-1" :format="{ decimals: 2 }" :min="minGrade" :max="maxGrade" />
          </div>
        </div>

        <div class="bg-blue-500 flex grow h-full my-auto text-center rounded-sm md:mr-8">
          <span class="font-mono my-auto px-2">Nome:</span>
          <input
            v-model="strategyObj.name"
            @change="changeEquity()"
            class="px-2 my-auto h-full grow dark:bg-dark-1 rounded-r-sm"
          />
        </div>

        <div class="bg-blue-500 h-full my-auto flex flex-row rounded-sm md:mr-1">
          <div v-tooltip:left.tooltip="'Salvar'" class="m-auto flex cursor-pointer px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
          </div>
          <div v-tooltip:left.tooltip="'Abrir'" class="m-auto flex cursor-pointer px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <div v-tooltip:left.tooltip="'Nova'" class="m-auto flex cursor-pointer px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div v-tooltip:left.tooltip="'Compartilhar'" class="m-auto flex cursor-pointer px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </div>
        </div>
        <div class="bg-blue-500 ml-auto h-full font-mono flex-container rounded-sm px-2">
          <span class="uppercase cursor-pointer" @click="toggleModal()"> MONTAR ESTRATÉGIA </span>
        </div>
        <div class="ml-1 bg-blue-500 dropdown relative h-full my-auto text-center rounded-sm md:mr-1">
          <Export :options="exportOpts" />
        </div>
        <div
          class="h-full my-auto px-1 mb-3 cursor-pointer text-blue-500 dark:text-white"
          v-tooltip:left.tooltip="'Entenda a dinâmica dessa tela.'"
          @click="toggleInfo"
        >
          <InformationCircle class="hover:scale-125" />
        </div>
      </div>

      <div class="h-full overflow-auto flex flex-row gap-x-1 shadow-sm shadow-blue-900 drop-shadow-md">
        <div class="no-scrollbar h-full flex flex-col w-1/2">
          <HxcTableGrade
            :loading="loading"
            :intersected="intersected"
            :data="gradeFiltered"
            :paging="paging"
            :columns="columnsGrade"
            :gradeCh="clickCh"
            :defaultSort="{ col: 'ExrcPric', dir: -1 }"
          >
          </HxcTableGrade>
        </div>
        <div class="w-1/2">
          <hxc-table
            ref="TableStrategy"
            :changeField="changeField"
            :data="operations"
            :columns="columns"
            :toggleModal="toggleModal"
            :availableOpts="series"
            :footer="true"
            :getResults="getResults"
            :equity="equity"
          >
          </hxc-table>
        </div>
      </div>

      <div
        class="font-mono dark:bg-dark-2 text-white rounded-md mt-1 mb-1 flex flex-row shadow-lg shadow-blue-900 drop-shadow-md"
      >
        <div class="dark:bg-dark-2 h-full w-2/5">
          <TVChartContainer class="h-full" />
        </div>
        <div class="bg-dark-1 h-full rounded-md w-2/5" id="chart"></div>
        <div class="bg-dark-1 h-full w-1/5">
          <div id="search_params" class="font-mono bg-dark-1 text-white m-2 mr-0 rounded-md">
            <div class="subheader">Legendas</div>

            <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 mt-2 flex flex-row">
              <div class="w-2/4 md:1/4 whitespace-nowrap">
                <label for="query">Payoff </label>
              </div>
              <div class="w-full bg-white dark:bg-dark-1 text-end px-2 text-black dark:text-white">
                R$ {{ legend_values[0]?.toFixed(2) }}
              </div>
            </div>
            <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 mt-2 flex flex-row">
              <div class="w-2/4 md:1/4 whitespace-nowrap">Delta Δ</div>
              <div class="w-full bg-white dark:bg-dark-1 text-end px-2 text-black dark:text-white">
                {{ legend_values[1]?.toFixed(2) }}
              </div>
            </div>
            <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 mt-2 flex flex-row">
              <div class="w-2/4 md:1/4">
                <label for="query">Gamma Γ </label>
              </div>
              <div class="w-full bg-white dark:bg-dark-1 text-end px-2 text-black dark:text-white">
                {{ legend_values[2]?.toFixed(2) }}
              </div>
            </div>
            <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 mt-2 flex flex-row">
              <div class="w-2/4 md:1/4">
                <label for="query">Vega (ν) </label>
              </div>
              <div class="w-full bg-white dark:bg-dark-1 text-end px-2 text-black dark:text-white">
                {{ legend_values[3]?.toFixed(2) }}
              </div>
            </div>
            <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 mt-2 flex flex-row">
              <div class="w-2/4 md:1/4">
                <label for="query">Rho Ρ </label>
              </div>
              <div class="w-full bg-white dark:bg-dark-1 text-end px-2 text-black dark:text-white">
                {{ legend_values[4]?.toFixed(2) }}
              </div>
            </div>
            <div>
              <div class="mb-2">Resultados da Simulação</div>

              <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 flex flex-row">
                <div class="w-5/6 whitespace-nowrap">
                  <label for="query">Custo </label>
                </div>
                <p type="text" class="w-full bg-white dark:bg-dark-1 text-end px-2 text-black dark:text-white">
                  R$ {{ summary.breakEven?.toFixed(2) }}
                </p>
              </div>
              <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 flex flex-row">
                <div class="w-5/6 whitespace-nowrap">
                  <label for="query">Lucro Máx.</label>
                </div>
                <p type="text" class="w-full bg-white dark:bg-dark-1 text-end px-2 text-black dark:text-white">
                  R$ {{ summary.lucroMax?.toFixed(2) }}
                </p>
              </div>
              <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 flex flex-row">
                <div class="w-5/6">
                  <label for="query">Risco Máx.</label>
                </div>
                <p type="text" class="w-full bg-white dark:bg-dark-1 text-end px-2 text-black dark:text-white">
                  {{ summary.riscoMax.toFixed(2) }}
                </p>
              </div>
              <div class="text-input rounded-l-md pl-2 bg-blue-500 border border-blue-500 w-full mb-2 flex flex-row">
                <div class="w-5/6 whitespace-nowrap mr-2">Risco Ret.</div>
                <p type="text" class="w-full bg-white dark:bg-dark-1 text-end px-2 text-black dark:text-white">
                  {{ summary.riscoRetorno.toFixed(2) }}
                </p>
              </div>
              <div class="text-input rounded-l-md w-full mb-4 flex justify-between">
                <button class="bg-blue-500 px-6 rounded-md">Limpar</button>

                <button class="float-right justify-end px-6 bg-blue-500 rounded-md">Atualizar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </HxcMenu>
</template>

<script>
import Highcharts from "highcharts";
import HxcTable from "@/components/Tables/TableStrategy.vue";
import HxcTableGrade from "@/components/Tables/TableGrade.vue";
import HxcMenu from "@/components/Menu/Menu.vue";
import BaseModal from "@/components/Modal/BaseModal.vue";
import HxcBtn from "@/components/Buttons/btn.vue";
import { InformationCircle } from "@/assets/icons/heroicons";
import TVChartContainer from "@/components/TradingView/TVChartContainer.vue";
import "/public/charting_library/charting_library.js";
import axios from "axios";
import { reactive, ref, toRef, toRefs } from "vue";
import Slider from "@/components/Slider.vue";
import Export from "./Export.vue";

export default {
  components: {
    HxcTableGrade,
    HxcTable,
    HxcMenu,
    BaseModal,
    HxcBtn,
    InformationCircle,
    TVChartContainer,
    Slider,
    Export,
  },
  setup() {
    //const series = ref([]);
    //return { series };
  },
  data() {
    return {
      exportOpts: ["PNT", "FlexScan"],
      valueSlider: [0, 0],
      minGrade: 1,
      maxGrade: 10,

      infoActive: false,
      infoTopics: [
        {
          title: "Parametros da Estrategia",
          description: "x",
          subtopics: [
            {
              title: "",
              description: "",
            },
          ],
        },
        {
          title: "Parametros da Estrategia",
          description: "x",
          subtopics: [
            {
              title: "",
              description: "",
            },
          ],
        },
        {
          title: "Parametros da Estrategia",
          description: "x",
          subtopics: [
            {
              title: "",
              description: "",
            },
          ],
        },
        {
          title: "Parametros da Estrategia",
          description: "x",
          subtopics: [
            {
              title: "",
              description: "",
            },
          ],
        },
        {
          title: "Parametros da Estrategia",
          description: "x",
          subtopics: [
            {
              title: "",
              description: "",
            },
          ],
        },
      ],
      paging: { pages: 0, total: 0, page: 0, page_size: 350 },
      loading: false,
      series: [],
      columns: [
        {
          name: "Série",
          value: "symbol",
          mutable: {
            type: "input",
          },
          format: "string",
          total: { calcMode: "count", format: "int" },
        },
        {
          name: "Tipo",
          value: "type",
          // mutable: {
          //   type: "select",
          //   options: ["CALL", "PUT"],
          // },
        },
        {
          name: "Vencimento",
          value: "TradgEndDt",
          // mutable: {
          //   type: "select",
          // },
          format: "date",
        },
        {
          name: "Operação",
          value: "side",
          mutable: {
            type: "select",
            options: ["COMPRA", "VENDA"],
          },
        },
        {
          name: "Quantidade",
          value: "qty",
          mutable: {
            type: "input",
          },
          format: "int",
          total: { calcMode: "sum", format: "int" },
        },
        {
          name: "Strike",
          value: "ExrcPric",
          mutable: {
            type: "input",
          },
          format: "float",
        },
        {
          name: "Preço",
          value: "close",
          mutable: {
            type: "input",
          },
          format: "float",
        },
        {
          name: "Total",
          value: "total",
          format: "float",
          total: { calcMode: "sum", format: "int" },
        },
        {
          name: "Vol. Imp",
          value: "volImp",
          mutable: {
            type: "input",
          },
          format: "float",
          total: { calcMode: "mean", format: "float" },
        },
        { name: "Delta", value: "delta", format: "float" },
        { name: "Gamma", value: "gamma", format: "float" },
        { name: "Theta", value: "theta", format: "float" },

        { name: "Vega", value: "vega", format: "float" },
      ],

      data: [
        {
          symbol: "PETRG309",
          type: "CALL",
          TradgEndDt: "17/06/2022",
          oper: "VENDA",
          qty: 1000,
          ExrcPric: 35.59,
          close: 0.09,
          total: 920,
          volImp: 32.45,
          delta: 150,
          gamma: 0.12,
          theta: 0.31,
          theta_perc: 31.12,
          vega: 0.23,
        },
        {
          symbol: "PETRG309",
          type: "CALL",
          TradgEndDt: "17/06/2022",
          oper: "VENDA",
          qty: 1000,
          ExrcPric: 35.59,
          close: 0.09,
          total: 920,
          volImp: 32.45,
          delta: 150,
          gamma: 0.12,
          theta: 0.31,
          theta_perc: 31.12,
          vega: 0.23,
        },
      ],

      serie: {
        type: "CALL",
        qty: 1000,
        side: "COMPRA",
        dtVen: null,
        symbol: null,
      },
      columnsGrade: [
        {
          name: "Call",
          value: "c",
          progress: {
            label: "nc",
            value: "nc_pct",
            position: "left",
          },
        },
        {
          name: "Neg",
          value: "nc",
        },
        {
          name: "Bid",
          value: "bid_c",
        },
        {
          name: "Ask",
          value: "ask_c",
        },
        {
          name: "Vol.",
          value: "vol_c",
        },
        {
          name: "Gamma",
          value: "gamma_c",
        },
        {
          name: "Delta",
          value: "delta_c",
        },
        {
          name: "Strike",
          value: "ExrcPric",
        },
        {
          name: "Delta",
          value: "delta_p",
        },
        {
          name: "Gamma",
          value: "gamma_p",
        },
        {
          name: "Vol.",
          value: "vol_p",
        },
        {
          name: "Ask",
          value: "ask_p",
        },
        {
          name: "Bid",
          value: "bid_p",
        },
        {
          name: "Neg",
          value: "np",
        },
        {
          name: "Put",
          value: "p",
          progress: {
            label: "np",
            value: "np_pct",
            position: "right",
          },
        },
      ],

      dataGrade: [],
      equityObj: {},
      equities: [],
      equity: null,
      quoteType: "Automática",
      quoteTypes: ["Automática", "Manual"],
      optionTypes: ["CALL", "PUT", "ATIVO"],
      optionSides: ["COMPRA", "VENDA"],
      serieType: "CALL",
      serieSide: "COMPRA",
      legend_values: [0, 0, 0, 0, 0, 0],
      modalActive: false,
      option: {
        side: "COMPRA",
        qty: 1000,
        dtVen: null,
      },
      operations: [],
      chart: null,
      dates: [],
      summary: {
        breakEven: 0,
        caixa: 0,
        delta: 0,
        gamma: 0,
        lucroMax: 0,
        riscoMax: 0,
        rho: 0,
        riscoRetorno: 0,
        theta: 0,
        vega: 0,
      },
      maturityDates: ["18/11/2022"],
      maturityDate: null,
      strategyObj: {
        name: "Nova Estratégia 1",
      },
    };
  },
  mounted() {
    this.chart = new Highcharts.Chart({
      chart: {
        renderTo: "chart",
        type: "spline",
        zoomType: "x",
        backgroundColor: "transparent",
        height: 350,
      },
      title: {
        text: "Simulação de Estratégia PETR4",
        align: "center",
        style: { color: "#fff", fontSize: "18px" },
      },
      subtitle: {
        text: "Fonte: tradehunter.app",
        style: { color: "#fff", fontSize: "12px", margin: { top: "0" } },
      },
      xAxis: [
        {
          labels: { style: { color: "#fff" } },
          crosshair: true,
          categories: [
            24.37, 24.44, 24.51, 24.58, 24.65, 24.72, 24.79, 24.86, 24.93, 25, 25.07, 25.14, 25.21, 25.28, 25.35, 25.42,
            25.49, 25.56, 25.63, 25.7, 25.77, 25.84, 25.91, 25.98, 26.05, 26.12, 26.18, 26.25, 26.32, 26.39, 26.46,
            26.53, 26.6, 26.67, 26.74, 26.81, 26.88, 26.95, 27.02, 27.09, 27.16, 27.23, 27.3, 27.37, 27.44, 27.51,
            27.58, 27.65, 27.72, 27.79, 27.86, 27.93, 28, 28.06, 28.13, 28.2, 28.27, 28.34, 28.41, 28.48, 28.55, 28.62,
            28.69, 28.76, 28.83, 28.9, 28.97, 29.04, 29.11, 29.18, 29.25, 29.32, 29.39, 29.46, 29.53, 29.6, 29.67,
            29.74, 29.81, 29.88, 29.95, 30.01, 30.08, 30.15, 30.22, 30.29, 30.36, 30.43, 30.5, 30.57, 30.64, 30.71,
            30.78, 30.85, 30.92, 30.99, 31.06, 31.13, 31.2, 31.27, 31.34, 31.41, 31.48, 31.55, 31.62, 31.69, 31.76,
            31.83, 31.9, 31.96, 32.03, 32.1, 32.17, 32.24, 32.31, 32.38, 32.45, 32.52, 32.59, 32.66, 32.73, 32.8, 32.87,
            32.94, 33.01, 33.08, 33.15, 33.22, 33.29, 33.36, 33.43, 33.5, 33.57, 33.64, 33.71, 33.78, 33.85, 33.91,
            33.98, 34.05, 34.12, 34.19, 34.26, 34.33, 34.4, 34.47, 34.54, 34.61, 34.68, 34.75, 34.82, 34.89, 34.96,
            35.03, 35.1, 35.17, 35.24, 35.31, 35.38, 35.45, 35.52, 35.59, 35.66, 35.73, 35.79, 35.86, 35.93, 36, 36.07,
            36.14, 36.21, 36.28, 36.35, 36.42, 36.49, 36.56, 36.63, 36.7, 36.77, 36.84, 36.91, 36.98, 37.05, 37.12,
            37.19, 37.26, 37.33, 37.4, 37.47, 37.54, 37.61, 37.68, 37.74, 37.81, 37.88, 37.95, 38.02, 38.09, 38.16,
            38.23, 38.3, 38.37, 38.44, 38.51, 38.58, 38.65, 38.72, 38.79, 38.86, 38.93, 39, 39.07, 39.14, 39.21, 39.28,
            39.35, 39.42, 39.49, 39.56, 39.63, 39.69, 39.76, 39.83, 39.9, 39.97, 40.04, 40.11, 40.18, 40.25, 40.32,
            40.39, 40.46, 40.53, 40.6, 40.67, 40.74, 40.81, 40.88, 40.95, 41.02, 41.09, 41.16, 41.23, 41.3, 41.37,
            41.44, 41.51, 41.58, 41.64, 41.71, 41.78, 41.85, 41.92, 41.99, 42.06, 42.13, 42.2, 42.27, 42.34, 42.41,
            42.48, 42.55, 42.62, 42.69, 42.76, 42.83, 42.9, 42.97, 43.04, 43.11, 43.18, 43.25, 43.32, 43.39, 43.46,
            43.53, 43.59, 43.66, 43.73, 43.8, 43.87, 43.94, 44.01, 44.08, 44.15, 44.22, 44.29, 44.36, 44.43, 44.5,
            44.57, 44.64, 44.71, 44.78, 44.85, 44.92, 44.99, 45.06, 45.13, 45.2,
          ],
        },
      ],
      yAxis: [
        {
          tickPixelInterval: 50,
          gridLineColor: "gray",
          labels: { style: { color: "#fff" } },
        },
      ],

      //colors: ['#E91E63', '#C21858', '#9C27B0', '#57dcbe', '#272AB0', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
      //colors: ['#6495ED', '#FFBF00', '#FF7F50', '#DE3163', '#272AB0', '#40E0D0', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
      colors: [
        "#6495ED",
        "#FFBF00",
        "#FF7F50",
        "#DE3163",
        "#CCCCFF",
        "#40E0D0",
        "#f28f43",
        "#77a1e5",
        "#c42525",
        "#a6c96a",
      ],
      series: [
        {
          name: "Payoff",
          data: [
            -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720,
            -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720,
            -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720,
            -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720,
            -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720,
            -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720,
            -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720,
            -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720,
            -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720, -720,
            -650.0000000000068, -580.0000000000066, -520.0000000000043, -450.0000000000041, -380.00000000000364,
            -310.0000000000034, -240.00000000000318, -170.00000000000273, -100.0000000000025, -30.000000000002274,
            39.999999999997954, 109.9999999999983, 179.99999999999864, 249.99999999999886, 319.9999999999991,
            389.99999999999955, 459.9999999999998, 530, 599.9999999999932, 669.9999999999934, 739.9999999999936, 780,
            780, 780, 780.0000000000001, 780, 780, 780, 779.9999999999999, 780, 780, 780.0000000000002, 780,
            780.0000000000001, 779.9999999999998, 780, 780, 780.0000000000002, 780, 780, 780.0000000000002, 780, 780,
            779.9999999999998, 780, 780.0000000000002, 780, 780, 779.9999999999998, 780, 780, 780, 780, 780, 780, 780,
            780, 780, 780, 780, 779.9999999999995, 780.0000000000005, 780, 779.9999999999995, 780.0000000000005, 780,
            780, 780.0000000000005, 780, 780, 780.0000000000005, 780, 780, 779.9999999999995, 780, 780,
            779.9999999999995, 780.0000000000005, 780, 779.9999999999995, 780, 780, 780, 780, 780, 780, 780, 780, 780,
            780, 780, 780, 780, 780, 780, 780, 780, 780, 780, 780, 780, 780, 780, 780, 780, 780, 780, 780, 780, 780,
            780, 780, 780, 780, 780, 780, 780, 780.0000000000009, 780.0000000000009, 780, 780, 780, 779.9999999999991,
            780.0000000000009, 780.0000000000009, 780, 780, 780, 779.9999999999991, 779.9999999999991,
            780.0000000000009, 780, 780, 780, 780, 779.9999999999991, 780.0000000000009, 780.0000000000009,
          ],
          color: "#0ce84a",
          negativeColor: "#FF0000",
        },
        {
          name: "Delta Δ",
          //color: '#FFCE30',
          data: [
            2.0830706675869504, 2.2303465769539788, 2.3862497969640573, 2.551156714778957, 2.7254518359333124,
            2.909527455862815, 3.10378329696448, 3.308626110780422, 3.5244692450118738, 3.751732175176325,
            3.990840000822893, 4.242222906352122, 4.506315586606524, 4.783556637505738, 5.0743879121460385,
            5.379253842898834, 5.698600730180803, 6.032875998690957, 6.382527422058471, 6.748002316945778,
            7.129746707823736, 7.528204463733536, 7.943816408487349, 8.377019405892971, 8.82824542171279,
            9.297920564167839, 9.715501277546112, 10.22054552695828, 10.745215274150677, 11.289904716686282,
            11.854997295667081, 12.440864653085026, 13.047865583114216, 13.676344979931642, 14.326632784731675,
            14.99904293465154, 15.693872316382418, 16.411399727283282, 17.151884846842492, 17.915567221363172,
            18.702665264758444, 19.51337527835223, 20.347870492568862, 21.20630013339175, 22.088788516434086,
            22.995434171439232, 23.92630899998466, 24.881457469093874, 25.86089584342482, 26.864611458600084,
            27.8925620381833, 28.944675056703115, 30.020847151030093, 30.962328160418885, 32.08279978575723,
            33.22686066094238, 34.39428391476102, 35.584809734689806, 36.798145101540726, 38.033963584922674,
            39.291905200782566, 40.57157633212188, 41.87254971380545, 43.19436448223924, 44.5365262904951,
            45.89850748930419, 47.279747374156685, 48.67965249857459, 50.097597053437866, 51.53292331208021,
            52.984942140676836, 54.45293357329112, 55.93614745074971, 57.43380412236482, 58.94509520934544,
            60.4691844285683, 62.005208475232884, 63.55227796275154, 65.10947841809272, 66.6758713306302,
            68.25049525243394, 69.60597936630725, 71.19326522164232, 72.7859191505315, 74.38290240854583,
            75.98315931419043, 77.58561860222385, 79.18919481097659, 80.7927897007511, 82.39529370031906,
            83.99558737845891, 85.59254293743761, 87.18502572528536, 88.77189576369025, 90.35200928829866,
            91.92422029821256, 93.48738211144325, 95.04034892310746, 96.58197736314966, 98.11112805038834,
            99.62666713973596, 101.12746785945626, 102.61241203537497, 104.08039159902145, 105.53031007672703,
            106.96108405678561, 108.37164463184834, 109.76093881380902, 111.12793091853399, 112.28111634612932,
            113.60400717430653, 114.90174409037138, 116.17337049526898, 117.4179533107231, 118.63458413932136,
            119.82238037905788, 120.98048629055413, 122.10807401530036, 123.20434454340202, 124.26852862943221,
            125.29988765514145, 126.2977144378977, 127.26133398386912, 128.19010418510982, 129.08341645980997,
            129.94069633516523, 130.76140397238908, 131.54503463356787, 132.2911190901895, 132.999223973276,
            133.6689520652103, 134.29994253345313, 134.89187110648066, 135.44445019237332, 135.9574289406351,
            136.43059324788953, 136.86376570825274, 137.20311841718336, 137.5616743450242, 137.87993261346486,
            138.15785591667748, 138.3954426499463, 138.59272655678086, 138.74977632860833, 138.86669515851372,
            138.94362025057376, 138.98072228638364, 138.97820485043007, 138.93630381603725, 138.85528669361662,
            138.73545194304427, 138.57712825197694, 138.38067378198525, 138.14647538438135, 137.8749477876591,
            137.5665327584715, 137.2216982380777, 136.8409374562022, 136.42476802425443, 135.9737310098489,
            135.48838999455563, 134.96933011680682, 134.4171571018727, 133.83249628077613, 133.3059884320594,
            132.66271492514187, 131.98883944030035, 131.28505359655924, 130.55206375603223, 129.7905900146044,
            129.001365193712, 128.18513383485072, 127.34265119836141, 126.47468226804415, 125.58200076306434,
            124.66538815856529, 123.72563271637341, 122.76352852710431, 121.77987456491576, 120.77547375612721,
            119.75113206283834, 118.70765758262223, 117.6458596653381, 116.56654804800462, 115.4705320086598,
            114.3586195400286, 113.23161654380465, 112.09032604625179, 110.93554743580569, 109.76807572326538,
            108.58870082513738, 107.39820687061035, 106.3695232978148, 105.16043751538132, 103.94243528988147,
            102.71627238100871, 101.48269574354663, 100.24244297968085, 98.99624181682077, 97.74480961101631,
            96.48885287597784, 95.22906683769577, 93.96613501457739, 92.70072882301292, 91.43350720820308,
            90.16511630007756, 88.89618909406909, 87.62734515648526, 86.35919035418613, 85.09231660823843,
            83.82730167118632, 82.56470892756136, 81.3050872172081, 80.04897068099524, 78.79687862844787,
            77.5493154268155, 76.30677041107958, 75.06971781437187, 73.83861671826492, 72.61391102239315,
            71.56957887754095, 70.35787622440364, 69.15375357172422, 67.95759631103101, 66.76977476043135,
            65.59064423568441, 64.42054513653852, 63.25980304768848, 62.10872885375204, 60.96761886763488,
            59.83675497166348, 58.71640477087908, 57.60682175785405, 56.508245488441844, 55.42090176783233,
            54.34500284632304, 53.280747624203855, 52.2283218651653, 51.187898417652605, 50.15963744359408,
            49.14368665393283, 48.140181550419925, 47.149245673122095, 46.170990853107696, 45.20551746980584,
            44.25291471251853, 43.313260845596346, 42.38662347680145, 41.60276659583826, 40.70044686505412,
            39.811280504859496, 38.935296576665905, 38.072514819273806, 37.222945926937655, 36.38659182769527,
            35.56344596157487, 34.753493558341916, 33.956711914435004, 33.173070668762534, 32.402532077058595,
            31.64505128448843, 30.90057659623028, 30.16904974575914, 29.450406160580087, 28.74457522517207,
            28.051480540911484, 27.371040182766023, 26.703166952560764, 26.0477686286182, 25.40474821161797,
            24.774004166497207, 24.155430660252478, 23.54891779550212, 22.954351839690162, 22.371615449809383,
            21.800587892548947, 21.320361132547077, 20.77074756183356, 20.232481092761873, 19.705429890915866,
            19.189459733086437, 18.684434199098177, 18.190214858629247, 17.706661453003903, 17.23363207193063,
            16.7709833251879, 16.318570509243273, 15.87624776881978, 15.443868253416099, 15.02128426880256,
            14.608347423510054, 14.204908770356155, 13.810818943025652, 13.42592828776742, 13.050086990233694,
            12.68314519752937, 12.324953135514875, 11.975361221431967, 11.634220171903166, 11.301381106385634,
          ],
        },
        {
          name: "Gamma Γ",
          //color: '#FF5733',
          data: [
            2.0440803831412864, 2.1646789330243, 2.2905950115588776, 2.421946779290547, 2.5588479482747504,
            2.70140729298617, 2.8497281547628015, 3.003907941237641, 3.1640376222786553, 3.3302012240229146,
            3.502475322648149, 3.6809285395792717, 3.865621039873969, 4.056604035572792, 4.253919295832905,
            4.457598665692782, 4.667663595333854, 4.884124681719509, 5.106981224494287, 5.336220798025488,
            5.571818841456815, 5.81373826862472, 6.061929099661764, 6.316328116074406, 6.576858541040614,
            6.8434297466198055, 7.076648309534464, 7.35414934580088, 7.637353671606708, 7.926115032759343,
            8.220272335504319, 8.51964954174509, 8.824055600785535, 9.133284418622761, 9.447114865705892,
            9.765310823956119, 10.087621273721375, 10.413780421211404, 10.743507866825743, 11.076508814655245,
            11.412474323298538, 11.751081597996693, 12.091994323947404, 12.434863040520314, 12.779325555951443,
            13.125007401952956, 13.471522327536485, 13.818472831204883, 14.165450730534298, 14.512037768030945,
            14.857806252018547, 15.202319731182229, 15.545133701275061, 15.837279271338303, 16.175733318351803,
            16.51118016619244, 16.84315140488017, 17.171174405667717, 17.49477318024407, 17.81346925897413,
            18.12678258591803, 18.434232428310384, 18.735338298119235, 19.02962088326115, 19.316602986004945,
            19.59581046606698, 19.866773185879236, 20.12902595549724, 20.38210947460908, 20.625571269114616,
            20.85896661975202, 21.081859480275064, 21.293823382710986, 21.49444232727023, 21.68331165452427,
            21.860038897522607, 22.02424461158278, 22.175563179557663, 22.313643590458362, 22.4381501893967,
            22.548763396901435, 22.632286703886436, 22.716307689956786, 22.785616763740805, 22.839962472695355,
            22.879112440926598, 22.902853875381872, 22.910994030902437, 22.903360633067898, 22.879802257887825,
            22.840188667526213, 22.78441110137551, 22.71238252192412, 22.624037814997713, 22.519333944081524,
            22.39825005856558, 22.2607875558799, 22.106970097620838, 21.936843579892432, 21.750476058209294,
            21.547957627437476, 21.329400257357555, 21.094937584557705, 20.844724661471872, 20.578937663488077,
            20.29777355515258, 20.001449716596255, 19.690203531401565, 19.364291937219434, 19.073475386051513,
            18.72107436976627, 18.35484532861493, 17.9751157772439, 17.58223011932496, 17.176549010265973,
            16.758448693581386, 16.328320312730455, 15.886569200266408, 15.433614146173099, 14.969886647287836,
            14.495830139730913, 14.011899216274543, 13.518558830589257, 13.016283490311466, 12.505556440866187,
            11.986868841976758, 11.460718938770412, 10.927611229374392, 10.388055630871477, 9.842566645450944,
            9.291662528560437, 8.735864460823407, 8.175695725446602, 7.611680892790503, 7.044345013732425,
            6.474212823392179, 5.90180795673767, 5.409761921639415, 4.83451867001672, 4.25848596304759,
            3.682176106349573, 3.1060967098101173, 2.530749999927039, 1.9566321526976935, 1.3842326480495188,
            0.8140336467289018, 0.24650939049291765, -0.317874373624619, -0.8786609442781952, -1.435403191383756,
            -1.9876640557525889, -2.535017022311294, -3.0770465665057714, -3.6133485735593354, -4.143530730325622,
            -4.667212889546462, -5.184027406392559, -5.693619447232251, -6.195647270637167, -6.68978248069773,
            -7.175710252781599, -7.6531295319268935, -8.121753204119855, -8.581308240759853, -8.967798083723878,
            -9.409835523765906, -9.842102805230084, -10.264382103869863, -10.676470014208377, -11.078177545629174,
            -11.469330095005631, -11.849767396513698, -12.219343449302812, -12.57792642373208, -12.925398546902287,
            -13.26165596823968, -13.586608605909532, -13.90017997485397, -14.20230699726693, -14.492939796331498,
            -14.772041474057161, -15.039587874061525, -15.295567330150476, -15.539980401551915, -15.772839595663413,
            -15.99416907917059, -16.204004378394657, -16.40239206972082, -16.58938946095465, -16.76506426444506,
            -16.929494262804397, -17.0827669680434, -17.205336479252068, -17.338152420373056, -17.460111601052105,
            -17.571335772566997, -17.671954692045787, -17.762105758725134, -17.841933648830356, -17.911589949761257,
            -17.971232794249033, -18.02102649512672, -18.061141181331344, -18.091752435735806, -18.113040935380248,
            -18.125192094652142, -18.128395711938346, -18.122845620245613, -18.108739342264414, -18.08627775032302,
            -18.055664731654083, -18.01710685937214, -17.97081306953249, -17.916994344620072, -17.855863403789826,
            -17.78763440015517, -17.712522625400446, -17.63074422196383, -17.54251590301753, -17.448054680448763,
            -17.362291565439854, -17.25683062827907, -17.145756148279702, -17.02928389296399, -16.9076287262869,
            -16.781004386380154, -16.649623272102417, -16.513696238433674, -16.373432400736725, -16.22903894788754,
            -16.08072096426342, -15.928681260559863, -15.773120213390968, -15.614235613616497, -15.452222523322064,
            -15.28727314136756, -15.11957667740581, -14.949319234261715, -14.776683698552251, -14.601849639415867,
            -14.424993215210552, -14.24628708803333, -14.065900345901841, -13.883998432433948, -13.70074308385415,
            -13.516292273148277, -13.330800161182609, -13.144417054599664, -12.98406203962525, -12.79640971182652,
            -12.608274308818562, -12.419790994358902, -12.231090963479122, -12.04230143608688, -11.85354565596219,
            -11.664942894938612, -11.476608462059964, -11.288653717504449, -11.101186091066698, -10.91430910499103,
            -10.728122400948383, -10.54272177095309, -10.35819919201532, -10.174642864329194, -9.992137252797963,
            -9.810763131700327, -9.630597632305573, -9.451714293248221, -9.274183113475829, -9.098070607588044,
            -8.923439863388563, -8.750350601475018, -8.578859236697046, -8.409018941315994, -8.240879709705169,
            -8.074488424432955, -7.933291856392813, -7.770260804477619, -7.609095107324592, -7.4498302844463975,
            -7.2924990793873885, -7.137131530996738, -6.983755045134487, -6.832394466688806, -6.683072151791462,
            -6.535808040119511, -6.39061972717897, -6.247522536469557, -6.106529591434309, -5.9676518871033695,
            -5.830898361344546, -5.696275965639422, -5.563789735306968, -5.433442859101164, -5.305236748114469,
            -5.179171103922015, -5.055243985906063, -4.93345187770456, -4.813789752731315, -4.69625113871882,
          ],
        },
        {
          name: "Vega (ν)",
          data: [
            0.7287429030593988, 0.7763637319265918, 0.8264376884717304, 0.8790451980821987, 0.93426638931668,
            0.9921808807645489, 1.0528675589013081, 1.1164043472989074, 1.182867967597556, 1.2523336926941495,
            1.3248750926495814, 1.4005637738647412, 1.479469112121047, 1.5616579801267387, 1.6471944702539312,
            1.7361396131940738, 1.828551093299585, 1.9244829614186587, 2.023985346065604, 2.12710416380375,
            2.233880829748437, 2.3443519691257793, 2.458549130848228, 2.576498504089116, 2.6982206388571432,
            2.8237301715857894, 2.934330812165041, 3.0668916370591774, 3.203246729123626, 3.3433854687730316,
            3.487290094831458, 3.634935480193743, 3.786288919541483, 3.941309930103221, 4.099950066427054,
            4.2621527501070595, 4.427853115375047, 4.596977871434877, 4.769445182377027, 4.945164565470004,
            5.124036808577923, 5.305953907404233, 5.490799023207693, 5.678446461580845, 5.868761672820687,
            6.061601274358618, 6.256813095652587, 6.45423624587482, 6.653701204660579, 6.85502993611028,
            7.058036026165214, 7.262524843401416, 7.468293723211961, 7.645526525862971, 7.853108457034026,
            8.061349090897359, 8.270016926027862, 8.478873649229822, 8.687674452076337, 8.896168368573719,
            9.104098633327157, 9.311203059513481, 9.517214435896129, 9.72186094205311, 9.924866580922458,
            10.125951627709007, 10.324833094138087, 10.52122520698642, 10.71483989976806, 10.905387316407134,
            11.092576325682499, 11.276115045191583, 11.455711373543032, 11.6310735294574, 11.801910596427184,
            11.967933071564842, 12.128853417249687, 12.2843866141713, 12.434250714357159, 12.578167392769146,
            12.71586249605443, 12.828730627335371, 12.95416051244878, 13.072613347160868, 13.183836113195706,
            13.287582543395132, 13.383613625952822, 13.471698096479514, 13.551612916646647, 13.623143738193765,
            13.686085351128199, 13.7402421149928, 13.785428372124997, 13.821468841885867, 13.848198994891277,
            13.86546540633774, 13.873126087573741, 13.871050795133627, 13.859121316514056, 13.837231732038802,
            13.8052886522307, 13.763211430172852, 13.71093234841642, 13.648396780061432, 13.575563323709517,
            13.492403912059025, 13.398903893985164, 13.2950620900193, 13.18089082121356, 13.074827532675947,
            12.941551702644354, 12.798055912615652, 12.644404343701119, 12.480674443122602, 12.306956800533541,
            12.123354999460695, 11.92998544437021, 11.726977163917851, 11.514471591000223, 11.29262232027466,
            11.061594843867006, 10.821566266033223, 10.572724997584459, 10.315270430928699, 10.049412596616776,
            9.775371802321125, 9.493378255201826, 9.203671668647686, 8.90650085440442, 8.602123301123392,
            8.290804740384445, 7.972818701262597, 7.6484460545202, 7.317974547514986, 6.981698330922939,
            6.639917478375146, 6.292937500110227, 5.9916232177452855, 5.635814764934963, 5.275705632223115,
            4.91161766866977, 4.543875748003458, 4.172807268982737, 3.798741657091334, 3.422009868571017,
            3.04294389777089, 2.661876288768383, 2.2791396521880927, 1.895066188116644, 1.5099872159796917,
            1.1242327122147486, 0.7381308565401099, 0.3520075875836852, -0.03381383140013838, -0.4190132360356529,
            -0.8032739729016782, -1.1862832995651473, -1.5677327720012357, -1.9473186188671008, -2.3247421021392114,
            -2.6997098636640686, -3.0719342572135986, -3.441133665678322, -3.80703280307209, -4.11783004859339,
            -4.47689253218519, -4.831905590069198, -5.182620899294321, -5.528797710856303, -5.8702030583196105,
            -6.2066119500941355, -6.537807545348727, -6.8635813135785355, -7.183733177878899, -7.49807164201237,
            -7.806413901386719, -8.108585938095295, -8.404422600199439, -8.693767665462765, -8.976473889774098,
            -9.252403040522942, -9.52142591521465, -9.783422345638144, -10.038281187918699, -10.285900298811939,
            -10.526186498610194, -10.759055521054933, -10.984431950661268, -11.202249147878092, -11.41244916251864,
            -11.61498263591087, -11.809808692225076, -11.970643111515557, -12.151075382784335, -12.323729088632255,
            -12.488594871665207, -12.645671190983755, -12.794964159730633, -12.93648737513955, -13.070261741580651,
            -13.196315287097761, -13.31468297393161, -13.425406503518644, -13.528534116454033, -13.62412038789924,
            -13.712226018911771, -13.79291762416738, -13.866267516535999, -13.932353488967102, -13.991258594129725,
            -14.043070922242663, -14.08788337752182, -14.125793453658453, -14.156903008733224, -14.181318039957866,
            -14.199148458623199, -14.210507865622823, -14.215513327904482, -14.21428515619094, -14.20694668429855,
            -14.195888808920209, -14.177539256279033, -14.153446501289217, -14.12374350985364, -14.088565231557965,
            -14.048048394183027, -14.002331301681991, -13.951553635837428, -13.895856261802173, -13.835381037710427,
            -13.770270628534625, -13.700668324348673, -13.626717863143053, -13.548563258326812, -13.466348631035782,
            -13.380218047354848, -13.290315360548732, -13.19678405838345, -13.09976711560952, -12.99940685166452,
            -12.895844793641832, -12.789221544563219, -12.679676656978533, -12.567348511908307, -12.452374203134486,
            -12.33488942683412, -12.2150283765417, -12.09292364341827, -11.986575923236032, -11.860650269694226,
            -11.732850114789105, -11.603301030805241, -11.472126577463712, -11.339448232393316, -11.20538532654562,
            -11.070054984474588, -10.933572069396472, -10.796049132942102, -10.657596369506866, -10.518321575101897,
            -10.378330110603585, -10.23772486929731, -10.096606248606182, -9.955072125894155, -9.813217838229747,
            -9.67113616599404, -9.528917320215612, -9.386648933512934, -9.244416054523192, -9.102301145696162,
            -8.960384084330927, -8.818742166731864, -8.677450115361241, -8.536580088864985, -8.396201694849077,
            -8.256382005283509, -8.137030241210313, -7.9984175182936355, -7.8605413317326445, -7.723459161741195,
            -7.587226061167572, -7.451894683877223, -7.31751531495191, -7.18413590259069, -7.05180209160412,
            -6.9205572583912165, -6.790442547293843, -6.661496908224024, -6.53375713546191, -6.407257907525533,
            -6.282031828014411, -6.158109467333519, -6.035519405205214, -5.914288273879523, -5.7944408019570615,
            -5.675999858740103, -5.558986499030811, -5.44342000829843, -5.329317948139974, -5.216696201961047,
          ],
        },
        {
          name: "Theta Θ",
          data: [
            -0.1829856981762542, -0.19518292647506358, -0.208030475254115, -0.22155161079378433, -0.23576970869710645,
            -0.250708205768049, -0.26639054941985674, -0.28284014467406504, -0.3000802988218571, -0.3181341638313823,
            -0.3370246765959218, -0.3567744971296941, -0.3774059448294408, -0.3989409329313782, -0.4214009013040666,
            -0.4448067477292563, -0.46917875783261964, -0.49453653383721835, -0.5208989223219203, -0.5482839411767264,
            -0.5767087059555065, -0.6061893558348876, -0.6367409793960301, -0.6683775404523171, -0.7011118041528903,
            -0.7349552635966807, -0.764854502963876, -0.8007837500341126, -0.8378473773045108, -0.8760513008772942,
            -0.9153998235147582, -0.9558955691499136, -0.9975394195969236, -1.0403304537079299, -1.0842658892204546,
            -1.129341027535834, -1.1755492016641775, -1.2228817275661212, -1.2713278591143125, -1.320874746890527,
            -1.371507401025351, -1.4232086582780292, -1.4759591535436236, -1.529737295963597, -1.5845192498034664,
            -1.6402789202488335, -1.6969879442573115, -1.754615686589596, -1.8131292411283086, -1.8724934375775204,
            -1.9326708536203876, -1.993621832595435, -2.0553045067357947, -2.1087244075846123, -2.171647447557735,
            -2.235170657242489, -2.299243960283405, -2.363815261555464, -2.428830502959974, -2.4942337246163895,
            -2.5599671313571957, -2.625971164415337, -2.6921845781766054, -2.7585445218534432, -2.8249866259198546,
            -2.891445093131746, -2.9578527939419623, -3.0241413661047774, -3.0902413182502966, -3.156082137197012,
            -3.22159239875728, -3.2866998817797874, -3.351331685161749, -3.4154143475540764, -3.4788739694736472,
            -3.5416363375288293, -3.603627050457372, -3.66477164667001, -3.724995732987643, -3.784225114256347,
            -3.8423859235215687, -3.8913318897179874, -3.947313894198471, -4.002019249553132, -4.055376574285916,
            -4.107315444891971, -4.157766522871009, -4.206661680117115, -4.253934122378962, -4.299518510490467,
            -4.343351079078645, -4.385369752463701, -4.425514257474216, -4.463726232910699, -4.499949335400168,
            -4.534129341395994, -4.566214245088154, -4.596154352002182, -4.623902368077204, -4.649413484026658,
            -4.67264545480038, -4.6935586739792665, -4.7121162429495875, -4.728284034718522, -4.7420307522477145,
            -4.753327981197176, -4.76215023698715, -4.7684750061015215, -4.7722827815721605, -4.773530699777693,
            -4.7726226793734075, -4.7691587376473485, -4.76313118914795, -4.7545354435688925, -4.743370006747655,
            -4.729636475844574, -4.71333952876094, -4.694486907868473, -4.673089398136392, -4.649160799754744,
            -4.6227178953661525, -4.593780412029496, -4.562370978050987, -4.5285150748293415, -4.492240983871094,
            -4.453579729143822, -4.412565014941942, -4.369233159450063, -4.323623024195937, -4.275775939592274,
            -4.225735626773298, -4.173548115937759, -4.119261661415457, -4.062926653678012, -4.00459552851957,
            -3.9443226736349786, -3.8821643328263242, -3.8274289831053316, -3.7619241681600357, -3.6947039099787666,
            -3.625830678222222, -3.555368307209754, -3.483381890911758, -3.409937677163093, -3.3351029613249352,
            -3.2589459796187192, -3.1815358023526095, -3.102942227256662, -3.0232356731387036, -2.9424870740673335,
            -2.8607677742835804, -2.778149424036645, -2.6947038765330866, -2.610503086182174, -2.5256190083135373,
            -2.440123500535737, -2.3540882258975486, -2.2675845580054137, -2.180683488243403, -2.0934555352337725,
            -2.0059706566678166, -1.9182981636289647, -1.8305066375214203, -1.7426638497090359, -1.6673799561190314,
            -1.5796186872880362, -1.4919946458999718, -1.4045717785532332, -1.3174128729085872, -1.2305794948672464,
            -1.1441319289518503, -1.0581291219303317, -0.9726286297132631, -0.8876865675488936, -0.8033575635314492,
            -0.7196947154309541, -0.6367495508459236, -0.5545719906729474, -0.47321031588001716, -0.3927111375644792,
            -0.31311937026956116, -0.23447820852751633, -0.15682910659157656, -0.08021176131311947,
            -0.004664098115402027, 0.06977773999019732, 0.14307940040384892, 0.21520832601632378, 0.28613375743437075,
            0.35582673242400986, 0.42426008264647663, 0.4914084277651547, 0.5479234552295225, 0.6126240890140018,
            0.6759769692567446, 0.7379635115124792, 0.7985668560420685, 0.857771848234318, 0.9155650170027734,
            0.9719345512522182, 1.026870274510589, 1.0803636178227016, 1.1324075910024938, 1.1829967523409586,
            1.2321271768667081, 1.2797964232558776, 1.3260034994879248, 1.370748827342755, 1.41403420583433,
            1.4558627736744931, 1.4962389708597357, 1.5351684994723556, 1.5726582837858665, 1.6087164297628007,
            1.6433521840316168, 1.6765758924270777, 1.7083989581769004, 1.7388337998150192, 1.767893808899771,
            1.7955933076130322, 1.8182643864476304, 1.8434782193013781, 1.867377211708451, 1.8899788783009726,
            1.911301459009227, 1.9313638773604076, 1.9501856991119872, 1.9677870912760014, 1.984188781587175,
            1.9994120184654243, 2.013478531520505, 2.0264104926438726, 2.038230477729986, 2.048961429066832,
            2.058626618432598, 2.067249610932855, 2.0748542296099544, 2.0814645208540448, 2.0871047206419604,
            2.091799221628669, 2.095572541112496, 2.098449289893928, 2.100454142044832, 2.1016118056027686,
            2.1019469942032174, 2.101484399659963, 2.1002486655019617, 2.098264361473209, 2.095986281865823,
            2.0926766090697306, 2.0886879442532624, 2.0840443514062486, 2.078769710657422, 2.0728876984434343,
            2.066421768635937, 2.05939513461923, 2.0518307523104795, 2.043751304112604, 2.035179183789136,
            2.026136482249022, 2.0166449742279795, 2.0067261058526817, 1.9964009830724905, 1.9856903609427903,
            1.9746146337432258, 1.9631938259135069, 1.9514475837883047, 1.9393951681129593, 1.9270554473201855,
            1.9144468915483763, 1.9015875673811244, 1.8884951332873712, 1.875186835741335, 1.8616795060010212,
            1.8479895575238636, 1.8341329839981206, 1.8221351167207125, 1.8080100917573851, 1.7937618150748378,
            1.779404653389797, 1.7649525521394125, 1.7504190366825405, 1.7358172139681756, 1.721159774649518,
            1.7064589956226826, 1.6917267429689247, 1.676974475279927, 1.662213247345516, 1.6474537141839,
            1.63270613539445, 1.6179803798136376, 1.603285930455165, 1.5886318897153835, 1.5740269848257533,
            1.5594795735344817, 1.5449976499998783, 1.530588850878214, 1.5162604615896953, 1.502019422746276,
            1.48787233672563,
          ],
        },
        {
          name: "Rho Ρ",
          data: [
            0.11448594079071053, 0.12290120868311075, 0.13183498569721847, 0.14131172942764947, 0.15135655038633689,
            0.16199519834072829, 0.17325404638434136, 0.18516007268342244, 0.19774083984738855, 0.2110244718779305,
            0.2250396286569528, 0.23981547794135258, 0.2553816648392565, 0.27176827874997356, 0.2890058177568838,
            0.307125150472913, 0.32615747534351425, 0.3461342774230787, 0.36708728264826684, 0.3890484096415774,
            0.41204971908684473, 0.4361233607275581, 0.4613015180496146, 0.48761635071709736, 0.515099934841719,
            0.5437842011731147, 0.5693504127456471, 0.600348470301836, 0.6326370630365807, 0.6662469472441299,
            0.7012084075372087, 0.7375511851175824, 0.7753044048159393, 0.8144965010558747, 0.8551551429049548,
            0.8973071583833081, 0.9409784582049072, 0.9861939591346551, 1.0329775071477045, 1.081351800583735,
            1.1313383134923813, 1.182957219369782, 1.2362273154894874, 1.2911659480333766, 1.34778893822882,
            1.406110509701551, 1.4661432172517963, 1.5278978772625882, 1.5913834999471863, 1.6566072236409755,
            1.7235742513414432, 1.7922877896956821, 1.8627489906319694, 1.9245346342811565, 1.998237313750506,
            2.0736791423253638, 2.150852854097311, 2.2297488885998327, 2.310355351586166, 2.3926579796393526,
            2.476640108759674, 2.5622826470629754, 2.6495640517142154, 2.7384603102110927, 2.828944926120718,
            2.920988909361852, 3.0145607711140032, 3.1096265234228087, 3.2061496835582, 3.3040912831716183,
            3.403409882283854, 3.5040615881241157, 3.6060000788275124, 3.7091766319855193, 3.813540158031255,
            3.9190372384288654, 4.025612168622792, 4.133207005691682, 4.2417616206373685, 4.3512137552288905,
            4.461499083308353, 4.556642293178045, 4.668297540487725, 4.780591400841424, 4.893452224187387,
            5.006806650037014, 5.1205796924463485, 5.234694828526349, 5.3490740903065594, 5.4636381597698165,
            5.5783064668664295, 5.692997290310429, 5.807627860952035, 5.922114467516286, 6.036372564490949,
            6.1503168819428815, 6.263861537036657, 6.37692014702775, 6.489405943497701, 6.601231887596805,
            6.712310786060213, 6.822555407759708, 6.93187860055477, 7.040193408206907, 7.147413187121602,
            7.253451722684588, 7.3582233449606775, 7.461643043526898, 7.563626581215072, 7.649834767087166,
            7.74893076473607, 7.846355181220323, 7.942027800597538, 8.03586971009417, 8.127803403185535,
            8.217752880177267, 8.305643746108862, 8.391403305806305, 8.474960655920718, 8.556246773795738,
            8.635194603017741, 8.711739135509593, 8.78581749003908, 8.857368987022948, 8.926335219513941,
            8.992660120273353, 9.056290024835349, 9.117173730483131, 9.175262551066133, 9.230510367596125,
            9.282873674571182, 9.332311621985987, 9.37878605299721, 9.422261537220859, 9.462705399650904,
            9.500087745194762, 9.534381478833119, 9.561299344215044, 9.589794813202609, 9.615139807935392,
            9.63731814313941, 9.656316470071882, 9.6721242716478, 9.68473385346972, 9.694140330832429,
            9.700341611781862, 9.703338376313564, 9.703134051803008, 9.699734784766544, 9.693149409055877,
            9.683389410596472, 9.670468888783411, 9.654404514654026, 9.635215485959904, 9.612923479265902,
            9.587552599206226, 9.55912932503152, 9.527682454582404, 9.49324304582931, 9.45584435611849,
            9.415521779266747, 9.372312780648102, 9.326256830417968, 9.2773953350178, 9.233313820714123,
            9.17935819455358, 9.122725365771764, 9.063463540857796, 9.001622510172844, 8.937253572296072,
            8.870409457636043, 8.80114425144793, 8.729513316390033, 8.655573214756906, 8.579381630518725,
            8.500997291295782, 8.420479890395164, 8.337890009031845, 8.253289038852387, 8.166739104879255,
            8.078302988986529, 7.9880440540156386, 7.89602616863629, 7.802313633052442, 7.706971105650609,
            7.610063530681366, 7.511656067063534, 7.411814018393294, 7.310602764238851, 7.2080876927936615,
            7.104334134960723, 6.999407299931832, 6.908585475974, 6.8016520271579, 6.693730388373389, 6.584884725110349,
            6.475178791384664, 6.364675875168885, 6.253438745651643, 6.1415296023574015, 6.0290100261535216,
            5.915940932168603, 5.8023825246406915, 5.6883942537117065, 5.574034774178834, 5.459361906211214,
            5.344432598036427, 5.229302890597047, 5.114027884175151, 4.99866170697868, 4.883257485680652,
            4.767867317899345, 4.652542246604149, 4.537332236429755, 4.422286151878211, 4.307451737385293,
            4.192875599227136, 4.078603189238308, 3.964678790312135, 3.8511455036518782, 3.754174351232095,
            3.6414776907146233, 3.5292886859216424, 3.4176457916138503, 3.3065862426929016, 3.1961460509773616,
            3.0863600034685277, 2.97726166206121, 2.8688833646578047, 2.761256227638256, 2.6544101496428283,
            2.5483738166203835, 2.44317470809537, 2.338839104608084, 2.235392096279142, 2.132857592452936,
            2.0312583323707827, 1.9306158968275469, 1.8309507207643065, 1.732282106749608, 1.6346282393024296,
            1.5380062000111963, 1.4424319834013062, 1.3479205135068781, 1.254485661100631, 1.1621402615381413,
            1.0708961331718285, 0.9807640962920772, 0.9044006849474329, 0.8163593440294648, 0.7294556852944538,
            0.6436968651135686, 0.5590891399371571, 0.4756378874969016, 0.39334762826155156, 0.31222204710979895,
            0.2322640151843416, 0.15347561189433634, 0.07585814703152494, -0.0005878170305919639, -0.0758624430866206,
            -0.14996659682705626, -0.222901824573853, -0.294670331050483, -0.36527495721344394, -0.4347191581709211,
            -0.5030069812123656, -0.5701430439729904, -0.6361325127546991, -0.7009810810247359, -0.76469494811235,
            -0.8272807981218477, -0.8887457790804802, -0.9490974823377627, -1.0083439222318304, -1.0664935160381361,
            -1.11546968600193, -1.1716059043200318, -1.2266713712182167, -1.280675875905132, -1.3336295175660666,
            -1.385542687210588, -1.4364260498782073, -1.4862905272098885, -1.535147280391854, -1.5830076934779242,
            -1.629883357095963, -1.6757860525416675, -1.7207277362652604, -1.7647205247524482, -1.8077766798030837,
            -1.849908594209154, -1.8911287778324635, -1.9314498440835877, -1.9708844968014603, -2.0094455175330808,
            -2.0471457532121917, -2.083998104235633, -2.1200155129349554, -2.1552109524411236,
          ],
        },
      ],
      tooltip: {
        useHTML: true,
        headerFormat: '<span class="tooltipHeader">R$ {point.key}</span>',
        pointFormat:
          '<br/> <div class="tooltipPointWrapper">‎' +
          '<span class="tooltipPoint">{point.y:.2f}</span>' +
          '<span class="tooltipValueSuffix"></span></div>' +
          '<span class="tooltipLine"></span> <br/>' +
          '<span style="color:{point.color}">\u25CF</span> {series.name}',
        style: {
          color: "#fff",
        },
        valueDecimals: 0,
        backgroundColor: "#000",
        borderColor: "#000",
        borderRadius: 10,
        borderWidth: 3,
      },
      legend: {
        useHTML: true,
        symbolWidth: 0,
        labelFormatter: function () {
          return (
            "<div>" +
            '<div style="border-radius: 50%; width: 10px; height: 10px; background-color: ' +
            this.color +
            '; display: inline-block; margin-right:5px"> </div>' +
            "<span style='color:" +
            this.color +
            ";'> " +
            this.name +
            "</span>" +
            "</div>"
          );
        },
      },
      credits: {
        enabled: true,
        text: "tradehunter.app",
      },
      plotOptions: {
        series: {
          lineWidth: 2,
          marker: { enabled: false },
          states: {
            hover: {
              enabled: true,
              lineWidth: 2,
            },
          },
          point: {
            events: {
              mouseOver: (event) => {
                var chart = event.target.series.chart;
                var index = event.target.index;

                for (var i = 0; i < chart.series.length; i++) {
                  var point = chart.series[i].points[index];
                  var value = point.y;

                  this.legend_values[i] = value;
                }
              },
            },
          },
        },
      },
    });

    this.getEquities();
    this.loadMock();
  },
  computed: {
    filteredSeries() {
      return this.series.filter((series) => series.type == this.serieType && series.TradgEndDt == this.option.dtVen);
    },
    gradeFiltered() {
      return this.dataGrade.filter(
        (item) => item.ExrcPric >= this.valueSlider[0] && item.ExrcPric <= this.valueSlider[1]
      );
    },
  },
  methods: {
    toggleInfo() {
      this.infoActive = !this.infoActive;
    },
    submitInfo() {
      this.infoActive = false;
    },
    clickCh(side, symbol) {
      console.log("symbol clicado eh", side, symbol);
      console.log(this.$refs.TableStrategy.gradeCh(side, symbol));
    },
    async intersected(trigger) {
      console.log("oewoweow", trigger);
      if (!this.loading && trigger) {
        console.log(this.paging.page + 1);
        this.loading = true;

        setTimeout(() => {
          const data = api.get(`open-interest/options?page=${this.paging.page + 1}&size=${this.paging.page_size}`);
          console.log("dta inserte", data);
          this.paging = data.paging;
          console.log("data data", data.data);
          //this.data = [...this.data, ...data.data];
          console.log("new this data", this.data);
          this.loading = false;
        }, 1500);

        //this.page++;
        //this.currentPage++;

        //this.pageSize = this.pageSize + 25;
      }
      //this.pageSize++;
    },
    loadMock() {
      this.equities = ["PETR4"];
    },
    changeField(i, c, r) {
      console.log("oh", i, c, r);

      this.operations[r][this.columns[c].value] = i;
      if (!i && !c) {
        this.operations = this.operations.filter((item) => item.symbol !== null);
      } else this.getResults();
    },
    toggleModal() {
      this.modalActive = !this.modalActive;
    },
    async getEquities() {
      axios
        .get(`${import.meta.env.VITE_API_HOST}/options/strategy/equities`, {
          headers: {
            "user-token":
              "eyJfaWQiOiI2MjY4YzcwZDU0OTAzN2Y2MzIxMTAwN2EiLCJpYXQiOjE2Njk3NTkzMDgwMzh9.eyJhbGciOiJFUzUxMiIsImtpZCI6Ilo3c2M4bXdtUEFISzFhSzN4TGVzbDRlckFiYXVTWG1pLUZhSTM5REVwY0kifQ.ADfhke8XGkC4xbEKBYb5MhN_1xxjy93PkEeoLIUdzjWFZWVypANXWWE9gjU2jMwZKCywhT-4fQq4sbaLwlwy0L-ZAP9Qq33hnenV0aC29-n7b5EAnpj4ip_in_YpnvFZ_pKGLj9yTA7XFyhHQgRgIWly6w1rDGDP-zYSyXawRvCkINb2",
          },
        })
        .then(
          ({ data: { equities, dates } }) => {
            this.equities = equities;
            this.dates = dates;
            this.option.dtVen = dates[0];
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
    async changeEquity(i, c, r) {
      axios
        .get(`${import.meta.env.VITE_API_HOST}/options/strategy/equities/${this.equity}?date=${this.option.dtVen}`, {
          headers: {
            "user-token":
              "eyJfaWQiOiI2MjY4YzcwZDU0OTAzN2Y2MzIxMTAwN2EiLCJpYXQiOjE2Njk3NTkzMDgwMzh9.eyJhbGciOiJFUzUxMiIsImtpZCI6Ilo3c2M4bXdtUEFISzFhSzN4TGVzbDRlckFiYXVTWG1pLUZhSTM5REVwY0kifQ.ADfhke8XGkC4xbEKBYb5MhN_1xxjy93PkEeoLIUdzjWFZWVypANXWWE9gjU2jMwZKCywhT-4fQq4sbaLwlwy0L-ZAP9Qq33hnenV0aC29-n7b5EAnpj4ip_in_YpnvFZ_pKGLj9yTA7XFyhHQgRgIWly6w1rDGDP-zYSyXawRvCkINb2",
          },
        })
        .then(
          ({ data: { equity, series, tableGrade } }) => {
            this.equityObj = equity;
            this.series = reactive(series);
            this.data = series;
            this.minGrade = tableGrade[tableGrade.length - 1].ExrcPric;
            this.maxGrade = tableGrade[0].ExrcPric;
            this.valueSlider = [tableGrade[tableGrade.length - 1].ExrcPric, tableGrade[0].ExrcPric];
            this.dataGrade = tableGrade;
            this.dataGrade.push({
              c: equity.symbol,
              p: equity.symbol,
              ExrcPric: equity.close,
              color: true,
            });
            this.series.push({
              ExrcPric: 0,
              TradgEndDt: "",
              ask: equity.ask,
              bid: equity.bid,
              close: equity.close,
              delta: 0,
              gamma: 0,
              neg: equity.neg,
              qtt: equity.qtt,
              symbol: equity.symbol,
              theta: 0,
              type: "ATIVO",
              vega: 0,
              volImp: 0,
              _id: equity._id,
            });
            console.log("alterei data aqui", series);
          },
          (error) => {
            console.log(error.response);
            console.log(error);
            // this.$notify({
            //   type: "error",
            //   title: `Error`,
            //   text: error.response.data.message,
            // });
          }
        );
    },

    async addSerie() {
      this.operations.push({
        quoteType: this.quoteType,
        _id: this.serie._id,
        qty: Number(this.option.qty),
        dtVen: this.option.dtVen,
        side: this.option.side,
        symbol: this.serie.symbol,
        close: this.serie.close,
        ExrcPric: this.serie.ExrcPric,
        type: this.serie.type,
        TradgEndDt: this.serie.TradgEndDt,
        total: this.serie.close * this.option.qty,
        volImp: this.serie.volImp,
        delta: this.serie.delta,
        gamma: this.serie.gamma,
        theta: this.serie.theta,
        vega: this.serie.vega,
      });
      this.getResults();
    },

    getResults() {
      console.log("sdajsdjsjds fefefe");
      axios
        .post(
          `${import.meta.env.VITE_API_HOST}/options/strategy`,
          {
            equity: this.equityObj.symbol,
            series: this.operations,
          },
          {
            headers: {
              "user-token":
                "eyJfaWQiOiI2MjY4YzcwZDU0OTAzN2Y2MzIxMTAwN2EiLCJpYXQiOjE2Njk3NTkzMDgwMzh9.eyJhbGciOiJFUzUxMiIsImtpZCI6Ilo3c2M4bXdtUEFISzFhSzN4TGVzbDRlckFiYXVTWG1pLUZhSTM5REVwY0kifQ.ADfhke8XGkC4xbEKBYb5MhN_1xxjy93PkEeoLIUdzjWFZWVypANXWWE9gjU2jMwZKCywhT-4fQq4sbaLwlwy0L-ZAP9Qq33hnenV0aC29-n7b5EAnpj4ip_in_YpnvFZ_pKGLj9yTA7XFyhHQgRgIWly6w1rDGDP-zYSyXawRvCkINb2",
            },
          }
        )
        .then(
          ({ data }) => {
            this.chart.setTitle({
              text: `Simulação de Estratégia ${this.equityObj.symbol}`,
            });

            this.chart.xAxis[0].categories = data.categories;

            this.chart.update({
              series: data.series,
            });

            this.summary = {
              breakEven: data.breakEven[0],
              caixa: data.caixa,
              delta: data.delta,
              gamma: data.gamma,
              lucroMax: data.lucroMax,
              riscoMax: data.perdaMax,
              rho: data.rho,
              riscoRetorno: data.riscoRetorno,
              theta: 0,
              vega: 0,
            };
            //this.equities = data;
          },
          (error) => {
            console.log(error.response);
            console.log(error);
            // this.$notify({
            //   type: "error",
            //   title: `Error`,
            //   text: error.response.data.message,
            // });
          }
        );
    },
    SubmitFilter() {
      this.modalActive = false;
      this.addSerie();
    },
  },
  watch: {
    valueSlider(nv, ov) {
      console.log(`valor slider mudou porra`, nv);
    },
  },
};
</script>

<style>
.body {
}
/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.tooltipHeader {
  float: right;
  font-size: 0.6rem;
  width: 100%;
  display: flex;
}

.tooltipHeader::before {
  float: left;
  content: "Cotação:";
  padding-right: 5px;
  opacity: 0.5;
  display: block;
}

.tooltipHeader::after {
  float: none;
}

.tooltipPointWrapper {
  display: block;
  text-align: center;
  padding: 15px 0;
}

.tooltipPoint {
  font-size: 1.5rem;
  padding-left: 5px;

  /* color: #FF0045; */
}

.tooltipValueSuffix {
  padding-left: 5px;
  color: #1bc9a8;
}

.tooltipLine {
  display: block;
  opacity: 0.5;
  background-color: #fff;
  width: 100%;
  height: 1px;
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
.flex-container {
  display: flex;

  /*this centers the text vertically*/
  align-items: center;
}
</style>
