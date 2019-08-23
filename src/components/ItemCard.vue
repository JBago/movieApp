<template>
         <div class="card" id="itemCard">
            <router-link :to="'/View/'+item.id"><div  style="z-index: 10;" class="is-overlay"></div></router-link>
            <div>
              <div id="cardImage" class="card-image" >
                <figure class="image">
                  <img :src="item.cover">
                </figure>
              </div>
            <div id="cardName" class="card-content has-text-centered">
                <span class="is-size-5 has-text-weight-medium is-family-primary">
                  {{item.title}}</span><br>
                 <span class="is-size-6 has-text-weight-medium is-family-primary">
                  {{item.rating}}/10 <i class="mdi mdi-24px mdi-star" style="color: gold; position:relative; top:5px"></i>
                </span>
            </div>
          </div>
        </div>
   
</template>


<script>
export default {
  name: 'item-card',
  data: function(){
    return {       
    }
  },
  created: function(){

  },
  components: { },
  methods: {
  },
  props:{
      item: Object
  }
}
</script>

<style>
  #itemCard{
    max-width: 460px;
    margin: auto;
  }
  #cardName{
    background-color: #09467F;
    color: #A9F0B9;
  }
</style>
