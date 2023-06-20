<template>
  <div id="app">
    <Navbar v-on:inputChange="handleChange" v-on:Logout="Logout" />
    <CreateRecipeModal
      :showModal="showModal"
      v-on:inputChange="handleChange"
      v-if="showModal"
    />

    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import CreateRecipeModal from "./components/CreateRecipeModal.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    handleChange(value) {
      this.showModal = value;
    },
    Logout() {
      this.$root.store.logout();
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
      this.$root.toast("Logout", "User logged out successfully", "success");
    },
  },
  components: { Navbar, CreateRecipeModal, Footer },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

body {
  background-image: url("../resources/background.jpg");
  background-size: cover;
}

h1 {
  font-family: "Lobster", cursive;
  font-size: 50px;
  font-weight: 100;
  color: #2c3e50;
  text-align: center;
  padding: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, color 0.3s ease;
}

h4 {
  font-family: "Lobster", cursive;
  font-size: 30px;
  font-weight: 70;
  color: #2c3e50;
  padding: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
