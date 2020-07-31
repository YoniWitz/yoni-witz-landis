<template>
  <div id="app">
    <Navbar />
    <div id="app-container">
      <router-view />
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"
export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
};
</script>
