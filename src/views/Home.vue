<template>
  <div>
    <article v-for="(article,index) in filterBySearchKey" :key="index">
      <h3 @click="routerToArticle(article.id)">{{article.title}}</h3>
      <i>{{article.date}}</i>
      <span>{{article.content | subContent}}</span>
    </article>
  </div>
</template>

<style lang="scss" scoped>
article {
  padding: 1rem;
  background: white;
  margin: 1rem 0;
  display: flex;
  flex-flow: column nowrap;
  i {
    justify-content: flex-start;
    display: flex;
    color: hsl(0, 0%, 60%);
    &::before {
      content: "發佈時間:";
      display: block;
    }
  }
  span {
    padding: 5px;
  }
}
</style>

<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["articles"]),
    ...mapGetters(["filterBySearchKey"])
  },
  methods: {
    routerToArticle: function(id) {
      this.$router.push({ name: "Article", params: { id } });
    }
  },
  filters: {
    subContent: content => {
      return content.substring(0, 150);
    }
  }
};
</script>