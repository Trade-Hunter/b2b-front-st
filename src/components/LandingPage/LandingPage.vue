<template>
  <hxc-navbar></hxc-navbar>

  <section class="bg-white text-gray-700 body-font">
    <!-- <a href="https://lp.tradehunter.app" target="_blank">
        <img src="https://cdn-th.s3.sa-east-1.amazonaws.com/artes/Home-Topv1.png" />
      </a> -->
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="container relative flex md:flex-row flex-col items-center">
        <div
          class="lg:flex-grow w-full lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
        >
          <h1 class="mb-4 text-4xl text-gray-900 font-extrabold md:text-4xl xl:text-5xl dark:text-white">
            A plataforma completa para guiar sua tomada de decisão.
          </h1>
          <h1 class="title-font sm:text-2xl text-2xl mb-4 font-medium text-gray-900">
            Você sempre um passo à frente. <br class="hidden lg:inline-block" />
          </h1>
          <p class="mb-8 leading-relaxed">
            Encontre diversas oportunidades de investimentos e distorções de mercado que te transformarão em um Trader
            de Alta Performance.
          </p>
          <div class="flex flex-col md:flex-row md:gap-y-0 w-full gap-y-2">
            <a
              href="/register"
              class="inline-flex items-center justify-center px-5 py-3 md:mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Cadastre-se gratuitamente
              <svg
                class="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#pricing"
              class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Ver planos
            </a>
          </div>
        </div>
        <div class="relative w-full md:w-1/3">
          <img
            alt="Demo plataforma"
            class="border-none border-0 hover"
            src="https://cdn-th.s3.sa-east-1.amazonaws.com/assets/allinonehunterpro.webp"
          />
        </div>
      </div>
    </div>
  </section>

  <section class="bg-gray-50 dark:bg-gray-800">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div class="max-w-screen-md mb-8 lg:mb-16">
        <h2 class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
          Uma solução projetada para os melhores investidores com grandes necessidades
        </h2>
        <p class="text-gray-500 sm:text-xl dark:text-gray-400">
          Tudo que você precisa na palma da sua mão. Realize suas operações analisando dados estatísticos, assim como os
          investidores institucionais.
        </p>
      </div>
      <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
        <div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Leitura de todo o mercado</h3>
          <p class="text-gray-500 dark:text-gray-400">
            Acompanhe o fluxo de todas as Ações e Corretoras em realtime, tenha acesso às movimentações que cada player
            no mercado.
          </p>
        </div>
        <div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Você sempre informado</h3>
          <p class="text-gray-500 dark:text-gray-400">
            Fique por dentro das <span class="font-bold">últimas notícias</span>: do Brasil e no mundo. Veja os
            <span class="font-bold">fatos relevantes e eventos coorporativos</span> publicados na CVM.
          </p>
        </div>
        <div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Monitoramos diversas estratégias</h3>
          <p class="text-gray-500 dark:text-gray-400">
            Temos o Screener mais completo. São dezenas de indicadores e setups monitorados em tempo real.
          </p>
        </div>
        <div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Posições em aberto</h3>
          <p class="text-gray-500 dark:text-gray-400">
            Analise os dados de aluguel de ações, operações a termo e posições em opções dos grandes investidores
          </p>
        </div>
        <div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Mercado de Opções</h3>
          <p class="text-gray-500 dark:text-gray-400">
            Veja todas as opções negociadas no dia, um completo screener parametrizável e o PCR das opções.
          </p>
        </div>
        <div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Interface e Tecnologia</h3>
          <p class="text-gray-500 dark:text-gray-400">
            Projetado para funcionar nos mais diversos dispositivos. Tecnologia avançada para sempre estarmos à frente.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section id="pricing" class="fade-in bg-white dark:bg-gray-900">
    <div class="flex flex-col py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="max-w-screen-md mb-8">
        <h2 class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
          Conheça nossos planos. <a class="text-sm align-base" href="#comparativo">Ver Comparação</a>
        </h2>
        <p class="text-gray-500 sm:text-xl dark:text-gray-400">
          Não importa se você é só um curioso no mercado financeiro ou um investidor de alto nível. Nós temos um plano
          para você.
        </p>
      </div>
      <div class="w-full mb-2">
        <!-- <a type="button" href="https://lp.tradehunter.app" class="antialiased underline font-bold">
            Confira nossa promoção de aniversáio + Lançamento de novo módulo de opções
            <img src="https://cdn-th.s3.sa-east-1.amazonaws.com/artes/banner-hunter.png" />
          </a> -->
      </div>

      <div class="flex px-5 pb-3 flex-row items-center w-full justify-center text-xl">
        <label for="toggle" class="text-gray-700">Mensal</label>
        <div class="relative inline-block w-10 ml-2 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            @click="toggleBillingCycle"
            :class="{ 'right-0 border-green-400': billingCycle == 0 }"
            :style="{ 'border-color: #68D391; background-color: #68D391;': billingCycle == 0 }"
            class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            for="toggle"
            :class="{ ' bg-green-400': billingCycle == 0 }"
            class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
        <label for="toggle" class="text-gray-700"
          >Anual <label class="text-sm text-red-600 font-bold animate-pulse">(ATÉ 40% OFF)</label></label
        >
      </div>
      <div class="flex gap-x-8 justify-start md:justify-center pb-4 overflow-x-scroll md:overflow-auto flex-row">
        <div v-for="plan in items" :key="plan" class="flex w-72 flex-col rounded-lg bg-white shadow-lg">
          <div class="flex flex-col items-center bg-sky-500 py-5 px-12">
            <span class="font-semibold text-gray-100 text-xl md:text-2xl">{{ plan.DisplayName }}</span>
            <div class="flex items-center">
              <span class="text-6xl text-gray-100 font-bold">{{
                (billingCycle
                  ? plan.BillingCycles[billingCycle].Price / 100
                  : plan.BillingCycles[billingCycle].Price / 1200
                ).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })
              }}</span>
            </div>
            <span class="text-xs text-gray-200">/mês</span>
          </div>
          <div class="flex p-2">
            <ul class="w-full items-center content-center text-center justify-center">
              <li class="flex text-gray-700 w-full mb-2 text-sm border-opacity-20 pb-1 border-b">
                <span class="ml-2 items-center content-center">{{ plan.Description }}</span>
              </li>
              <li
                v-for="feature in plan.Features"
                :key="feature"
                class="flex text-gray-700 mb-2 text-sm items-center content-center border-opacity-20 pb-1 border-b"
              >
                <svg
                  v-if="feature.Available"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 align-middle text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 align-middle text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span v-tooltip:bottom.tooltip="feature.Tooltip" class="ml-2">{{ feature.Name }}</span>
              </li>
            </ul>
          </div>
          <div class="flex h-full">
            <button
              @click="checkout(plan._id)"
              class="flex mt-auto content-center justify-center items-center w-full bg-sky-500 text-white rounded-t-none rounded-md px-2 py-2"
            >
              ESCOLHER
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="fade-in bg-white dark:bg-gray-900 dark:bg-gray-800">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
        <h2 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Comunidade e relatórios</h2>
        <p class="mb-4 font-light">
          Faça parte da nossa comunidade e se relacione com diversos players e operadores de mercado financeiro. Fique
          por dentro de tudo que acontece durante o pregão através de nossos robôs.
        </p>
        <p class="mb-4 font-light">
          Receba alertas de leilões, relatórios sobre o saldo das corretoras no dia, ações com distorção de volume e
          diversas outras estratégias
        </p>
        <a
          href="#pricing"
          class="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
        >
          Escolha um plano
        </a>
      </div>
    </div>
  </section>

  <section class="fade-in bg-gray-50 dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div
        class="lg:flex-grow lg:pr-24 md:pr-16 max-w-screen-lg flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
      >
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Ainda Têm alguma dúvida? <br class="hidden lg:inline-block" />
        </h1>

        <p class="mb-8 leading-relaxed">
          Para que nossos assinantes tenham a melhor experiência possível, criamos uma sessão educacional ensinando como
          fazer a utilização da plataforma. Através dela é possível aprender do incício ao fim como utilizar tudo que o
          Hunter pode oferecer.
        </p>
        <div class="flex justify-center">
          <a
            href="https://wa.me/5511973428892"
            target="_blank"
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Falar com especialista
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="fade-in bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h2 class="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
          Inicie seu teste grátis hoje
        </h2>
        <p class="font-light text-gray-500 dark:text-gray-400 md:text-lg">Experimente qualquer plano por 7 dias</p>
        <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
          Cancele a qualquer momento sem ser cobrado.
        </p>
        <a
          href="#pricing"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >Escolha um plano e experimente por 7 dias</a
        >
      </div>
    </div>
  </section>

  <Footer />
  <WhatsApp :showWidget="showWhatsApp" :showMessage="showWhatsAppMsg" />
  <!-- end navbar -->
