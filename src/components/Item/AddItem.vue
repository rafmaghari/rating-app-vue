<template>
  <section class="flex items-center justify-center px-4 bg-white">
    <div class="max-w-2xl w-full rounded-lg shadow-lg p-4">
      <label class="text-sm text-gray-600">Add an item to rate.</label>
      <br>
      <label class="text-gray-600 font-light text-xs">Title</label>
      <input
          v-model="title"
          class="appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs my-1"
          type="text">
      <label class="text-gray-600 fon3t-light text-xs">Content</label>
      <textarea
          v-model="content"
          class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-xs"
          rows="2">
      </textarea>
      <label class="text-gray-600 fon3t-light text-xs">Category</label>
      <select v-model="category_id"
              autocomplete="country"
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option v-for="(category, index) in categories" :key="index" :value="category.id">{{ category.name }}</option>
      </select>
      <div class="flex items-center justify-end mt-1">
        <button
            class="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded
                     shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            @click="addItem"
        > POST
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { Component, Vue, Prop} from 'vue-property-decorator';
import UserStore from "@/store/UserStore";
import ItemService from "@/services/ItemService";
@Component
export default class AddItem extends Vue {
  @Prop() categories;
  title = '';
  content = '';
  category_id =  '';

  get user() {
    return UserStore.userInfo;
  }

  async addItem() {
    if (this.title === "" || this.content === "" || this.category_id === '') {
      this.$notify({type: 'error',title: "Rating App", text: 'Please fill up all the information needed.'});
      return;
    }
    const params = {
      'user_id': this.user.id,
      'title': this.title,
      'content': this.content,
      'category_id': this.category_id
    }
    const itemService = new ItemService();
    const response = await itemService.add(params);
    if (response) {
      this.title = '';
      this.content = '';
      this.category_id = '';
      this.$emit('itemAdd', response.data)
      this.$notify({type: 'success',title: "Rating App", text: response.message});
    }
  }
}
</script>