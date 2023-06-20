<template>
  <b-container>
    <h1>My Family Recipes</h1>
    <b-row v-if="recipes.length">
      <b-col
        v-for="recipe in recipes"
        :key="`MyFamilyRecipe-${recipe.recipe_id}`"
      >
        <div class="recipe-card">
          <div class="image-container">
            <img :src="recipe.image" class="recipe-image" />
          </div>
          <div class="recipe-details">
            <h2 class="recipe-title">{{ recipe.title }}</h2>
            <div class="details-row">
              <div class="detail-item">
                <i class="fas fa-clock" title="Time"></i> {{ recipe.readyInMinutes }} minutes
              </div>
              <div class="detail-item">Made By: {{ recipe.author }}</div>
              <div class="detail-item">Best At: {{ recipe.occasion }}</div>
            </div>
            <div class="details-row"><br /></div>
            <div
              class="details-row"
              style="align-items: flex-start; display: flex"
            >
              <div class="detail-item">Ingredients:</div>
              <div class="detail-item">
                <Ingredients :ingredients="recipe.extendedIngredients" />
              </div>
              <div class="detail-item"></div>

              <div class="details-row"><br /><br><br><br><br></div>
            </div>
            <div
              class="details-row"
              style="align-items: flex-start; display: flex"
            >
              <div class="detail-item">Instructions:</div>
              <div class="detail-item">
                <instructions :instructions="recipe.instructions"/>
              </div>
              <div class="detail-item"></div>
            </div>
          </div>
        </div>
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
import Ingredients from "../components/Ingredients.vue";
import Instructions from '../components/Instructions.vue';
export default {
  components: { Ingredients, Instructions },
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
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/familyRecipes"
        );
        this.recipes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.recipe-card {
  background-color: blanchedalmond;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px; /* Set the desired width for the recipe card */
  transition: background-color 0.2s;
  color: rgb(202, 8, 8);
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 16px;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-details {
  text-align: center;
}

.recipe-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  transition: color 0.2s;
}

.details-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-size: 14px;
}

.favorite-button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

</style>
  