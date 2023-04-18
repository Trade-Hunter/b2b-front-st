<template>
  <div class="flex">
    <div
      class="fixed inset-y-0 left-0 z-10 bg-white overflow-y-auto overflow-x-hidden transition duration-300 transform md:w-64"
      :class="{ 'w-16': isCollapsed, '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }"
    >
      <div class="flex flex-col h-screen">
        <div class="flex-grow overflow-y-auto">
          <sidebar-menu-item
            v-for="(item, index) in items"
            :key="index"
            :title="item.title"
            :icon="item.icon"
            :isCollapsed="isCollapsed"
          />
        </div>
        <div class="h-16 flex justify-center items-center">
          <!-- This button should collapse and expand sidebar menu -->
          <button @click="isCollapsed = !isCollapsed" :class="{ collapsed: isCollapsed }">
            <svg class="w-6 h-6 fill-current text-gray-500" v-if="!isCollapsed" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M2.75 6.75h18.5a1.25 1.25 0 0 0 0-2.5H2.75a1.25 1.25 0 0 0 0 2.5zm0 7.5h18.5a1.25 1.25 0 1 0 0-2.5H2.75a1.25 1.25 0 1 0 0 2.5zm0 7.5h18.5a1.25 1.25 0 0 0 0-2.5H2.75a1.25 1.25 0 0 0 0 2.5z"
              />
            </svg>
            <svg class="w-6 h-6 fill-current text-gray-500" v-else viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M6.47 6.469A1.75 1.75 0 1 0 4.03 4.03l12.94-.004a1.75 1.75 0 1 0 0-3.5l-12.94.004A1.75 1.75 0 0 0 2.28 2.28l.004 12.94a1.75 1.75 0 1 0 3.5 0L6.47 6.469z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="flex-1 md:ml-64">
      <div class="hidden md:block h-screen">
        <div class="h-16 bg-blue-500 flex items-center justify-between px-4 md:px-8">
          <!-- This is the navbar -->
          <div>Navbar</div>
          <button @click="isSidebarOpen = !isSidebarOpen">
            <svg class="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
              <path
                v-if="isSidebarOpen"
                fill-rule="evenodd"
                d="M18.197 7.803a1 1 0 1 1 1.414 1.414L6.414 21.414a1 1 0 0 1-1.414 0l-2.02-2.02a1 1 0 0 1 0-1.414L15.183 6.803a1 1 0 0 1 1.414 1.414L5.394 19.197l.01.011 1.01 1.01a1 1 0 0 1 0 1.414 1 1 0 0 1-.707.293H2.997a1 1 0 0 1-.707-.293 1 1 0 0 1 0-1.414l1.01-1.01 8.293-8.293a1 1 0 0 1 1.414 0zM6.414 2.586a1 1 0 0 1 1.414 0l2.02 2.02a1 1 0 0 1 0 1.414L8.23 9.197a1 1 0 0 1-1.414-1.414l1.01-1.01-8.293 8.293a1 1 0 0 1-1.414 0 1 1 0 0 1 0-1.414l8.293-8.293-1.01-1.01a1 1 0 0 1 0-1.414z"
              />
              <path
                v-else
                fill-rule="evenodd"
                d="M19 9H5a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2zM19 13H5a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2zM5 17h9a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2z"
              />
            </svg>
          </button>
        </div>
        <div class="h-full bg-green-500 px-4 md:px-8">
          <!-- This is the content, it must fit sidebar width when collapsed -->
          Content
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenuItem from "./SidebarMenuItem.vue";

export default {
  components: {
    SidebarMenuItem,
  },
  data() {
    return {
      isSidebarOpen: true,
      isCollapsed: false,
      items: [
        {
          title: "Home",
          icon: '<svg class="w-6 h-6 fill-current" viewBox="0 0  24 24"><path d="M11 20v-9h2v9h5v-11h2l-8-8-8 8h2v11z"/></svg>',
        },
        {
          title: "About",
          icon: '<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M13.05 4.072l4.053 1.55-1.55 4.053-4.053-1.55 1.55-4.053zm-6.316 6.482l4.928-1.897-.6-1.56c-.153-.4.28-.84.684-.685l1.56.6 1.898-4.928c.464-1.204 2.094-1.204 2.558 0l1.898 4.928 1.56-.6c.403-.155.837.28.684.685l-.6 1.56 4.928 1.897c1.204.464 1.204 2.094 0 2.558l-4.928 1.898.6 1.56c.153.403-.28.837-.685.684l-1.56-.6-1.897 4.928c-.464 1.204-2.094 1.204-2.558 0l-1.898-4.928-1.56.6c-.403.155-.837-.28-.684-.685l.6-1.56-4.928-1.898c-1.204-.464-1.204-2.094 0-2.558zm11.262 6.633c.47 0 .865.337.948.801l.53 2.852c.065.352-.12.53-.404.53-.262 0-.494-.194-.605-.532l-.464-1.85h-2.266l-.464 1.85c-.111.338-.343.532-.605.532-.284 0-.47-.178-.404-.53l.53-2.852c.083-.464.478-.801.948-.801.544 0 .931.337 1.014.801l.53 2.852c.083.465-.12.663-.455.663h-.188c-.335 0-.538-.198-.455-.663l.53-2.852c.083-.464.47-.801.949-.801z"/></svg>',
        },
        {
          title: "Contact",
          icon: '<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M16.5 7.5c0-3.036-2.464-5.5-5.5-5.5s-5.5 2.464-5.5 5.5c0 .488.063.957.18 1.401.039.148.037.305-.006.45-.2.598-.372 1.207-.516 1.826-.063.344-.053.72.028 1.07.214.78.546 1.52.976 2.198.12.19.23.386.344.578l.137.23c.081.138.169.277.25.416 329.624.506.926.506 1.5zm-6.5 12c2.76 0 5.32-.98 7.31-2.6-.38-1.2-1.06-2.27-2-3.12-1.09-.97-2.38-1.65-3.8-1.94l-.83-.15-.17-.82c-.29-1.37-.98-2.66-1.94-3.74-1.35-1.53-3.06-2.63-4.94-3.26-.39-.12-.8-.18-1.22-.18-.51 0-1.01.07-1.5.2-1.89.63-3.59 1.73-4.94 3.26-.96 1.08-1.65 2.37-1.94 3.74l-.17.82-.83.15c-1.42.28-2.71.97-3.8 1.94-.95.85-1.63 1.92-2 3.12 1.99 1.64 4.55 2.6 7.33 2.6zm8.5-7.5v-1h-1v1h1zm-2 0v-1h-1v1h1zm-2 0v-1h-1v1h1zm-2 0v-1h-1v1h1zm4-5v-1h-1v1h1zm-2 0v-1h-1v1h1zm-2 0v-1h-1v1h1z"/></svg>',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.sidebar-icons {
  li {
    span {
      display: none;
    }
  }
  svg {
    margin-right: 0;
  }
}

.isCollapsed .sidebar-icons {
  li {
    span {
      display: none;
    }
  }
  svg {
    margin-right: 0;
  }
}

@media (min-width: 768px) {
  .sidebar-icons {
    li {
      span {
        display: inline-block;
      }
    }
    svg {
      margin-right: 0.75rem;
    }
  }
  .isCollapsed .sidebar-icons {
    li {
      span {
        display: none;
      }
    }
    svg {
      margin-right: 0;
    }
  }
}
</style>
