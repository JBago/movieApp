<template>
      <div class="box" id="content-box">
        <div v-bind:key="item.id" v-for="item in list" class="container" style="padding: 10px 0;">
          <item-card style="margin: auto" :item="item"></item-card>
        </div>
        <span v-show="list==false">{{emptyMessage}}</span>
      </div>
</template>

<script>
import itemCard from './ItemCard.vue';
export default {
  name: 'item-box',
  data: function(){
    return {       
    }
  },
  created: function(){

  },
  components: { itemCard },
  methods: {
  },
  props:{
      list: Array,
      emptyMessage: String
  }
}
</script>

<style>
  #content-box {
    padding: 20px;
    max-width: 960px;
    text-align: center;
    background-color: #AcDeDA;
    margin-top: 50px;
  }
</style>