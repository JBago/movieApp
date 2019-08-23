<template>
  <div id="app">
    <div class="navbar is-fixed-top" style="  background-color: #0c4A8A;"></div>
    <div id="nav" class="navbar container is-fixed-top">   
      <div class="navbar-brand">
      <a  style="padding-top: 6px; padding-left:0.5rem;">
        <router-link to="/"><img src="./assets/MovieAppLogo.png" width="120" height="42"></router-link>
      </a>
    <a role="button" class="navbar-burger-custom is-hidden-desktop" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span class="icon has-text-info">
        <i class="mdi mdi-24px mdi-menu"></i>
      </span>
    </a>
  </div>
      <div id="navbarBasicExample"  class="navbar-menu navbar-menu-custom ">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">
            <span class="is-family-primary" style="color: #A9F0B9;">HOME</span>
          </router-link>
          <router-link to="/favorites" class="navbar-item">
            <span class="is-family-primary" style="color: #A9F0B9;">FAVORITES</span>
          </router-link>
        </div>

      <div class="navbar-end">
        <div class="navbar-item" >
        <div class="field has-addons" style="padding:0 2rem">
          <div class="control has-icons-left" style="margin-left: auto">
              <span class="icon is-left">
                <i class="mdi mdi-dark mdi-24px mdi-magnify"></i>
              </span>
            <input v-model="searchBar" class="input" type="text" placeholder="Find a movie">
          </div>
          <div class="control" style="margin-right: auto">
            <a @click="search" class="button" style="background-color: gold">
              Search
            </a>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
    <router-view :key="keyG" />
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data: function(){ 
    return {
      searchBar: '',
      keyG: 0       
    }
  },
  methods: {
    search() {
      if(this.searchBar!=''){
        this.$router.push({ name: 'search', params: { string: this.searchBar } });
        this.keyG++; //force render
      }
    }
  },
  created: function(){
    // if (this.movies.length === 0) {  
    //    this.fetchData().then(()=>{
    //      this.fetchCloudData()
    //    }) 
    // }
    document.addEventListener('DOMContentLoaded', () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger-custom'), 0);
    if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        $target.classList.toggle('is-active');
      });
    });
  }

});
  }
}
</script>

<style>

@media screen and (max-width: 1023px) { 
.navbar-menu {
    background-color: #043b72 !important;  
    padding: 0 8rem
 } 
}
@media screen and (min-width: 1023px) { 
.navbar-start {
  padding-left: 1rem
 } 
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav{
   background-color: #0c4A8A;

}
.navbar-burger-custom{
  cursor: pointer;
  display: block;
  height: 3.25rem;
  position: relative;
  width: 3.25rem;
  margin-left: auto;
  padding: 0.75rem 0;
  color: #2c3e50
}


</style>
