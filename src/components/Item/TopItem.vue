<template>
  <div class="w-full">
    <h1 class="text-md text-indigo-400">Top 10 Rated Items</h1>
    <div class="flex justify-center mt-1">
      <div class="bg-white shadow-xl rounded-lg w-full">
        <ul>
          <li v-for="(item, index) in topTen" @click="$router.push({path: `/item/${item.id}`})"
              :key="index" class="py-2 px-2 hover:bg-indigo-400 hover:text-indigo-50 hover:underline cursor-pointer text-sm text-gray-500">
             #{{index + 1}} - {{item.title}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class TopItem extends Vue {
@Prop() topTen;
}
</script>

<style scoped>

</style>