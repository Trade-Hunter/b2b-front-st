<template>
  <div
    v-if="!loggedIn"
    class="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    style="background-image: url(https://thumbs.gfycat.com/FlatScratchyJellyfish-mobile.mp4)"
  >
    <div v-if="step == 1" class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rounded-2xl max-w-md w-full space-y-8">
      <div>
        <img v-if="isDarkMode" class="w-auto h-20 mr-1.5" src="/stBranca.png" />
        <img v-else class="w-auto h-20 mr-1.5" src="/stPreta.png" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Redefinição de senha</h2>
      </div>

      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email</label>
          <input
            @keyup.enter="login"
            v-model="email"
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required=""
            class="appearance-none rounded-none bg-white relative block w-full px-3 py-2 border border-gray-800 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Endereço de Email"
          />
        </div>
      </div>

      <div>
        <button
          @click="login()"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-200 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3"> </span>
          Enviar Email
        </button>
      </div>
    </div>
    <div v-if="step == 2" class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rounded-2xl max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://storage.googleapis.com/hunter-logo/Hunter_logo_full.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Insira o código recebido no seu email</h2>
      </div>

      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label class="sr-only">Código de acesso</label>
          <input
            @keyup.enter="login"
            v-model="reset_code"
            id="password"
            name="Oi"
            type="text"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Código"
          />
        </div>
      </div>

      <div>
        <button
          @click="login()"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3"> </span>
          Próximo
        </button>
      </div>
    </div>
    <div v-if="step == 3" class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rounded-2xl max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://storage.googleapis.com/hunter-logo/Hunter_logo_full.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Insira a nova senha</h2>
      </div>

      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="auth_token" class="sr-only">Nova senha</label>
          <input
            v-on:keyup.enter="login"
            v-model="password"
            id="password"
            name="Oi"
            type="password"
            autocomplete="current-password"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Senha"
          />
        </div>
      </div>

      <div>
        <button
          @click="login()"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3"> </span>
          Redefinir senha
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @author Leonardo Kwieczinski Sampaio <leonardoso@pm.me>
 * @copyright (c) Leonardo Kwieczinski Sampaio. All rights reserved.
 * @abstract Autenticacao passwordless firebase & Vue.js
 */
import axios from "axios";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "login",
  data() {
    return {
      email: null,
      step: 1,
      reset_code: "",
      password: "",
      userId: null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    ...mapGetters("theme", ["isDarkMode"]),
  },
  created() {
    const { u, t } = this.$route.query;

    if (u && t) {
      this.userId = u;
      this.reset_code = t;
      this.step = 3;
    }

    if (this.loggedIn) {
      //this.$router.push("/");
    }
  },
  watch: {
    loggedIn() {
      this.$router.go();
    },
  },

  methods: {
    login: async function (e) {
      const email = this.email;

      switch (this.step) {
        case 1: {
          axios
            .post(import.meta.env.VITE_AUTH_HOST + "/users/reset", {
              step: 1,
              email: this.email,
            })
            .then(
              (response) => {
                this.$notify({
                  type: "success",
                  title: `Sucesso`,
                  text: response.data.message,
                });
              },
              (error) => {
                this.step -= 1;
                this.$notify({
                  type: "error",
                  title: `Error`,
                  text: error.response.data.message,
                });
              }
            );

          break;
        }
        case 2: {
          break;
        }
        case 3: {
          const res = await this.$api
            .post(import.meta.env.VITE_AUTH_HOST + "/users/reset", {
              step: 2,
              email: this.email,
              password: this.password,
              token: this.reset_code,
              userId: this.userId,
            })
            .then(
              (response) => {
                this.$notify({
                  type: "success",
                  title: `Sucesso`,
                  text: response.data.message,
                });
                this.$router.push("/login");
              },
              (error) => {
                this.step -= 1;
                this.$notify({
                  type: "error",
                  title: `Error`,
                  text: error.response.data.message,
                });
              }
            );

          break;
        }
        default:
          this.step = 1;
          break;
      }
      this.step += 1;
    },
  },
});
</script>
