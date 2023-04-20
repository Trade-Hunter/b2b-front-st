<template>
  <HxcMenu>
    <div class="p-8 relative h-full overflow-hidden font-sans">
      <div class="w-full overflow-auto h-full lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside class="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
          <nav class="space-y-1">
            <a
              v-for="(item, itemIdx) in navigation"
              @click="selectCurrent(itemIdx)"
              :key="item.name"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-gray-50 text-blue-700 hover:bg-white dark:bg-zinc-700 dark:hover:bg-slate-700 hover:text-blue-700'
                  : 'text-gray-900 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900',
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current ? 'text-blue-500 group-hover:text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                  '-ml-1 mr-3 h-6 w-6 flex-shrink-0',
                ]"
                aria-hidden="true"
              />
              <span class="truncate">{{ item.name }}</span>
            </a>
          </nav>
        </aside>

        <div
          v-if="this.selectedI == 0"
          class="overflow-y-auto custom-scrollbar space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
        >
          <form action="#" method="POST">
            <div class="shadow sm:overflow-hidden sm:rounded-md">
              <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
                <div>
                  <h3 class="text-base font-semibold leading-6 text-gray-900">Informação pessoal</h3>
                  <p class="mt-1 text-sm text-gray-500">Use um endereço permanente onde você possa receber e-mail.</p>
                </div>

                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900"
                      >Primeiro nome</label
                    >
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autocomplete="given-name"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Último nome</label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autocomplete="family-name"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Documento</label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autocomplete="given-name"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900"
                      >Data de nascimento</label
                    >
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autocomplete="family-name"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <label for="email-address" class="block text-sm font-medium leading-6 text-gray-900"
                      >Endereço de Email</label
                    >
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autocomplete="email"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">País</label>
                    <select
                      id="country"
                      name="country"
                      autocomplete="country-name"
                      class="mt-2 block w-full px-4 bg-transparent rounded-md border-0 bg-white py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    >
                      <option>Brasil</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>

                  <div class="col-span-6">
                    <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900"
                      >Endereço da rua</label
                    >
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autocomplete="street-address"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label for="city" class="block text-sm font-medium leading-6 text-gray-900">Cidade</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autocomplete="address-level2"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label for="region" class="block text-sm font-medium leading-6 text-gray-900"
                      >Estado / Província</label
                    >
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autocomplete="address-level1"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900"
                      >CEP / Código Postal</label
                    >
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autocomplete="postal-code"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-gray-50 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </div>

        <div
          v-if="this.selectedI == 1"
          class="overflow-y-auto custom-scrollbar space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
        >
          <form action="#" method="POST">
            <div class="shadow sm:overflow-hidden sm:rounded-md">
              <div class="space-y-6 bg-white dark:bg-[#000000] py-6 px-4 sm:p-6">
                <div>
                  <h3 class="text-base font-semibold leading-6 text-gray-900">Senha</h3>
                  <p class="mt-1 text-sm text-gray-500">Use a permanent address where you can recieve mail.</p>
                </div>

                <div class="flex flex-col gap-6">
                  <div class="">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900"
                      >Senha Atual</label
                    >
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autocomplete="given-name"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div class="">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nova senha</label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autocomplete="given-name"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900"
                      >Confirmar nova senha</label
                    >
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autocomplete="given-name"
                      class="mt-2 block w-full bg-transparent rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
                    <p class="mt-2 text-black">
                      Certifique-se de ter pelo menos 15 caracteres OU pelo menos 8 caracteres, incluindo um número e
                      uma letra minúscula. Ver mais.
                    </p>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-gray-50 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>

          <form action="#" method="POST">
            <div class="shadow sm:overflow-hidden sm:rounded-md">
              <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
                <div class="flex flex-row">
                  <div class="grow">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">Autenticação de dois fatores</h3>
                    <p class="mt-1 text-sm text-gray-500">
                      A autenticação de dois fatores adiciona uma camada adicional de segurança à sua conta, exigindo
                      mais do que apenas uma senha para entrar. Saiba mais sobre a autenticação de dois fatores.
                    </p>
                  </div>
                  <div class="text-right">
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-gray-50 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Habilitada
                    </button>
                  </div>
                </div>

                <div class="rounded-md bg-yellow-50 dark:bg-[#74747429] p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400/80" aria-hidden="true" />
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-yellow-800 dark:text-gray-200">Atenção necessária</h3>
                      <div class="mt-2 text-sm text-yellow-700 dark:text-gray-100">
                        <p>
                          A Habilitação da autenticação em dois fatores (2FA) é obrigatória para usuários que pretendem
                          utilizar o recurso de roteamento de ordens.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div
          v-if="this.selectedI == 2"
          class="overflow-y-auto custom-scrollbar space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
        >
          <div class="flex w-full">
            <div class="flex w-full flex-row space-x-2 divide-x rounded-sm bg-white py-6 px-4 sm:p-6">
              <div class="w-1/2 pr-4">
                <p class="font-semibold mb-2 text-black text-xl">Próxima cobrança</p>
                <p>
                  <span class="font-semibold text-black text-2xl">$0.00</span>
                </p>
                <div class="mt-2 text-sm text-gray-500">
                  <p>
                    This amount does not include the spend on usage of metered service. View your usage this month
                    below.
                  </p>
                </div>
              </div>
              <div class="pl-4">
                <p class="text-xl font-semibold mb-2 text-black">Informação de Pagamento</p>
                <div class="mt-2">
                  <ul class="list-style-none">
                    <li>
                      <a class="text-blue-600" href="">Histórico de cobranças</a>
                    </li>

                    <li>
                      <a class="text-blue-600" href="">Mudar para cobrança anual</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <form action="#" method="POST">
            <div class="shadow sm:overflow-hidden sm:rounded-md">
              <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
                <div>
                  <h3 class="text-base font-semibold leading-6 text-gray-900">
                    Suas cobranças e descontos recorrentes
                  </h3>
                </div>
              </div>
            </div>
          </form>

          <form action="#" method="POST">
            <div class="shadow sm:overflow-hidden sm:rounded-md">
              <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
                <div class="flex flex-row">
                  <div>
                    <h3 class="text-base font-semibold leading-6 text-gray-900">Plano Atual</h3>
                    <p class="mt-1 text-sm text-gray-500">Confira as informações sobre seu plano atual.</p>
                  </div>
                  <div class="grow">
                    <div class="justify-end flex gap-x-2">
                      <button
                        type="button"
                        class="inline-flex items-center rounded-md text-blue-600 px-3 py-2 text-sm font-bold shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        Comparar todos os planos
                      </button>
                      <button
                        type="button"
                        class="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-bold text-gray-50 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
                <div class="gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  <div :class="['flex flex-col justify-between p-6 bg-white rounded-md ']">
                    <div>
                      <div class="flex items-center justify-between gap-x-4">
                        <h3 :class="['text-gray-900', 'text-lg font-semibold leading-8']">
                          {{ current_plan.name }}
                        </h3>
                        <p
                          v-if="current_plan.mostPopular"
                          class="rounded-full bg-blue-600/10 py-1 px-2.5 text-xs font-semibold leading-5 text-blue-600"
                        >
                          Mais popular
                        </p>
                      </div>
                      <p class="mt-2 text-sm leading-6 text-gray-600">
                        {{ current_plan.description }}
                      </p>

                      <div class="flex flex-row w-full space-x-20">
                        <div>
                          <ul role="list" class="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                            <li v-for="feature in current_plan.features" :key="feature" class="flex gap-x-3">
                              <CheckIcon class="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                              {{ feature }}
                            </li>
                          </ul>
                        </div>
                        <div>
                          <ul role="list" class="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                            <li v-for="feature in current_plan.available_features" :key="feature" class="flex gap-x-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="h-6 w-5 flex-none text-red-600"
                              >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>

                              {{ feature }}
                            </li>
                          </ul>
                          <p class="text-blue-600 mt-2">Veja todas as ferramentas e compare os planos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <form action="#" method="POST">
            <div class="shadow sm:overflow-hidden sm:rounded-md">
              <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
                <div>
                  <h3 class="text-base font-semibold leading-6 text-gray-900">Módulos Extras</h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Provide basic information about the job. Be specific with the job title.
                  </p>
                </div>

                <div class="gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  <div :class="['flex flex-col justify-between p-6 bg-white rounded-md ']">
                    <div class="flex flex-row">
                      <div class="grow">
                        <h3 class="text-base font-semibold leading-6 text-gray-900">Sala de Opções</h3>
                        <p class="mt-1 text-sm text-gray-500">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo totam non cumque deserunt
                          officiis ex maiores nostrum.
                        </p>
                      </div>
                      <div class="justify-end gap-x-2">
                        <button
                          type="button"
                          class="items-center rounded-md text-blue-600 px-3 text-sm font-bold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                        >
                          Ler mais
                        </button>
                        <button
                          type="button"
                          class="bg-blue-500 text-gray-200 px-3 text-sm py-2 rounded-md font-semibold"
                        >
                          Adquirir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div class="bg-white shadow sm:rounded-lg">
            <SwitchGroup as="div" class="px-4 py-5 sm:p-6">
              <SwitchLabel as="h3" class="text-base font-semibold leading-6 text-gray-900" passive
                >Renovar assinatrura automaticamente</SwitchLabel
              >
              <div class="mt-2 sm:flex sm:items-start sm:justify-between">
                <div class="max-w-xl text-sm text-gray-500">
                  <SwitchDescription
                    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo totam non cumque deserunt
                    officiis ex maiores nostrum.</SwitchDescription
                  >
                </div>
                <div class="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center">
                  <Switch
                    v-model="enabled"
                    :class="[
                      enabled ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
                    ]"
                  >
                    <span
                      aria-hidden="true"
                      :class="[
                        enabled ? 'translate-x-5' : 'translate-x-0',
                        'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      ]"
                    />
                  </Switch>
                </div>
              </div>
            </SwitchGroup>
          </div>

          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Gerenciar assinatura</h3>
              <div class="mt-2 sm:flex sm:items-start sm:justify-between">
                <div class="max-w-xl text-sm text-gray-500">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatibus corrupti atque
                    repudiandae nam.
                  </p>
                </div>
              </div>

              <div class="py-4">
                <div class="px-4 py-5 sm:p-6 rounded-md">
                  <div class="flex flex-row">
                    <div class="grow">
                      <h3 class="text-base font-semibold leading-6 text-gray-900">Informação de cobrança</h3>
                    </div>
                    <div class="flex">
                      <button
                        type="button"
                        class="justify-end text-end rounded-md text-blue-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        Editar
                      </button>
                    </div>
                  </div>

                  <div class="mt-1">
                    <p class="mb-1">Leonardo Kwieczinski</p>
                    <p>R. José de Alencar, Menino deus 1244</p>
                    <p>Porto Alegre, Rio de Janeiro 90880-480</p>
                    <p>Brazil</p>
                  </div>
                </div>
              </div>
              <div class="py-4">
                <div class="px-4 py-5 sm:p-6 rounded-md">
                  <h3 class="text-base font-semibold leading-6 text-gray-900">Método de pagamento</h3>
                  <div class="mt-2 sm:flex sm:items-start sm:justify-between">
                    <div class="max-w-xl text-sm text-gray-500">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatibus corrupti atque
                        repudiandae nam.
                      </p>
                    </div>
                    <div class="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center">
                      <button
                        type="button"
                        class="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-gray-50 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        Alterar plano
                      </button>
                    </div>
                  </div>
                  <div class="mt-5">
                    <div class="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                      <h4 class="sr-only">Visa</h4>
                      <div class="sm:flex sm:items-start">
                        <svg class="h-8 w-auto sm:h-6 sm:flex-shrink-0" viewBox="0 0 36 24" aria-hidden="true">
                          <rect width="36" height="24" fill="#224DBA" rx="4" />
                          <path
                            fill="#fff"
                            d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                          />
                        </svg>
                        <div class="mt-3 sm:mt-0 sm:ml-4">
                          <div class="text-sm font-medium text-gray-900">Ending with 4242</div>
                          <div class="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                            <div>Expires 12/20</div>
                            <span class="hidden sm:mx-2 sm:inline" aria-hidden="true">&middot;</span>
                            <div class="mt-1 sm:mt-0">Last updated on 22 Aug 2017</div>
                          </div>
                        </div>
                      </div>
                      <div class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                        <button
                          type="button"
                          class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="py-4">
                <div class="px-4 py-5 sm:p-6 rounded-md">
                  <h3 class="text-base font-semibold leading-6 text-gray-900">Último pagamento</h3>
                  <div class="mt-2 sm:flex sm:items-start sm:justify-between">
                    <div class="max-w-xl text-sm text-gray-500">
                      <p>Você não fez nenhum pagamento.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="py-4">
                <div class="px-4 py-5 sm:p-6 rounded-md">
                  <div class="flex flex-row">
                    <div class="grow">
                      <h3 class="text-base font-semibold leading-6 text-gray-900">Cupons</h3>
                    </div>
                    <div class="flex">
                      <button
                        type="button"
                        class="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-gray-50 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        Resgatar um cupom
                      </button>
                    </div>
                  </div>
                  <div class="mt-2 sm:flex sm:items-start sm:justify-between">
                    <div class="max-w-xl text-sm text-gray-500">
                      <p>Você não tem um cupom ativo.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </HxcMenu>
