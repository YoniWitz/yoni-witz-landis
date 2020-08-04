<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top custom-bg-dark">
      <a class="navbar-brand">
        <img style="max-height:25px;" src="../assets/logo.png" /> Yoni Witz
        Landis
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact>Home</router-link>
          </li>
          <li v-if="$store.state.isLoggedIn" class="nav-item">
            <router-link to="/applicants" class="nav-link" exact>Applicants</router-link>
          </li>
          <li v-if="!$store.state.isLoggedIn" class="nav-item">
            <router-link to="/register" class="nav-link" exact>Register</router-link>
          </li>
          <li v-if="!$store.state.isLoggedIn" class="nav-item">
            <router-link to="/login" class="nav-link" exact>Login</router-link>
          </li>
          <li v-if="$store.state.isLoggedIn" class="nav-item">
            <a v-on:click.prevent="logout()" class="nav-link" href="#">Logout</a>
          </li>
          <li v-if="$store.state.isLoggedIn" class="nav-item">
            <a class="nav-link">{{this.$store.state.username ? this.$store.state.username: 'User'}}</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import * as auth from "../services/auth";
export default {
  name: "Navbar",
  methods: {
    logout: function () {
      auth.logout();
      this.$router.push({ name: "Home" }).catch(() => {});
    },
  },
};
</script>