<template>
  <div class="flex justify-between">
    <div class="flex mx-10 p-5 w-2/6 max-h-screen">
      <TopItem :topTen="topTenRated"/>
    </div>
    <div class="w-4/6">
      <AddItem @itemAdd="itemAdd" :categories="categories"/>
      <ItemList v-for="(item, index) in items" :key="index" :item="item"/>
    </div>

  </div>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import AddItem from "@/components/Item/AddItem";
import ItemComment from "@/components/Item/ItemComment";
import TopItem from "@/components/Item/TopItem";
import ItemService from "@/services/ItemService";
import CategoryService from "@/services/CategoryService";
import UserStore from "@/store/UserStore";
import ItemList from "@/components/Item/ItemList";
@Component({
  components: {ItemList, TopItem, AddItem, ItemComment}
})
export default class Dashboard extends Vue {
   items = [];
   categories = [];
   topTenRated = [];

   get user() {
    return UserStore.userInfo;
   }

   mounted() {
      this.getAllItem();
      this.getCategories();
      this.topTenRatedItems();
   }

   async getAllItem() {
     const itemService = new ItemService();
     const items = await itemService.getAll();
     this.items = items.data
   }

   async getCategories() {
     const categoryService = new CategoryService();
     const category = await categoryService.getAllCategories();
     this.categories = category
   }

  async topTenRatedItems() {
    const itemService = new ItemService();
    const topTen = await itemService.getTopRated();
    this.topTenRated = topTen.data
  }

  itemAdd(item) {
    if(item) {
      this.items.unshift(item)
    }
  }


}
</script>