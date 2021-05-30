<template>
  <div id="app">
    <HeaderWithSideBar />
    <router-view/>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import HeaderWithSideBar from '@/components/common/HeaderWithSideBar'
import './assets/tailwind.css';

@Component({
  components: {
    HeaderWithSideBar,
  },
})
export default class App extends Vue {

}
</script>
