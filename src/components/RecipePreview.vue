<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-previe"
  >
    <div class="recipe-card">
      <div class="image-container">
        <img v-if="image_load" :src="recipe.image" class="recipe-image" />
      </div>
      <div class="recipe-details">
        <h2 class="recipe-title">{{ recipe.title }}</h2>
        <div class="details-row">
          <div class="detail-item">
            <i class="fas fa-clock" title="Time"></i> {{ recipe.readyInMinutes }} minutes
          </div>
          <div class="detail-item">
            <i class="fas fa-thumbs-up" title="Likes"></i> {{ recipe.aggregateLikes }}
          </div>
          <div class="detail-item">
            <i
              class="fas fa-seedling"
              title="Vegan"
              style="
                --fa-primary-color: #669c35;
                --fa-secondary-color: #669c35;
                --fa-secondary-opacity: 0.7;
              "
              v-if="recipe.vegan"
            ></i>
            <i
              class="fas fa-leaf"
              title="Vegetarian"
              style="
                --fa-primary-color: #077e1b;
                --fa-primary-opacity: 1;
                --fa-secondary-color: #06c11c;
                --fa-secondary-opacity: 0.7;
              "
              v-if="recipe.vegetarian"
            ></i>
            <i
              class="fas fa-wheat-awn"
              title="Gluten Free"
              style="
                --fa-primary-color: #a96800;
                --fa-secondary-color: #aa7942;
                --fa-secondary-opacity: 0.6;
              "
              v-if="recipe.glutenFree"
            ></i>
          </div>
          <div class="detail-item">
            <button
              class="favorite-button"
              :class="{ favorite: recipe.favorite }"
              @click="toggleFavorite(recipe)"
            >
              <i class="fas fa-star"></i>
            </button>
            <i class="fas fa-eye" v-if="recipe.watched"></i>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
  
  
  <script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleFavorite(recipe) {
      // Implement the logic to toggle the favorite status of the recipe
    },
  },
  mounted() {
    this.axios.get(this.recipe.image, { withCredentials: false }).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
    };
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

.recipe-card:hover {
  background-color: rgba(0, 0, 0, 0.1);
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

.favorite-button:focus {
  outline: none;
}

.favorite {
  color: gold;
}

.fa-eye {
  margin-left: 8px;
  color: green;
}

.fa-star {
  font-size: 16px;
}

.fa-seedling,
.fa-leaf,
.fa-bread-slice {
  font-size: 20px; /* Adjust the icon size as needed */
  margin-right: 4px; /* Add spacing between icons */
}

.recipe-card:hover .recipe-title,
.recipe-card:hover .detail-item {
  color: red;
  text-decoration: none; /* Remove text underline on hover */
}

.recipe-previe {
  text-decoration: none; /* Remove text underline */
  display: inline-block; /* Remove the default block display */
}
</style>