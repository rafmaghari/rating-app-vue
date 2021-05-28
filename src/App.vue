<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import Header from '@/components/common/Header'
import './assets/tailwind.css';

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {

}
</script>
