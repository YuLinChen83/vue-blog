import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Article from '@/views/Article.vue'
import Login from '@/views/Login.vue'
import Admin from '@/views/Admin.vue'
import AdminHome from '@/views/AdminHome.vue'
import Add from '@/views/Admin/Add.vue'
import Categories from '@/views/Admin/Categories.vue'
import NotFound404 from '@/views/NotFound404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/',
        name: 'AdminHome',
        component: AdminHome
      },
      {
        path: 'add',
        name: 'AddArticle',
        component: Add
      },
      {
        path: 'edit/:id',
        name: 'EditArticle',
        component: Add
      },
      {
        path: 'categories',
        name: 'Categories',
        component: Categories
      },
    ]
  },
  {
    path: '*',
    name: 'NotFound404',
    component: NotFound404
  },
]

const router = new VueRouter({
  routes
})

export default router
