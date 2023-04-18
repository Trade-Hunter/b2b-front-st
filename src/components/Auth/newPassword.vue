<template>
  <div v-if="!loggedIn" class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div v-if="step == 1" class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rounded-2xl max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://storage.googleapis.com/hunter-logo/logo_tradehunter.svg" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Redefinição de senha</h2>
      </div>

      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Senha</label>
          <input
            v-model="email"
            id="email-address"
            name="email-address"
            type="email"
            autocomplete="email"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email" />
        </div>
      </div>

      <div>
        <button
          @click="login()"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3"> </span>
          Entrar
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
import axios from 'axios';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'login',
  data() {
    return {
      email: '',
      step: 1,
      auth_token: '',
      password: '',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    const { u, t } = this.$route.query;
    if (u && t) this.reset({ u, t });

    if (this.loggedIn) {
      //this.$router.push("/");
    }
  },
  watch: {
    loggedIn() {
      //this.$router.go();
    },
  },

  methods: {
    reset(payload) {
      axios.post('http://localhost:4024/reset', payload).then(
        (result) => {
          this.$notify({
            type: 'success',
            title: 'Successo',
            text: result,
          });
          //this.$router.push('/dashboard');
        },
        (error) => {
          this.step -= 1;

          this.$notify({
            type: 'error',
            title: 'Erro',
            text: error,
          });
        },
      );
    },
    login: function (e) {
      const email = this.email;

      this.$store
        .dispatch('auth/reset', {
          email: this.email,
          password: this.password,
        })
        .then(
          (result) => {
            this.$notify({
              type: 'success',
              title: 'Successo',
              text: result,
            });
            this.$router.push('/dashboard');
          },
          (error) => {
            this.step -= 1;

            this.$notify({
              type: 'error',
              title: 'Erro',
              text: error,
            });
          },
        );

      this.step += 1;
    },
  },
});
</script>
