<template>
  <div class="admin">
    <router-link to="/admin">文章列表</router-link>
    <router-link to="/admin/add">新增文章</router-link>
    <router-view/>

    <p>Hello {{account}}</p>
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