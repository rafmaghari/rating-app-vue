<template>
  <div>
    <p v-if="item.comments.length > 0"
       class="text-xs underline text-indigo-500 cursor-pointer"
       @click="toggleComment">{{!toggle ? 'Show Comment' : 'Hide Comment'}}
    </p>
    <div v-if="item.comments.length > 0" class="my-1" v-show="toggle">
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
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator';
import ItemCommentService from "@/services/ItemCommentService";
import UserStore from "@/store/UserStore";

@Component
export default class ItemComment extends Vue {
  @Prop() item;
  toggle = false;
  get user() {
    return UserStore.userInfo;
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

  toggleComment() {
    this.toggle = !this.toggle;
  }

}
</script>

<style scoped>

</style>