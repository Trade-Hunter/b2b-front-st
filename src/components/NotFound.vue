<template>
  <!-- component -->

  <div class="gradient text-white min-h-screen flex items-center">
    <div class="container mx-auto p-4 flex flex-wrap items-center">
      <div class="w-full md:w-5/12 text-center p-4">
        <img src="https://cdn-th.s3.sa-east-1.amazonaws.com/assets/icon.png" alt="Not Found" />
      </div>
      <div class="w-full md:w-7/12 text-center md:text-left p-4">
        <div class="text-6xl font-medium">404</div>
        <div class="text-xl md:text-3xl font-medium mb-4">Oops. Esta página desapareceu.</div>
        <div class="text-lg mb-8">
          Você pode ter digitado incorretamente o endereço ou a página pode ter sido movida.
        </div>
        <a href="#" class="border border-white rounded p-4">Ir para Home</a>
      </div>
    </div>
  </div>
</template>

<style>
.gradient {
  background-image: linear-gradient(135deg, #684ca0 35%, #1c4ca0 100%);
}
</style>
