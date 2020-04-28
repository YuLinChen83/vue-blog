<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Tiffany's Blog</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="/login">Login</b-nav-item>
          <!-- <b-nav-item to="/admin">Admin</b-nav-item> -->
          <b-nav-item href="https://github.com/YuLinChen83">Github</b-nav-item>
          <b-nav-form>
            <b-form-input v-model="tempSearchKey" size="sm" class="mr-sm-2" placeholder="Search Title"></b-form-input>
            <b-button
              @click.prevent="submitSearchKey"
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
            >Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style lang="scss" scoped>
// .navbar-brand {
//   color: #3399ff;
// }
</style>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      tempSearchKey: ""
    };
  },
  computed: {
    ...mapState(["searchKey"])
  },
  methods: {
    ...mapActions(["changeSearchKey"]),
    submitSearchKey: function() {
      this.changeSearchKey(this.tempSearchKey);
    }
  },
  watch: {
    tempSearchKey: function() {
      if (this.tempSearchKey === "") {
        this.submitSearchKey();
      }
    },
    searchKey: function() {
      this.tempSearchKey = this.searchKey;
    }
  }
};
</script>