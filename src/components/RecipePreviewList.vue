<template>
  <b-container>
    <h1>
      {{ title }}:
      <slot></slot>
    </h1>
    <div class="list" v-if="recipes.length">
      <b-row v-for="(row, index) in Math.ceil(recipes.length / 3)" :key="index">
        <b-col
          v-for="r in getRecipesForRow(row)"
          :key="`${title}-${r.id || `-` + r.recipe_id}`"
        >
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-col>
      </b-row>
    </div>
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
    searchResults: {
      type: Array,
      default: () => [],
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
      } else if (this.$root.store.username && this.title === "My Recipes") {
        url = "/users/createdRecipe";
      } else if (
        this.$root.store.username &&
        this.title === "My Favorite Recipes"
      ) {
        url = "/users/favorites";
      } else if (this.title === "Search Results") {
        this.recipes = this.searchResults;
        return;
      } else {
        return;
      }
      try {
        console.log(this.$root.store.server_domain + url);
        const response = await this.axios.get(
          this.$root.store.server_domain + url
        );
        this.recipes = response.data;
        if (
          this.$root.store.username &&
          this.title === "Last Watched Recipes"
        ) {
          this.recipes = this.recipes.slice(-3);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getRecipesForRow(row) {
      const startIndex = (row - 1) * 3;
      const endIndex = startIndex + 3;
      return this.recipes.slice(startIndex, endIndex);
    },
  },
  watch: {
    searchResults: {
      handler(val) {
        this.recipes = val;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-flow: column wrap;
  gap: 10px;
}
</style>
