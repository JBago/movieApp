<template>
  <div :key="keyG" id="favorites">
    <section  class="section" style="max-width:960px; margin:auto">
      <item-box  :list="listOfFavorites" emptyMessage="No Favorites Found"></item-box>
    </section>
  </div>
</template>

<script>
import itemBox from '../components/ItemBox.vue';
import { setTimeout } from 'timers';
export default {
  name: 'favorites',
  data: function(){ 
    return {
        listOfFavorites: [],
        keyG: 0
    }
  },
  watch: {
    'keyG':function(newVal,oldVal){
      console.log(newVal);
      console.log(this.listOfFavorites);
    }
  },
  components: {
    itemBox
  },
  
  created: function(){
    if (this.movies.length === 0) {  
      this.fetchData().then(()=>{
        this.fetchCloudData()
      }).then(()=>{
          setTimeout(() => {
          this.favorites.forEach(element => {
          this.listOfFavorites.push(this.$store.getters.getMovie(element))
          });
          this.keyG++
          }, 500);     
      })    
    }
    else {
        this.favorites.forEach(element => {
        this.listOfFavorites.push(this.$store.getters.getMovie(element))
    });  
    }
  },
  mounted: function(){
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
  #favorites {
  text-align: center;
  padding-top: 30px;
  color: #2c3e50;
  }
  .viewIcon{
    border: 1px solid #AcDeDA;
    border-radius: 4px;
    padding-right: 1.5px;
    margin-left: 5px;
  }
</style>