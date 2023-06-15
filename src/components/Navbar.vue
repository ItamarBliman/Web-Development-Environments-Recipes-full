<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="danger">
      <router-link :to="{ name: 'main' }" tag="b-navbar-brand"
        >Vue Recipes</router-link
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Link</b-nav-item> -->
          <router-link :to="{ name: 'search' }" tag="b-nav-item"
            >Search</router-link
          >
          <router-link :to="{ name: 'about' }" tag="b-nav-item"
            >About</router-link
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username" right>
          <b-button variant="danger" disabled>hello guest</b-button>
          <router-link :to="{ name: 'login' }" tag="b-nav-item"
            >Login</router-link
          >
          <router-link :to="{ name: 'register' }" tag="b-nav-item"
            >Register</router-link
          >
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else right>
          <b-button variant="danger" disabled>{{
            $root.store.username
          }}</b-button>
          <b-nav-item-dropdown>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Personal</em>
            </template>
            <router-link :to="{ name: 'myFavorites' }" tag="b-dropdown-item"
              >My Favorites</router-link
            >
            <router-link :to="{ name: 'myRecipes' }" tag="b-dropdown-item"
              >My Recipes</router-link
            >
            <router-link :to="{ name: 'myFamilyRecipes' }" tag="b-dropdown-item"
              >My Family Recipes</router-link
            >
          </b-nav-item-dropdown>
          <router-link :to="{ name: 'createRecipe' }" tag="b-nav-item"
            >Create New Recipe</router-link
          >
          <b-button @click="logout()" variant="outline-light">Logout</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    async logout() {
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/Logout"
        );
        this.$root.store.logout();
      } catch (err) {
        console.log(err.response);
      }
    },
  },
};
</script>

<style>
</style>