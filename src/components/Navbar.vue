<template>
  <div class="bg-white nav1 w-full flex flex-auto sticky top-0" style="z-index: 999; height: 50px">
    <div class="flex pl-5">
      <a href="/" class="m-auto flex justify-center items-center font-bold text-gray-700 dark:text-white">
        <img v-if="isDarkMode" alt="Logo" class="w-auto h-8 mr-1.5" src="/stBranca.png" />
        <img v-else alt="Logo" class="w-auto h-8 mr-1.5" src="/stPreta.png" />
      </a>
    </div>

    <div class="flex w-full grow items-center pr-2">
      <ThemeToggler class="ml-auto px-2 m-2" :isDarkMode="isDarkMode" />

      <!-- Profile dropdown -->
      <Menu as="div" class="ml-1 relative text-black dark:text-white">
        <div>
          <MenuButton class="bg-transparent flex text-sm rounded-full">
            <!---   <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" /> --->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 flex text-black"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="bg-white origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 dark:bg-th-dark-secondary dark:text-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <MenuItem v-slot="{ active }">
              <a
                href="/user/profile"
                :class="[
                  active ? 'bg-gray-100 dark:bg-th-dark-primary' : '',
                  'block px-4 py-2 text-sm text-gray-700 dark:text-white',
                ]"
                >Perfil</a
              >
            </MenuItem>
            <!-- <MenuItem v-slot="{ active }">
              <a
                href="/contact"
                :class="[
                  active ? 'bg-gray-100 dark:bg-th-dark-primary' : '',
                  'block px-4 py-2 text-sm text-gray-700 dark:text-white',
                ]"
                >Contato</a
              >
            </MenuItem> -->
            <MenuItem v-slot="{ active }">
              <a
                @click="logout"
                :class="[
                  active ? 'bg-gray-100 dark:bg-th-dark-primary' : '',
                  'block px-4 py-2 text-sm text-gray-700 dark:text-white',
                ]"
                >Logout</a
              >
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ThemeToggler from "./ThemeToggler.vue";

import { UserIcon } from "@heroicons/vue/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

export default {
  components: {
    ThemeToggler,
    UserIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },
  computed: {
    ...mapGetters("theme", ["isDarkMode"]),
  },
  methods: {
    logout() {
      console.log("cliquei logout");
      this.$store.dispatch("auth/logout2").then(() => this.$router.push("/login"));
    },
  },
};
</script>

<style>
.nav1 {
  height: 60px;
}
</style>
