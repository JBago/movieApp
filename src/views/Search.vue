<template>
  <div id="search">
    <section class="section" style="max-width:960px; margin:auto">
     
      <item-box :list="searchResults" emptyMessage="No Results"></item-box>
    </section>
  </div>
</template>


<script>
import itemBox from '../components/ItemBox.vue';
export default {
  name: 'search',
  data: function(){
    return {
        searchResults: [],
    }
  },
  components: {
    itemBox
  },

  created: function(){
    var options = {
    shouldSort: true,
    threshold: 0.2,
    location: 1,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 0,
    keys: [
        "title"
      ]
    };
    if (this.movies.length === 0) {  
      this.fetchData().then(()=>{
            this.$search(this.$route.params.string, this.movies, options).then(results => {
              this.searchResults = results;
            })
            this.fetchCloudData()
        }) 
    }
    else {
            this.$search(this.$route.params.string, this.movies, options).then(results => {
            this.searchResults = results;
            })
        }  
  },
  methods: {
  }
}
</script>

<style>
  #buttons {
    position: relative;
    bottom: 0;
  }
  #search{
    padding-top: 30px;
  }
</style>
