<template>
  <!-- component -->
  <div class="bg-white dark:bg-gray-900">
    <div class="flex justify-center h-screen">
      <div class="hidden bg-cover lg:block lg:w-2/3" style="background-image: url(https://i.imgur.com/Stfi8Va.jpg)">
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <a href="/wave" class="flex items-center mr-6 font-bold text-gray-700">
              <img class="w-auto h-6 mr-1.5" src="https://cdn-th.s3.sa-east-1.amazonaws.com/assets/HunterLogo2.png" />
            </a>

            <p class="max-w-xl mt-3 text-white">
              Você sempre um passo à frente. Encontre diversas oportunidades de investimentos e distorções de mercado que te transformarão em um
              Trader de Alta Performance.
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="text-center" v-if="step < 4">
            <img class="m-auto h-20 mb-5" src="https://cdn-th.s3.sa-east-1.amazonaws.com/assets/icon.png" />
            <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">Trade Hunter</h2>

            <p class="mt-3 text-lg text-gray-500 dark:text-gray-300">Estamos contentes pela sua decisão.</p>
            <p class="text-gray-500 dark:text-gray-300">Para acessar a plataforma, insira os dados abaixo:</p>
          </div>
          <div class="border-b-2 py-4" v-else>
            <div class="text-center">
              <img class="m-auto h-20 mb-5" src="https://cdn-th.s3.sa-east-1.amazonaws.com/assets/icon.png" />
              <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">Trade Hunter</h2>
              <p class="mt-3 text-lg text-gray-500 dark:text-gray-300">Estamos Criando sua conta!</p>
              <p class="text-gray-500 dark:text-gray-300">Em instantes você será redirecionado para a plataforma</p>
            </div>
          </div>

          <div class="border-b-2 py-4" v-if="step < 4">
            <div class="uppercase tracking-wide text-xs font-bold text-gray-500 mb-1 leading-tight" v-text="`Passo: ${step} de 3`"></div>
            <div class="flex w-full md:items-center md:justify-between">
              <div class="flex items-center w-full">
                <div class="w-full bg-white rounded-full mr-2">
                  <div
                    class="rounded-full bg-green-500 text-xs leading-none h-2 text-center text-white"
                    :style="'width: ' + parseInt((step / 3) * 100) + '%'"></div>
                </div>
                <div class="text-xs w-10 text-gray-600" v-text="parseInt((step / 3) * 100) + '%'"></div>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <form v-if="step == 1" @submit.prevent>
              <div>
                <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">E-mail</label>
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  autocomplete="current-email"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
              <div class="mt-6">
                <div class="flex justify-between mb-2">
                  <label for="password" class="text-sm text-gray-600 dark:text-gray-200">Telefone</label>
                </div>
                <vue-tel-input @validate="validaTel" v-model="phone" class="h-11 px-1"></vue-tel-input>
                <template></template>
              </div>

              <div class="mt-6">
                <div class="flex justify-between mb-2">
                  <label for="password" class="text-sm text-gray-600 dark:text-gray-200">Senha</label>
                </div>

                <input
                  required
                  v-model="password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  autocomplete="current-password"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div class="mt-6">
                <button
                  @click="nextStep()"
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Avançar
                </button>
              </div>
            </form>

            <form v-if="step == 2" @submit.prevent>
              <div>
                <label for="firstName" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Nome</label>
                <input
                  v-model="firstName"
                  type="firstName"
                  name="firstName"
                  id="firstName"
                  placeholder="Seu Nome"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div class="mt-6">
                <div class="flex justify-between mb-2">
                  <label for="lastName" class="text-sm text-gray-600 dark:text-gray-200">Sobrenome</label>
                </div>

                <input
                  v-model="lastName"
                  type="lastName"
                  name="lastName"
                  id="lastName"
                  autocomplete="lastName"
                  placeholder="Seu Sobrenome"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div class="mt-6">
                <button
                  @click="nextStep()"
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Próximo
                </button>
                <button
                  @click="step--"
                  class="w-full mt-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-400 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50">
                  Voltar
                </button>
              </div>
            </form>

            <form v-if="step == 3" @submit.prevent>
              <div>
                <label for="document" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">CPF</label>
                <input
                  v-model="document"
                  type="document"
                  name="document"
                  id="document"
                  placeholder="000.000.000-00"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
              <div class="mt-6">
                <label for="document" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">CUPOM AFILIADO</label>
                <input
                  v-model="coupon"
                  type="coupon"
                  name="coupon"
                  id="coupon"
                  placeholder="hunter"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div class="mt-6">
                <div class="flex justify-between mb-2">
                  <label for="birthday" class="text-sm text-gray-600 dark:text-gray-200">Data de Nascimento</label>
                </div>
                <Datepicker v-model="birthday" locale="pt-BR" :format-locale="ptBR" format="dd/MM/yyyy" textInput />
              </div>

              <div class="mt-6">
                <button
                  @click="nextStep()"
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Finalizar Cadastro
                </button>
                <button
                  @click="step--"
                  class="w-full mt-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-400 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50">
                  Voltar
                </button>
              </div>
            </form>

            <div v-for="error in formErrors" :key="error" class="input-errors text-red-400">
              <div class="error-msg">{{ error }}</div>
            </div>

            <p class="mt-6 text-sm text-center text-gray-400">
              Já tem uma conta? <a href="#" class="text-blue-500 focus:outline-none focus:underline hover:underline">Acesse.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ptBR } from 'date-fns/locale';
