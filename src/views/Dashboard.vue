<template>
  <div>
    <h1>Dashboard</h1>
    {{userInfo}}
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
}
</script>