<template>
  <section class="flex items-center justify-center px-4 bg-white">
    <div class="max-w-2xl w-full rounded-lg shadow-lg p-4">
      <h5 class="font-semibold text-md tracking-wide uppercase">
        <span class="hover:underline hover:text-indigo-400 text-gray-600"
              @click="$router.push({path: `/item/${item.id}`})"
        >
              {{ item.title }}
        </span>
        <span class="text-xs text-indigo-300 lowercase mx-1">#{{ item.category.name }}</span>
        <span class="text-xs text-gray-400 lowercase">{{moment(item.created_at).startOf('hour').fromNow() }}</span>
      </h5>
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
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator';
import RatingService from "@/services/RatingService";
import ItemComment from "@/components/Item/ItemComment";
import UserStore from "@/store/UserStore";
@Component({
  components: {ItemComment}
})
export default class ItemList extends Vue {
  @Prop() item;

  get user() {
    return UserStore.userInfo;
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
    const param = {
      'user_id': this.user.id,
      'item_id': item.id,
      'rating': type === 'upvoted' ? 1: 0
    }
    const ratingService = new RatingService();
    const vote = await ratingService.vote(param);
    if (vote) {
      const findById = item.ratings.find(item => item.id === vote.data.id)
      if (findById) {
          findById.rating = vote.data.rating;
      } else {
         item.ratings.push(vote.data)
      }
      this.$notify({type: 'success',title: "Rating App", text: `You've been ${type} this item`});
    }
  }


}
</script>

<style scoped>

</style>