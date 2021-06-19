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
        <div v-if="item.comments.length > 0" class="my-1">
          <div id="task-comments" v-for="(comment,index) in item.comments" :key="index">
            <div class="bg-white rounded-lg p-2 flex flex-col justify-center items-center md:items-start">
              <div class="flex justify-center mr-2">
                <img alt="avatar"
                     class="rounded-full w-5 h-5 mr-1 shadow-lg mb-1"
                     height="10"
                     src="https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"
                     width="10">
                <h3 class="text-purple-600 font-semibold text-xs text-center md:text-left ">{{ comment.user.first_name}} {{comment.user.last_name}}</h3>
              </div>
              <p style="width: 90%" class="text-gray-600 text-xs text-center md:text-left ">{{comment.content }}</p>
            </div>
          </div>
        </div>
        <div class="flex items-center mt-1">
          <input
              :id="item.id"
              class="appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
              placeholder="Add Comment here..." type="text"
              @keyup.enter="comment(item)"
              v-model="item.comment"
          >
        </div>
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
@Component
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
       if (vote) {
          return vote.rating === type ? 'text-indigo-500' : 'text-gray-300'
       }
       return 'text-gray-300';
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
     }
   }
}
</script>