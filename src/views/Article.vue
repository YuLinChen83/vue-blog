<template>
  <article v-if="articles.length">
    <h3>{{filterById.title}}</h3>
    <i>{{filterById.date}}</i>
    <span v-html="filterById.content"/>
  </article>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  mounted: function() {
    this.articleId = this.$route.params.id;
  },
  data() {
    return {
      articleId: null
    };
  },
  computed: {
    ...mapState(["articles"]),
    filterById: function() {
      return (
        this.articles.filter(article => article.id === this.articleId)[0]
      );
    }
  }
};
</script>