</template>

<script>
import { ref } from "vue";
import HxcNavbar from "../Navbar.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      openMenu: false,
      mobileOpen: false,
      showWhatsApp: false,
      showWhatsAppMsg: false,
      fadeInElements: [],
      selectedProductI: 0,
      youtubeLink: "https://www.youtube.com/watch?v=TcMBFSGVi1c",

      modalVisible: false,
      openMenu: false,

      items: [
        {
          _id: "62d8695f86a8b1456cbeb815",
          DisplayName: "Plano 1",
          Description: "Alta Performance",
          SelectLabel: "Assine Aqui",
          SelectDescription: "Trial de 7 dias",
          BillingCycles: [
            { Interval: "year", Price: 119880 },
            { Interval: "month", Price: 15990 },
          ],
          Features: [
            {
              Name: "Dashboard",
              Available: true,
            },
            {
              Name: "Watchlist + AVAT",
              Available: true,
            },
            {
              Name: "Módulo de Opções",
              Available: true,
            },
            {
              Name: "Tape Reading",
              Available: true,
            },
            {
              Name: "Hunter Distortions",
              Available: true,
            },
            {
              Name: "Módulo de Alertas",
              Available: true,
            },
            {
              Name: "Hunter Screener",
              Available: true,
            },
            {
              Name: "Intraday Setups + Candlestick",
              Available: true,
            },
            {
              Name: "Open Interest",
              Available: true,
            },
            {
              Name: "Long & Short",
              Available: true,
            },
            {
              Name: "Notícias + Informe CVM",
              Available: true,
            },
            {
              Name: "Cotações Realtime",
              Available: true,
            },
            {
              Name: "Mercado Internacional",
              Available: true,
            },
          ],
        },
      ],
    };
  },
  setup() {},
  mounted() {
    if (this.loggedIn) return this.$router.push("/dashboard");

    setTimeout(() => {
      this.fadeInElements = Array.from(document.getElementsByClassName("fade-in"));
      document.addEventListener(["scroll"], this.handleScroll, { passive: true });
      this.handleScroll();
    }, 50);
    setTimeout(() => {
      this.showWhatsApp = true;
      queueMicrotask(() => {
        setTimeout(() => {
          this.showWhatsAppMsg = true;
          queueMicrotask(() => {
            setTimeout(() => {
              this.showWhatsAppMsg = false;
            }, 2500);
          });
        }, 500);
      });
    }, 5000);
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    product() {
      return this.products[this.selectedProductI];
    },
    ...mapGetters({ billingCycle: "speed/billing_cycle" }),
  },
  components: {
    HxcNavbar,
  },
  unmounted() {
    document.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    checkout(i) {
      if (i == "63bedfe273caae7e430a7f95") {
        this.$store.commit("speed/SET_BILLING_CYCLE", 1);
      }
      this.$store.commit("speed/SET_ITEMS", [{ _id: i, qty: 1 }]);
      this.$router.push("/th/login");
    },
    isElemVisible(el) {
      var rect = el.getBoundingClientRect();
      var elemTop = rect.top + 200; // 200 = buffer
      var elemBottom = rect.bottom;
      return elemTop < window.innerHeight && elemBottom >= 0;
    },
    handleScroll(evt) {
      for (var i = 0; i < this.fadeInElements.length; i++) {
        var elem = this.fadeInElements[i];
        if (this.isElemVisible(elem)) {
          elem.style.opacity = "1";
          elem.style.transform = "scale(1)";
          this.fadeInElements.splice(i, 1); // only allow it to run once
        }
      }
    },
    // async checkout(type, item) {
    //   await this.$store.dispatch('checkout/update', { clear: true, type });
    //   console.log('type', type, item);
    //   this.$store
    //     .dispatch('checkout/add_to_cart', {
    //       _id: item._id,
    //       price: this.billingCycle ? item.price / 100 : item.price / 1200,
    //       billing_cycle: this.billingCycle,
    //       name: item.name,
    //       discount: item.discount,
    //     })
    //     .then(
    //       (m) => {
    //         this.$router.push(`/2`);
    //       },
    //       (m) => {},
    //     );
    // },
    async selectBra() {
      this.$router.push("/register/?utm_source=sejabra");
    },
    toggleBillingCycle() {
      this.$store.commit("speed/SET_BILLING_CYCLE", this.billingCycle == 0 ? 1 : 0);
    },
    selectProduct(i = 1) {
      this.selectedProductI = i;
      this.modalVisible = true;
    },
    async selectPack({ _id, Price, DisplayName, Tags, PriceWeight }) {
      // using options

      await this.$store.dispatch("checkout/clear_cart");
      this.$store
        .dispatch("checkout/add_to_cart", {
          _id,
          Price,
          billingCycle: this.billingCycle,
          DisplayName,
          Tags,
          PriceWeight,
        })
        .then(
          (m) => {
            this.$router.push(`/c4?type=recurrent&priceId=${_id}&cycle=${this.billingCycle}`);
          },
          (m) => {}
        );
    },
  },
  watch: {},
};
</script>

<style scoped>
@import url("//fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400&display=swap");

body {
  font-family: Poppins, sans-serif;
}

.carousel__prev,
.carousel__next {
  background-color: rgb(14 165 233);
  box-sizing: content-box;
  border: 5px solid white;
  margin-left: 15px;
}

.carousel__prev {
  margin-left: 15px;
}
.carousel__next {
  margin-right: 15px;
}
.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}
.carousel__pagination-button,
.carousel__pagination-button {
  background-color: rgb(14 165 233);
}

.carousel__pagination-button--active {
  background-color: rgb(8, 115, 255) !important;
}
#app {
  height: auto !important;
}
</style>