</template>

<script>
import { CreditCardIcon, KeyIcon, SquaresPlusIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/20/solid";
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid";
import HxcMenu from "@/components/Menu/Menu.vue";
export default {
  setup() {
    const enabled = ref(true);
    return { enabled };
  },
  data() {
    return {
      navigation: [
        { name: "Perfil", href: "#", icon: UserCircleIcon, current: true },
        {
          name: "Senha e Autenticação",
          href: "#",
          icon: KeyIcon,
          current: false,
        },
        {
          name: "Assinatura & Cobrança",
          href: "#",
          icon: CreditCardIcon,
          current: false,
        },
      ],
      current_plan: {
        name: "Hunter Free",
        priceMonthly: 0.0,
        features: ["5 products", "Up to 1,000 subscribers", "Basic analytics", "48-hour support response time"],
        available_features: [
          "Feature 1 isso aquilo",
          "Lorem ipsum it ameli",
          "Feature 3 realtime",
          "Intraday distortions opcoes",
          "fluxo de opcoes",
        ],
        mostPopular: true,
        description: "O básico para todos os investidores",
      },
    };
  },
  components: {
    Switch,
    SwitchDescription,
    SwitchGroup,
    SwitchLabel,
    CheckIcon,
    ExclamationTriangleIcon,
    HxcMenu,
  },
  computed: {
    selectedI() {
      return this.navigation.findIndex((item) => item.current == true);
    },
  },
  methods: {
    selectCurrent(idx) {
      console.log(this.selectedI, idx, this.navigation);
      this.navigation[this.selectedI].current = false;
      this.navigation[idx].current = true;
    },
  },
};
</script>

<style scoped>
/* Hide scrollbar on a specific element with class "my-element" */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
