<template>
  <!-- component -->

  <div class="bg-th-dark-2 text-white min-h-screen flex items-center">
    <div
      class="container bg-th-dark mx-auto p-4 flex flex-col md:flex-row items-center rounded-lg hover:shadow-sky-500/90 shadow-lg shadow-sky-500/70 ..."
    >
      <div class="text-center p-4">
        <img
          src="https://cdn-th.s3.sa-east-1.amazonaws.com/assets/favicon.svg"
          class="h-24 md:h-96 w-24 md:w-96"
          alt="Logo TradeHunter"
        />
      </div>
      <div class="text-center md:text-left p-4">
        <div class="text-2xl md:text-6xl font-medium">Sua Sessão Expirou</div>
        <div class="text-xl md:text-3xl font-medium mb-4">Por que isso aconteceu?</div>
        <div class="text-lg mb-8">
          Devido nossa política de segurança, não podemos processar sua solicitação de forma automática. Realize o login
          novamente para continuar utilizando a plataforma.
        </div>
        <a
          href="/login"
          class="bg-th-dark mb-5 text-center border border-sky-400 text-white py-2 px-6 rounded text-lg hover:text-sky-500 shadow-lg shadow-sky-500/50 ..."
          >Fazer Login</a
        >
      </div>
    </div>
  </div>
</template>

<style>
.gradient {
  background-image: linear-gradient(135deg, #684ca0 35%, #1c4ca0 100%);
}
</style>
