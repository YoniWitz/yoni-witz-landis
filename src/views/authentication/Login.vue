<template>
  <div>
    <h1>Login Route</h1>
    <form class="custom-form" v-on:submit.prevent="checkForm">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="username"
          placeholder="Username"
          name="username"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          name="password"
        />
      </div>
      <div v-if="errors.length" class="btn-danger ml-2">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-secondary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import * as auth from "../../services/auth";
export default {
  name: "login",
  data: function () {
    return {
      errors: [],
      username: "",
      password: "",
    };
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (!this.username) {
        this.errors.push("Username required");
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }

      if (!this.errors.length) {
        this.login();
      }

      e.preventDefault();
    },

    login: async function () {
      const user = {
        username: this.username,
        password: this.password,
      };
      await auth.login(user).then((res) => {
        this.errors = [];
        if (res) {
          this.errors.push(res);
        } else {
          this.$router.push({ name: "Home" });
        }
      });
    },
  },
};
</script>