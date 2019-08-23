<template>
  <div id="home">
    <section class="section" style="max-width:960px; margin:auto">
      <div style="position: relative; float:right;  padding:5px">
        <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <span>Sort by:&nbsp;</span> 
            <div class="select">
              <select v-model="sort">
                <option selected value=1>Oldest</option>
                <option selected value=2>Newest</option>
                <option value=3>Most Liked</option>
              </select>
            </div>
          </div>
        </nav>    
      </div>
      <item-box :list="this.listOfMovies">
      </item-box>
    </section>
  </div>
</template>

<script>
import itemBox from '../components/ItemBox.vue';
export default {
  name: 'home',
  data: function(){ 
    return {
      listOfMovies: [],
      sort: 0,
    }
  },
  components: {
    itemBox
  },
  watch: {
    'sort': function (newVal, oldVal) {		
      if(newVal==3) this.listOfMovies= this.sortByLikes(this.listOfMovies);
      if(newVal==2) this.listOfMovies = this.sortByNew(this.listOfMovies);
      if(newVal==1) this.listOfMovies= this.sortByOld(this.listOfMovies);
    }
  },
  created: function(){
    if (this.movies.length === 0) {  
       this.fetchData().then(()=>{
         this.fetchCloudData()
       }) 
    }
    this.listOfMovies=this.movies;
    console.log(this.listOfMovies)   
  },
}
</script>

<style>
  #home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 30px;
  color: #2c3e50;
  }
</style>