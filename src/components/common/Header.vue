<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-500 mb-3">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
        <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
          RATING APP
        </a>
        <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
          <i><font-awesome-icon icon="bars" /></i>
        </button>
      </div>
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
        <ul class="flex flex-col lg:flex-row list-none ml-auto" v-if="!isLoggedIn">
          <li class="nav-item">
            <router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/login">
              <i class="fab fa-twitter text-lg leading-lg text-white opacity-75" /><span class="ml-2">LOGIN</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/register">
              <i class="fab fa-pinterest text-lg leading-lg text-white opacity-75" /><span class="ml-2">REGISTER</span>
            </router-link>
          </li>
        </ul>
        <ul class="flex flex-col lg:flex-row list-none ml-auto" v-else>
          <li class="nav-item">
            <router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/home">
              <i class="fab fa-twitter text-lg leading-lg text-white opacity-75" />
              <span class="ml-2"><font-awesome-icon icon="home"  class="mr-2"/>Home
              </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/profile">
              <i class="fab fa-twitter text-lg leading-lg text-white opacity-75" />
              <span class="ml-2"><font-awesome-icon icon="user"  class="mr-2"/>{{ userInfo.first_name}}
              </span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" @click="logout">
              <i class="fab fa-twitter text-lg leading-lg text-white opacity-75" /><span class="ml-2">
              <font-awesome-icon icon="sign-out-alt" class="mr-2"/>LOGOUT </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator';
import UserStore from "@/store/UserStore";

@Component
export default class Header extends Vue {
  showMenu = false;

  get userInfo() {
    return UserStore.userInfo;
  }

  get isLoggedIn() {
    return UserStore.isLoggedIn;
  }

  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }

  logout() {
    UserStore.logout();
    this.$router.push('/login');
  }
}
</script>

