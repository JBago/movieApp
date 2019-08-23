import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import View from './views/View.vue'
import Search from './views/Search.vue'
import Favorites from './views/Favorites.vue'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/View/:id',
      name: 'view',
      component: View
    },
    {
      path: '/search/:string',
      name: 'search',
      component: Search
    },
    {
      path: '/favorites/',
      name: 'favorites',
      component: Favorites
    }
  ]
})
