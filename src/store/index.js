import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import { db } from '@/store/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: 'tiffany666',
    articles: [],
    searchKey: '',
    focusId: '',
    articleChanged: false,
    categories: [],
    categoryChanged: false,
  },
  mutations: {
    fetchArticles: (state, payload) => {
      state.articles = payload
    },
    changeSearchKey: (state, payload) => {
      state.searchKey = payload
    },
    addArticle: (state, payload) => {
      state.articles = [payload, ...state.articles]
      state.articleChanged = !state.articleChanged
    },
    updateArticle: (state, { id, newArticle }) => {
      const index = state.articles.map(article => article.id).indexOf(id)
      state.articles[index] = newArticle
      state.articleChanged = !state.articleChanged
    },
    deleteArticle: (state, payload) => {
      const index = state.articles.map(article => article.id).indexOf(payload)
      state.articles.splice(index, 1)
    },
    changeFocusId: (state, payload) => {
      state.focusId = payload
    },
    fetchCategories: (state, payload) => {
      state.categories = payload
    },
    addCategory: (state, payload) => {
      state.categories = [payload, ...state.categories]
      state.categoryChanged = !state.categoryChanged
    },
    updateCategory: (state, { id, newCategory }) => {
      const index = state.categories.map(categories => categories.id).indexOf(id)
      state.categories[index] = newCategory
      state.categoryChanged = !state.categoryChanged
    },
    deleteCategory: (state, payload) => {
      const index = state.categories.map(article => article.id).indexOf(payload)
      state.categories.splice(index, 1)
    },
  },
  actions: {
    fetchArticles: async ({ commit }) => {
      const articlesRef = db.collection('Articles');  // 有id規則的話可改用set新增 db.collection('Articles').doc('id');
      const result = await articlesRef.get();
      const payload = [];
      result.forEach(article => {
        payload.push(({ id: article.id, ...article.data() }));
      })
      commit('fetchArticles', payload);
    },
    changeSearchKey: ({ commit }, payload) => {
      commit('changeSearchKey', payload)
    },
    addArticle: async ({ commit }, payload) => {
      const articlesRef = db.collection('Articles');
      const result = await articlesRef.add(payload);
      commit('addArticle', { id: result.id, ...payload })
    },
    updateArticle: async ({ commit }, payload) => {
      const docRef = db.collection('Articles').doc(payload.id);
      await docRef.update(payload.newArticle);  //或是用.set()
      commit('updateArticle', payload)
    },
    deleteArticle: async ({ commit }, payload) => {
      const docRef = db.collection('Articles').doc(payload)
      await docRef.delete();
      commit('deleteArticle', payload)
    },
    changeFocusId: ({ commit }, payload) => {
      commit('changeFocusId', payload)
    },
    fetchCategories: async ({ commit }) => {
      const categoriesRef = db.collection('Categories');
      const result = await categoriesRef.get();
      const payload = [];
      result.forEach(category => {
        payload.push({ id: category.id, ...category.data() });
      })
      commit('fetchCategories', payload);
    },
    addCategory: async ({ commit }, payload) => {
      const categoriesRef = db.collection('Categories');
      const result = await categoriesRef.add(payload);
      commit('addCategory', { id: result.id, ...payload })
    },
    updateCategory: async ({ commit }, payload) => {
      const docRef = db.collection('Categories').doc(payload.id);
      await docRef.update(payload.newCategory);
      commit('updateCategory', payload)
    },
    deleteCategory: async ({ commit }, payload) => {
      const docRef = db.collection('Categories').doc(payload)
      await docRef.delete();
      commit('deleteCategory', payload)
    },
  },
  getters: {
    filterBySearchKey: state => {
      if (state.articles.length) {
        if (state.searchKey === "") {
          return state.articles;
        } else {
          return state.articles.filter(article => (article.title.toUpperCase()).indexOf(state.searchKey.toUpperCase()) > -1)
        }
      }
    },
    filterByFocusId: state => {
      if (state.articles.length) {
        const filtered = state.articles.filter(article => article.id === state.focusId)[0];
        return filtered || {}
      }
      return {};
    },
  }
})
