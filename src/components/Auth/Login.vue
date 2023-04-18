<template>
  <!-- component -->
  <div class="bg-white dark:bg-gray-900">
    <div class="flex justify-center h-screen">
      <div class="hidden bg-cover lg:block lg:w-2/3" style="background-image: url(https://i.imgur.com/Stfi8Va.jpg)">
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <a href="#" class="flex items-center mr-6 font-bold text-gray-700">
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
          <div class="text-center">
            <img class="m-auto h-20 mb-5" src="https://cdn-th.s3.sa-east-1.amazonaws.com/assets/icon.png" />
            <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">Trade Hunter</h2>

            <p class="mt-3 text-lg text-gray-500 dark:text-gray-300">Estamos contentes em vê-lo novamente.</p>
            <p class="text-gray-500 dark:text-gray-300">Realize o login para acessar sua conta</p>
          </div>

          <div class="mt-8">
            <form @submit.prevent>
              <div>
                <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  v-model="email"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div class="mt-6">
                <div class="flex justify-between mb-2">
                  <label for="password" class="text-sm text-gray-600 dark:text-gray-200">Senha</label>
                  <a href="/password-reset" class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                    >Esqueceu a senha?</a
                  >
                </div>

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Sua senha"
                  v-model="password"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div class="mt-6">
                <button
                  @click="login"
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Acessar
                </button>

                <a
                  href="/register"
                  class="flex justify-center w-full mt-2 px-4 py-2 tracking-wide text-blue-500 border border-blue-500 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:bg-gray-100 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Criar conta
                </a>
              </div>
            </form>

            <p class="mt-6 text-sm text-center text-gray-400">
              Ainda não têm uma conta? <a href="/register" class="text-blue-500 focus:outline-none focus:underline hover:underline">Cadastre-se</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sadsds',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  mounted() {},

  methods: {
    login() {
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })
        .then((result) => {
          this.$notify({
            type: 'success',
            title: 'Successo',
            text: result,
          });
          this.$api.post('/events/track', { name: 'userLogin', id: 'loginForm' });
          //this.$router.push({ path: '/dashboard' });
          //this.$router.go();
        })
        .catch((error) => {
          this.step -= 1;

          this.$notify({
            type: 'error',
            title: 'Erro',
            text: error,
          });
        });
    },
  },
};
</script>

<style></style>
