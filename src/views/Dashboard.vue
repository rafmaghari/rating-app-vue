<template>
  <div>
    <h1>Dashboard</h1>
    {{userInfo}}
    <button class="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            @click="logout"
    >
      LOGOUT
    </button>

    <t-button>Example button</t-button>
  </div>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import UserStore from "../store/UserStore";
@Component
export default class Dashboard extends Vue {
  get userInfo() {
    return UserStore.userInfo;
  }

  logout() {
    UserStore.logout();
    this.$router.push('/login');
  }
}
</script>