<template>
  <div>
    <h2>New Article</h2>
    <b-form>
      <b-form-group id="title-group" label="文章標題:" label-for="title">
        <b-form-input
          id="title"
          v-model="form.title"
          type="text"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="content-group" label="文章內容:" label-for="content">
        <b-form-textarea
          id="content"
          v-model="form.content"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-button v-if="!sumbited" @click.prevent="submitFormData" type="submit" variant="primary">新增</b-button>
      <b-button
        v-if="!sumbited"
        @click.prevent="resetFormData"
        type="submit"
        variant="outline-secondary"
      >重置</b-button>
      <b-spinner v-else label="Spinning"></b-spinner>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  mounted() {
    if (this.$route.name === "EditArticle") {
      this.mode = "edit";
      const id = this.$route.params.id;
      this.$store.dispatch("changeFocusId", id);
    }
  },
  data() {
    return {
      mode: "add",
      form: {
        title: "",
        date: "",
        content: ""
      },
      sumbited: false
    };
  },
  methods: {
    ...mapActions(["addArticle", "updateArticle"]),
    resetFormData: function() {
      this.form = {
        title: "",
        date: "",
        content: ""
      };
    },
    submitFormData: function() {
      this.sumbited = true;
      this.form.date = new Date().getTime();
      if (this.mode === "edit") {
        this.updateArticle({
          id: this.$route.params.id,
          newArticle: this.form
        });
      } else {
        this.addArticle(this.form);
      }
    }
  },
  computed: {
    ...mapState(["articleChanged"]),
    ...mapGetters(["filterByFocusId"])
  },
  watch: {
    filterByFocusId: function() {
      this.form.title = this.filterByFocusId.title;
      this.form.content = this.filterByFocusId.content;
    },
    articleChanged: function() {
      this.$router.push({ name: "AdminHome" });
    }
  }
};
</script>