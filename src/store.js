import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    favorites: [],
    userLikes: {}
  },
  getters: {
    getMovie: state => id => {
      for (let i = 0; i < state.movies.length; i++) {
        if (state.movies[i].id === id) {
          return state.movies[i];
        }
      }
    },
    getFavorite: state => id => {
      for (let i = 0; i < state.favorites.length; i++) {
        if (state.favorites[i] === id) {
          return true;
        }
      }
      return false;
    },
    getLiked: state => MovieId => {
      return state.userLikes[MovieId];
    }
  },
  mutations: {
    setMovies: function(state, movies) {
      let i = 0;
      Object.keys(movies).map(function (key){
        state.movies.push(movies[key]);
        state.movies[i].id=key;
        state.movies[i].likes=0;
        i++;
      });
    },
    setFavorite: function(state, id) {
      state.favorites.push(id);
    },
    removeFavorite: function(state, id) {
      var index = state.favorites.indexOf(id);
      if (index > -1) {
        state.favorites.splice(index, 1);
      }
    },
    setLikes: function(state, movie) {
      for(let i=0; i<state.movies.length;i++){
        if(movie.id==state.movies[i].id) state.movies[i].likes=movie.likes;
      };
    },
    setUserLikes: function(state, movie) {
      state.userLikes[movie.id] = movie.like;
    }
  },
  actions: {
    fill: function(context, movies) {
      context.commit("setMovies", movies);
    },
    likes: function(context, movie) {
      context.commit("setLikes", movie);
    },
    userLikes: function(context, movie) {
      context.commit("setUserLikes", movie);
    },
    commitFavorite: function(context, id) {
      if(context.getters.getFavorite(id)===false) context.commit("setFavorite", id);
    },
    commitRemoveFavorite: function(context, id) {
      context.commit("removeFavorite", id);
    }
  }
})
