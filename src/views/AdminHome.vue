<template>
  <div>
    <b-table :fields="fields" :items="articles">
      <template v-slot:cell(date)="data">{{data.value|dateFormat}}</template>
      <template v-slot:cell(content)="data">{{data.value|subContent}}</template>
      <template v-slot:cell(id)="data">
        <b-button-group>
          <b-button @click="editArticle(data.value)" variant="info"><b-icon-pencil-square></b-icon-pencil-square></b-button>
          <b-button @click="delArticle(data.value)" variant="danger"><b-icon-trash></b-icon-trash></b-button>
        </b-button-group>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      fields: [
        { key: "title", label: "文章標題" },
        { key: "date", label: "上傳日期" },
        { key: "content", label: "文章內容" },
        { key: "id", label: "修改/刪除" }
      ]
    };
  },
  methods: {
    ...mapActions(["fetchArticles", "deleteArticle"]),
    editArticle: function(id) {
      this.$router.push({ name: "EditArticle", params: { id } });
    },
    delArticle: function(id) {
      const ensure = confirm("確認刪除文章嗎？");
      if (ensure) {
        this.deleteArticle(id);
      }
    }
  },
  computed: {
    ...mapState(["articles"])
  },
  filters: {
    subContent: content => {
      return content.substring(0, 70) + "...";
    },
    dateFormat: timestamp => {
      return new Date(timestamp).format("yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>
