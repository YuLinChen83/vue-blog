import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import { db } from './firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: 'tiffany666',
    articles: [],
    searchKey: '',
    focusId: '',
    articleChanged: false,
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
  },
  actions: {
    fetchArticles: async ({ commit }) => {
      const getArticlesApi =
        "https://us-central1-expressapi-8c039.cloudfunctions.net/app/article";
      const result = await axios.get(getArticlesApi);
      const payload = result.data.data;
      commit('fetchArticles', payload);
    },
    changeSearchKey: ({ commit }, payload) => {
      commit('changeSearchKey', payload)
    },
    addArticle: ({ commit }, payload) => {
      commit('addArticle', payload)
    },
    updateArticle: ({ commit }, payload) => {
      commit('updateArticle', payload)
    },
    deleteArticle: ({ commit }, payload) => {
      commit('deleteArticle', payload)
    },
    changeFocusId: ({ commit }, payload) => {
      commit('changeFocusId', payload)
    }
  },
  getters: {
    filterBySearchKey: state => {
      if (state.articles.length) {
        if (state.searchKey === "") {
          return state.articles;
        } else {
          return state.articles.filter(article => article.title === state.searchKey)
        }
      }
    },
    filterByFocusId: state => {
      if (state.articles.length) {
        return state.articles.filter(article => article.id === state.focusId)[0]
      }
    },
  }
  // modules: {
  // }
})
