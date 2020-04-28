<template>
  <article v-if="filterByFocusId">
    <h3>{{filterByFocusId.title}}</h3>
    <i>{{filterByFocusId.date|dateFormat}}</i>
    <span v-html="filterByFocusId.content"/>
  </article>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";
export default {
  mounted: function() {
    const id = this.$route.params.id;
    this.articleId = id;
    this.$store.dispatch("changeFocusId", id);
  },
  data() {
    return {
      articleId: null
    };
  },
  computed: {
    ...mapGetters(["filterByFocusId"])
  },
  filters: {
    dateFormat: timestamp => {
      return timestamp
        ? new Date(timestamp).format("yyyy-MM-dd hh:mm:ss")
        : null;
    }
  }
};
</script>