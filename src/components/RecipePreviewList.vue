<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row v-if="recipes.length">
      <b-col v-for="r in recipes" :key="`${title}-${r.id}`">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <h4>No recipes to show</h4>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      let url = "";
      if (this.title === "Explore this recipes") {
        url = "/recipes/random";
      } else if (
        this.$root.store.username &&
        this.title === "Last Watched Recipes"
      ) {
        url = "/users/watched";
      } else if (
        this.$root.store.username &&
        this.title === "My Recipes"
      ) {
        url = "/users/createdRecipe";
      } else if (
        this.$root.store.username &&
        this.title === "My Favorite Recipes"
      ) {
        url = "/users/favorites";
      } else {
        return;
      }
      try {
        console.log(this.$root.store.server_domain + url);
        const response = await this.axios.get(
          this.$root.store.server_domain + url
        );
        this.recipes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
