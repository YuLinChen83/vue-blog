<template>
  <div class="admin">
    <router-link to="/admin/add">新增文章</router-link>
    <router-link to="/admin">文章列表</router-link>
    <router-link to="/admin/categories">管理類別</router-link>
    <p class="m-3">Hello {{account}} :)</p>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["account"])
  }
};
</script>

<style lang="scss" scoped>
.admin {
  p {
    color: pink;
    text-align: right;
  }
  a {
    color: #2b8fb4;
    transition: color 0.2s;
    &:hover {
      text-decoration: none;
      color: #6ba8be;
    }
    &:not(:last-of-type)::after {
      content: "/";
      padding: 0px 3px;
    }
  }
}
</style>