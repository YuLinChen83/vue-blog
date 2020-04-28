<template>
  <div id="app">
    <Header/>
    <b-container fluid="md">
      <router-view/>
    </b-container>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #F5F9F8;
  min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container-md {
  margin-top: 1.5rem;
}
article > h3 {
  color: #272727;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #fcd088;
  }
}
</style>

<script>
import axios from "axios";
import Header from "@/components/Header";
import "@/assets/js/dateFormat";
export default {
  mounted() {
    this.$store.dispatch("fetchArticles");
    this.$store.dispatch("fetchCategories");
  },
  components: {
    Header
  }
};
</script>