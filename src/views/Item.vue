<template>
  <div class="flex justify-between">
    <div class="flex mx-10 p-5 w-2/6 max-h-screen">
      <TopItem :topTen="topTenRated"/>
    </div>
    <div class="w-5/6">
      <ItemList :item="item" v-if="item"/>
    </div>
  </div>
</template>

<script>
import {Component, Vue, Watch} from 'vue-property-decorator';
import ItemService from "../services/ItemService";
import TopItem from "../components/Item/TopItem";
import ItemList from "../components/Item/ItemList";

@Component({
  components: {ItemList, TopItem}
})
export default class Item extends Vue {
  topTenRated = [];
  item = null;
  mounted() {
    this.topTenRatedItems();
    this.getItem();
  }

  @Watch('$route')
  onRouteChange() {
    this.getItem();
  }

  async getItem () {
    const itemService = new ItemService();
    const item = await itemService.getItemById(this.$route.params.id);
    this.item = item.data;
  }

  async topTenRatedItems() {
    const itemService = new ItemService();
    const topTen = await itemService.getTopRated();
    this.topTenRated = topTen.data
  }

}
</script>

<style scoped>

</style>