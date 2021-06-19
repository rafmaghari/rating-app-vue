<template>
  <div>
    <section class="flex items-center justify-center px-4 bg-white" v-for="(item, index) in items" :key="index">
      <div class="max-w-lg w-full rounded-lg shadow-lg p-4">
        <h5 class="font-semibold text-md tracking-wide">{{ item.title }}</h5>
        <p class="text-gray-500 my-1 text-sm">
          {{ item.content }}
        </p>
        <div class="flex items-center justify-end font-bold">
         <span class="ml-2 text-sm text-gray-500">
           <font-awesome-icon icon="comment" class="mr-1 cursor-pointer"/>
           {{ item.comments.length}}
         </span>
         <span class="ml-2 text-sm" :class="myVote(1,item)" @click="btnVote('upvoted', item)">
           <font-awesome-icon class="mr-1 cursor-pointer" icon="arrow-up"/>
           {{ upVote(item.ratings)}}
         </span>
         <span class="ml-2 text-sm" :class="myVote(0,item)" @click="btnVote('downvoted', item)">
           <font-awesome-icon icon="arrow-down" class="mr-1 cursor-pointer"/>
           {{ downVote(item.ratings) }}
         </span>
        </div>
        <ItemComment :item="item" />
      </div>
    </section>
  </div>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import ItemService from "@/services/ItemService";
import RatingService from "@/services/RatingService";
import UserStore from "@/store/UserStore";
import ItemCommentService from "@/services/ItemCommentService";
import ItemComment from "@/components/Item/ItemComment";
@Component({
  components: {ItemComment}
})
export default class Dashboard extends Vue {
   items = [];

   get user() {
    return UserStore.userInfo;
   }

   mounted() {
      this.getAllItem();
   }

   async getAllItem() {
     const itemService = new ItemService();
     const items = await itemService.getAll();
     this.items = items.data
   }

  upVote = (rating) => {
     return rating.filter(item => item.rating === 1).length;
   };

   downVote = rating => {
     return rating.filter(item => item.rating === 0).length;
   };

   userVote = item => item.ratings.find(item => item.user_id === this.user.id);

   myVote = (type, item) => {
       const vote = this.userVote(item)
       return vote ? vote.rating === type ? 'text-indigo-500' : 'text-gray-300' : 'text-gray-300';
   }

   async btnVote(type, item) {
     if (this.userVote(item) && (this.userVote(item).rating === 1 && type === "upvoted" || this.userVote(item).rating === 0 && type === "downvoted")) {
       return;
     }
     console.log('here')
     const param = {
       'user_id': this.user.id,
       'item_id': item.id,
       'rating': type === 'upvoted' ? 1: 0
     }
     const ratingService = new RatingService();
     const vote = await ratingService.vote(param);
     if (vote) {
       item.ratings.push(vote.data)
       this.$notify({type: 'success',title: "Rating App", text: `You've been ${type} this item`});
     }
   }

   async comment(item) {
     const param = {
       'user_id': this.user.id,
       'item_id': item.id,
       'content': item.comment
     }
     const itemCommentService = new ItemCommentService();
     const comment = await itemCommentService.comment(param);
     if (comment) {
       comment.data.user = this.user
       item.comments.push(comment.data)
       item.comment = '';
     }
   }
}
</script>