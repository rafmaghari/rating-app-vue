<template>
  <div id="app">
<!--    <HeaderWithSideBar />-->
    <Header />
    <router-view/>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import HeaderWithSideBar from '@/components/common/HeaderWithSideBar'
import Header from '@/components/common/Header'
import './assets/tailwind.css';

@Component({
  components: {
    HeaderWithSideBar,
    Header
  },
})
export default class App extends Vue {

}
</script>
