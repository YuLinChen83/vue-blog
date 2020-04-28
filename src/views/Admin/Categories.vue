<template>
  <div class="categories-container">
    <div class="header mb-5">
      <b-form-input v-model="add" placeholder="新增類別名稱" class="mr-1"></b-form-input>
      <b-button @click="addAndResetCategory(add)" variant="success">新增</b-button>
    </div>
    <div class="content">
      <b-table :fields="fields" :items="categories" fixed>
        <template v-slot:cell(text)="data">
          <span v-if="focus.id!==data.item.id">{{data.value}}</span>
          <b-form-input v-else v-model="focus.text" placeholder="類別名稱"></b-form-input>
        </template>
        <template v-slot:cell(id)="data">
          <b-button-group>
            <b-button
              v-if="focus.id!==data.value"
              @click="editCategory(data.value)"
              variant="outline-info"
            >編輯</b-button>
            <b-button v-else @click="editCategoryDone()" variant="info">確認</b-button>
            <b-button
              v-if="focus.id!==data.value"
              @click="delCategory(data.value)"
              variant="danger"
            >
              <b-icon-trash></b-icon-trash>
            </b-button>
            <b-button v-else @click="resetCategory" variant="outline-secondary">取消</b-button>
          </b-button-group>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      add: "",
      focus: { id: "", value: "" },
      fields: [
        { key: "text", label: "文章類別" },
        { key: "id", label: "修改/刪除" }
      ]
    };
  },
  methods: {
    ...mapActions(["addCategory", "updateCategory", "deleteCategory"]),
    resetCategory: function() {
      this.focus = { id: "", value: "" };
    },
    addAndResetCategory: function() {
      this.addCategory({ text: this.add });
      this.add = "";
    },
    editCategory: function(id) {
      this.focus = { ...this.categories.find(category => category.id === id) };
    },
    editCategoryDone: function() {
      if (
        this.focus.text !==
        this.categories.find(category => category.id === this.focus.id).text
      ) {
        this.updateCategory({
          id: this.focus.id,
          newCategory: { text: this.focus.text }
        });
      }
    },
    delCategory: function(id) {
      const ensure = confirm("確認刪除類別嗎？");
      if (ensure) {
        this.deleteCategory(id);
      }
    }
  },
  computed: {
    ...mapState(["categories", "categoryChanged"])
  },
  watch: {
    categoryChanged: function() {
      this.focus = { id: "", value: "" };
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 300px;
  display: inline-flex;
  justify-content: center;
  .form-control {
    width: 150px;
  }
}
.content {
  display: flex;
  justify-content: center;
}
table.table {
  width: 300px;
}
</style>