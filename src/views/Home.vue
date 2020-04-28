<template>
  <div class="home-container">
    <div>
      <article v-for="(article,index) in filterBySearchKey" :key="index">
        <h3 @click="routerToArticle(article.id)">{{article.title}}</h3>
        <i>
          <b-icon-calendar></b-icon-calendar>
          {{article.date|dateFormat}}
        </i>
        <span>{{article.content | subContent}}</span>
        <div>
          <b-button @click="routerToArticle(article.id)" squared variant="outline-warning">READ MORE</b-button>
        </div>
      </article>
      <div v-if="searchKey&&!filterBySearchKey.length">
        <span class="tip">無符合搜索關鍵字文章</span>
        <b-button variant="info" @click="changeSearchKey('')">清除搜索關鍵字</b-button>
      </div>
    </div>
    <div class="post-list">
      <h4>近期文章</h4>
      <ul>
        <li v-for="(article,index) in articles" :key="index" @click="routerToArticle(article.id)">
          <b-icon-pencil></b-icon-pencil>
          {{article.title}}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 30px;
}
article {
  padding: 40px 30px 20px 30px;
  background: white;
  margin-bottom: 20px;
  display: flex;
  flex-flow: column nowrap;
  i {
    justify-content: flex-start;
    display: inline-flex;
    align-items: center;
    color: #a0a8ab;
    font-size: smaller;
    svg {
      margin-right: 10px;
    }
  }
  span {
    padding-top: 15px;
    text-align: left;
    width: 100%;
    display: block;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div {
    margin-top: 15px;
  }
  button {
    color: #fcd088;
    border: 1px solid #fcd088;
    &:hover {
      background: #fcd088;
    }
  }
}
.tip {
  color: #c50000;
}
.post-list {
  background: white;
  h4 {
    margin-top: 15px;
  }
  ul {
    color: #656d6d;
    list-style: none;
    padding: 0;
    text-align: left;
    margin: 0px 1rem;
    li {
      padding: 2px 0px;
      cursor: pointer;
      &:hover {
        color: #fcd088;
        transition: color 0.3s;
      }
    }
  }
  svg {
    margin-right: 5px;
  }
}
</style>

<script>
import axios from "axios";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["articles", "searchKey"]),
    ...mapGetters(["filterBySearchKey"])
  },
  methods: {
    ...mapActions(["changeSearchKey"]),
    routerToArticle: function(id) {
      this.$router.push({ name: "Article", params: { id } });
    }
  },
  filters: {
    subContent: content => {
      return content.substring(0, 150);
    },
    dateFormat: timestamp => {
      return new Date(timestamp).format("yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>