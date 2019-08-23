import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueFuse from 'vue-fuse'
import Firebase from 'firebase'
import 'bulma'
import "@mdi/font/css/materialdesignicons.css"



Vue.config.productionTip = false;
Vue.use(VueAxios, Axios);
Vue.use(VueFuse);

Firebase.initializeApp({
  apiKey: "AIzaSyDYvqT-iDbvdTLaqN3M0pdsKczAurEv46Q",
  authDomain: "movieapp-316b3.firebaseapp.com",
  databaseURL: "https://movieapp-316b3.firebaseio.com",
  projectId: "movieapp-316b3",
  storageBucket: "movieapp-316b3.appspot.com",
  messagingSenderId: "530065322860",
  appId: "1:530065322860:web:7878ef58f0ba0214"
});

var db = Firebase.firestore();

Vue.mixin({
  computed: {
    movies: function() {
      return store.state.movies;
    },
    favorites: function() {
      return store.state.favorites;
    },
    userLikes: function() {
      return store.state.userLikes;
    },
  },
    methods: {
      fetchData: function() {
        return Vue.axios({
          method: "GET",
          url: "https://output.jsbin.com/wokedotuki.json"
          })
          .then(function(response) {
            store.dispatch("fill", response.data.data);
            console.log(store.state.movies);
            db.collection("movies").get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                store.dispatch("likes", {id:doc.id, likes:doc.data().likes});
              });
            });
          })
      },
      fetchCloudData: function(){
        var p =  new Promise((reslove, reject)=>{
          if(localStorage.getItem('userId')) {
            db.collection("users").doc(localStorage.getItem('userId')).get().then(function(doc) {
              if (doc.exists) {
                  store.state.favorites=doc.data().favorites;
                  console.log(doc.data())
                  doc.data().likes.forEach(element => {
                    store.dispatch("userLikes", {id:element, like:1});
                  });
                  doc.data().dislikes.forEach(element => {
                    store.dispatch("userLikes", {id:element, like:-1});
                  });
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
            }).catch(function(error) {
              console.log("Error getting document:", error);
            });
          } else {
            const userId = '_' + Math.random().toString(36).substr(2, 9);
            db.collection("users").doc(userId).set({
              likes: [],
              dislikes: [],
              favorites: []
            });
            localStorage.setItem('userId', userId);
          }
        }) 
        return p;
      },
      fixDate: function(date) {
        let splitedDate = date.split('-');
        return splitedDate[2].slice(0,2) + '.' + splitedDate[1]  + '.' + splitedDate[0];
      },
      setFavorite: function(id) {
        db.collection("users").doc(localStorage.getItem('userId')).update({
          favorites: Firebase.firestore.FieldValue.arrayUnion(id)
        });
        return store.dispatch('commitFavorite', id)
      },
      removeFavorite: function(id) {
        db.collection("users").doc(localStorage.getItem('userId')).update({
          favorites: Firebase.firestore.FieldValue.arrayRemove(id)
        });
        return store.dispatch('commitRemoveFavorite', id)
      },
      sortByNew: function(array) {
        const newArray = array.sort(function(a, b){return parseFloat(b.releaseDate) - parseFloat(a.releaseDate)});
        return newArray;
      },
      sortByOld: function(array) {
        const newArray = array.sort(function(a, b){return parseFloat(a.releaseDate) - parseFloat(b.releaseDate)});
        return newArray;
      },
      sortByLikes: function(array) {
        const newArray = array.sort(function(a, b){return b.likes - a.likes});
        return newArray;
      },
      like: function(id, increment, value) {
        store.dispatch("likes", {id: id, likes: (store.getters.getMovie(id).likes + increment)});
        db.collection('movies').doc(id).update({
          likes: Firebase.firestore.FieldValue.increment(increment)
        })
        if(value===-1){
          db.collection("users").doc(localStorage.getItem('userId')).update({
            dislikes: Firebase.firestore.FieldValue.arrayUnion(id),
            likes: Firebase.firestore.FieldValue.arrayRemove(id)
          });
        }
        else if(value===0){
          db.collection("users").doc(localStorage.getItem('userId')).update({
            dislikes: Firebase.firestore.FieldValue.arrayRemove(id),
            likes: Firebase.firestore.FieldValue.arrayRemove(id)
          });
        }
        else if(value===1){
          db.collection("users").doc(localStorage.getItem('userId')).update({
            dislikes: Firebase.firestore.FieldValue.arrayRemove(id),
            likes: Firebase.firestore.FieldValue.arrayUnion(id)
          });
        }
      }
  },
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
