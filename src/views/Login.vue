<template>
  <div>
    <h2>Admin Login</h2>
    <b-form @submit="onSubmit">
      <b-form-group id="account-group" label="Account:" label-for="account">
        <b-form-input
          id="account"
          v-model="form.account"
          type="text"
          required
          placeholder="Enter account"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="password-group" label="Password:" label-for="Password">
        <b-form-input
          id="Password"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button @click.prevent="routerToAdmin" type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    routerToAdmin: function() {
      this.$router.push({ name: "Admin" });
    },
    onSubmit: function() {
      console.log("submit");
    }
  }
};
</script>