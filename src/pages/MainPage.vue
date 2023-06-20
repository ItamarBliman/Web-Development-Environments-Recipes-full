<template>
  <div class="container">
    <RecipePreviewList
      title="Explore this recipes"
      class="RandomRecipes center"
    />
    <RecipePreviewList
      title="Last Watched Recipes"
      v-if="$root.store.username"
    />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
</style>