import { ref } from 'vue';
export default {
  components: { Datepicker },
  setup() {
    const birthday = ref(new Date());
    // In case of a range picker, you'll receive [Date, Date]

    const textInputOptions = ref({
      format: 'dd/MM/yyyy',
    });

    return {
      birthday,
      textInputOptions,
      ptBR,
    };
  },
  data() {
    return {
      coupon: undefined,
      step: 1,
      firstName: '',
      lastName: '',
      email: '',
      document: '',

      phone: '',
      password: '',
      phoneOBJ: {
        valid: false,
      },
      formErrors: [],
      hasFormError: false,
    };
  },
  methods: {
    validaTel(obj) {
      this.phoneOBJ = obj;
    },
    login() {},
    async nextStep() {
      this.formErrors = [];
      this.hasFormError = false;

      switch (String(this.step)) {
        case '1': {
          if (!this.password) {
            this.hasFormError = true;
            this.formErrors.push('Senha é obrigatória');
          } else if (this.password.length < 8) {
            this.hasFormError = true;
            this.formErrors.push('Senha é muito curta');
          }
          if (!this.phone) {
            this.hasFormError = true;
            this.formErrors.push('Telefone é obrigatório');
          } else if (!this.phoneOBJ.valid) {
            this.hasFormError = true;
            this.formErrors.push('Telefone é inválido');
          }

          this.$store.dispatch('auth/email', this.email).then(
            (result) => {
              if (this.hasFormError) this.step = 1;
              else this.step = 2;
            },
            (error) => {
              this.hasFormError = true;
              this.formErrors.push(error);
            },
          );

          break;
        }
        case '2': {
          if (!this.firstName) {
            this.hasFormError = true;
            this.formErrors.push('Nome é obrigatório');
          } else if (this.firstName.length < 3) {
            this.hasFormError = true;
            this.formErrors.push('Nome é muito curto');
          }
          if (!this.lastName) {
            this.hasFormError = true;
            this.formErrors.push('Sobrenome é obrigatório');
          } else if (this.lastName.length < 3) {
            this.hasFormError = true;
            this.formErrors.push('Sobrenome é muito curto');
          }

          if (this.hasFormError) this.step = 2;
          else this.step = 3;
          break;
        }
        case '3': {
          var fullYear = this.birthday.getFullYear();
          var currYear = new Date().getFullYear();

          if (this.coupon) {
            this.$store.commit('user/SET_UTMS', { utm_source: this.coupon });
          }
          if (!this.birthday) {
            this.hasFormError = true;
            this.formErrors.push('Data de nascimento é obrigatória');
          } else if (fullYear > currYear || currYear - fullYear < 17 || currYear - fullYear > 100) {
            this.hasFormError = true;
            this.formErrors.push('Data de nascimento inválida');
          } else if (fullYear > currYear) {
            this.hasFormError = true;
            this.formErrors.push('Data de nascimento inválida');
          }

          this.$store.dispatch('auth/document', this.document).then(
            (result) => {
              if (this.hasFormError) this.step = 3;
              else {
                this.step = 4;
                this.$store
                  .dispatch('auth/register', {
                    email: this.email,
                    birthday: this.birthday.toLocaleDateString('pt-BR'),
                    phone: this.phone,
                    lastName: this.lastName,
                    firstName: this.firstName,
                    document: this.document,
                    password: this.password,
                    //affiliation: this.$store.state.user.affiliation,
                  })
                  .then(
                    async (result) => {
                      this.$notify({
                        type: 'success',
                        title: 'Successo',
                        text: result.message,
                      });

                      if (this.$store.state.user.affiliation && this.$store.state.user.affiliation.source == 'sejabra') {
                        window.location = 'https://lp.sejabra.com.br/trade-hunter?utm_source=tradehunter&utm_medium=register';
                        this.$store.commit('auth/registerSuccess', result);
                        //this.$router.push('/dashboard');
                      } else {
                        this.$store.commit('auth/registerSuccess', result);
                        this.$router.push('/dashboard');
                      }

                      this.$api.post('/events/track', { name: 'userRegister', id: 'registerForm' });
                    },
                    (error) => {
                      this.$notify({
                        type: 'error',
                        title: 'Erro',
                        text: error.message,
                      });
                    },
                  );
              }
            },
            (error) => {
              this.hasFormError = true;
              this.formErrors.push(error);
            },
          );

          break;
        }
        default: {
        }
      }
    },
  },
  watch: {},
};
</script>

<style scoped>
.vue-tel-input {
  border-radius: 0.375rem !important;
}
</style>
