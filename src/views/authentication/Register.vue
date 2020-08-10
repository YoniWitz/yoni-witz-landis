<template>
  <div>
    <h1>Register Page</h1>
    <form class="custom-form" v-on:submit.prevent="checkForm">
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input
          v-model="first"
          type="text"
          class="form-control"
          id="firstname"
          placeholder="First Name"
          name="firstname"
        />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input
          v-model="last"
          type="text"
          class="form-control"
          id="lastname"
          placeholder="Last Name"
          name="lastname"
        />
      </div>
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
        <button type="submit" class="btn btn-secondary">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import * as auth from "../../services/auth";
export default {
  name: "register",
  data: function () {
    return {
      errors: [],
      username: "",
      password: "",
      last: "",
      first: "",
    };
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      !this.last ? this.errors.push("Last Name required") : null;
      !this.first ? this.errors.push("First Name required.") : null;
      !this.username ? this.errors.push("Username required") : null;
      !this.password ? this.errors.push("Password required.") : null;

      !this.errors.length ? this.register() : null;

      e.preventDefault();
    },
    register: async function () {
      const user = {
        username: this.username,
        first: this.first,
        last: this.last,
        password: this.password,
      };

      await auth.registerUser(user).then((res) => {
        this.errors = [];
        res.status
          ? this.$router.push({ name: "Login" })
          : this.errors.push(res);
      });
    },
  },
};
</script>