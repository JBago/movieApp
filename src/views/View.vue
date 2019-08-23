<template>
<div>
  <section class="section" id="content">
    <div class="container box" id="content-box">
      <div class="columns">
        <div class="column">
          <figure class="image">
            <img :src="selectedObject.cover">
          </figure>
        </div>
        <div class="column" id="contentColumn">
          <span class="is-size-4 has-text-weight-medium is-family-primary">
                  {{selectedObject.title}}
                  <a @click="goBack" class="button icon is-medium is-pulled-right" style="background-color: #09467F">
                      <i class="mdi mdi-light mdi-24px mdi-arrow-left"></i>
                  </a>
          </span><br><br><br>
          <div class="has-text-left">
            <span class="is-size-5 is-family-primary">
                  Release Date: {{fixDate(selectedObject.releaseDate)}}
                  <br><br>
                  Country:  {{selectedObject.releaseCountry}}
                  <br><br>
                  Rating:  {{selectedObject.rating}}/10
            </span>
            <br><br><br>
            <a :href="'http://www.imdb.com/title/'+selectedObject.id" class="button is-dark">IMDb link</a>
            <br><br><br><br><br><br>
          </div> 
                      <nav class="level is-mobile" id="buttons">
              <div class="level-item has-text-centered">
                <div  >
                  <p class="is-size-6 is-family-primary has-text-weight-bold">LIKE</p>
                  <span class="icon is-medium" style="position:relative; right: -16px">
                      <i class="mdi mdi-36px mdi-arrow-up-bold-outline"></i>
                  </span>
                  <span id="liked" @click="likeThis" class="icon is-medium disabled"  style="position:relative; right: 16px; color: #4545D8">
                      <i class="mdi mdi-36px mdi-arrow-up-bold"></i>
                  </span>
                  <span :key="keyG" style="position: relative; bottom: 10px" class="is-size-6 is-family-primary has-text-weight-bold">{{selectedObject.likes}}</span>
                  <span class="icon is-medium" style="position:relative; right: -16px">
                    <i class="mdi mdi-36px mdi-arrow-down-bold-outline"></i>
                  </span>
                  <span id="disliked" @click="dislikeThis" class="icon is-medium disabled" style="position:relative; right: 16px; color: #D84545">
                      <i class="mdi mdi-36px mdi-arrow-down-bold"></i>
                  </span>
                </div>
              </div>
              <div class="level-item has-text-centered">
              </div>
              <div class="level-item has-text-centered">
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="is-size-6 is-family-primary has-text-weight-bold">FAVORITE</p>
                  <span class="icon is-medium" style="position:relative; right: -16px">
                    <i class="mdi mdi-36px mdi-heart-outline"></i>
                  </span>
                  <span id="favorited"  @click="favoritize" class="icon is-medium disabled" style="position:relative; right: 16px; color: #D83585">
                    <i class="mdi mdi-36px mdi-heart"></i>
                  </span>
                </div>
              </div>
            </nav>        
        </div>
      </div>
    </div>
  </section>
</div>
</template>


<script>
import { setTimeout, setInterval } from 'timers';
export default {
  name: 'View',
  data: function(){
    return {
        selectedObject: {},
        favorited: false,
        liked: 0,
        keyG: 0
    }
  },
  watch: {	
    'liked': function(newVal, OldVal){
      console.log(newVal)
      if(newVal===1){
         document.getElementById('liked').classList.remove('disabled');
         document.getElementById('disliked').classList.add('disabled');
      }
      else if(newVal===0){
        document.getElementById('liked').classList.add('disabled');
        document.getElementById('disliked').classList.add('disabled');
      }
      else if(newVal===-1){
        document.getElementById('disliked').classList.remove('disabled');
        document.getElementById('liked').classList.add('disabled');
      }
    }
  },
  created: function(){
    let that = this;
    if (this.movies.length === 0) {  
      this.fetchCloudData().catch(()=>{console.log('lol')});
      this.fetchData().then(()=>{
        this.selectedObject = that.$store.getters.getMovie(that.$route.params.id);
       })
      setTimeout(() => {
           if(this.$store.getters.getFavorite(this.$route.params.id)){
            document.getElementById('favorited').classList.remove('disabled');
            this.favorited=true;
          }
          if(this.$store.getters.getLiked(this.$route.params.id)){
              this.liked=this.$store.getters.getLiked(this.$route.params.id);
              if(this.liked===1)document.getElementById('liked').classList.remove('disabled');
              if(this.liked===-1)document.getElementById('disliked').classList.remove('disabled');
          }     
          this.keyG++;
          console.log(this.liked)
      }, 1000);
    }
    else {
      this.selectedObject = this.$store.getters.getMovie(this.$route.params.id);
      this.keyG++
      };
  },
  mounted: function() {
    if(this.$store.getters.getFavorite(this.$route.params.id)){
      document.getElementById('favorited').classList.remove('disabled');
      this.favorited=true;
    }
     if(this.$store.getters.getLiked(this.$route.params.id)){
        this.liked=this.$store.getters.getLiked(this.$route.params.id);
      }     
    console.log(this.userLikes)
  },
  components: {  },
  methods: {
    favoritize(){
      if(!this.favorited){
        document.getElementById('favorited').classList.remove('disabled');
        this.setFavorite(this.selectedObject.id);
        this.favorited=true;
        console.log(this.favorites);
      }
      else {
        document.getElementById('favorited').classList.add('disabled');
        this.removeFavorite(this.selectedObject.id);
        this.favorited=false;
      }
    },
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    likeThis() {
      if(this.liked===0){
        this.like(this.selectedObject.id, 1, 1);
        this.liked=1;
        this.keyG++
      }
      else if(this.liked===1){
        this.like(this.selectedObject.id, -1, 0);
        this.liked=0;
        this.keyG++
      }
      else if(this.liked===-1){
        this.like(this.selectedObject.id, 2, 1);
        this.liked=1;
        this.keyG++
      }
    },
    dislikeThis() {
      if(this.liked===0){
        this.like(this.selectedObject.id, -1, -1);
        this.liked=-1;
       
        this.keyG++
      }
      else if(this.liked===1){
        this.like(this.selectedObject.id, -2, -1);
        this.liked=-1;
        
        this.keyG++
      }
      else if(this.liked===-1){
        this.like(this.selectedObject.id, 1, 0);
        this.liked=0;
        this.keyG++
      }
    }
  }
}
</script>

<style>
  #content-box {
    padding: 20px;
    text-align: center;
    background-color: #AcDeDA;
    margin-top: 50px;
  }
  #contentColumn{
    min-height: 100%;
  }
  #buttons {
    position: relative;;
    bottom: 0;

  }
  .disabled {
    opacity: 0;
  }
  #content {
    color: #252525 !important;
  }
</style>
