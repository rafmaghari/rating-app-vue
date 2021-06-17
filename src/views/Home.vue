<template>
  <div>
    <section class="flex items-center justify-center px-4 bg-white" v-for="(item, index) in items" :key="index">
      <div class="max-w-lg w-full rounded-lg shadow-lg p-4">
        <h5 class="font-semibold text-md tracking-wide">{{ item.title }}</h5>
        <p class="text-gray-500 my-1 text-sm">
          {{ item.content }}
        </p>
        <div class="flex items-center justify-end font-bold">
         <span class="ml-2 text-sm text-indigo-500"><font-awesome-icon icon="comment" class="mr-1 cursor-pointer"/>96</span>
         <span class="ml-2 text-sm text-green-400"><font-awesome-icon icon="arrow-up" class="mr-1 cursor-pointer"/>{{ upVote(item.ratings)}}</span>
         <span class="ml-2 text-sm text-red-300"><font-awesome-icon icon="arrow-down" class="mr-1 cursor-pointer"/> {{ downVote(item.ratings) }}</span>
        </div>
        <div class="flex items-center mt-2">
          <input
              :id="item.id"
              class="appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
              placeholder="Add Comment here..." type="text">
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import ItemService from "@/services/ItemService";
@Component
export default class Dashboard extends Vue {
   items = [];
   async mounted() {
     const itemService = new ItemService();
     const items = await itemService.getAll();
     this.items = items.data
   }

   upVote = (rating) => rating.filter(item => item.rating === 1).length;

   downVote = rating => rating.filter(item => item.rating === 0).length;
}
</script>