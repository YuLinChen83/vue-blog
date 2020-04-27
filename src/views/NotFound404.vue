<template>
  <div>
    <h1>404</h1>
    <h3>The page is not found.</h3>
    <b-button @click="routerToHome">go to home</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    routerToHome: function() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>