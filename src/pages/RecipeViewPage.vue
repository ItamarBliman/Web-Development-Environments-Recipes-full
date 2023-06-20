<template>
  <div class="main">
    <div class="cards_item">
      <div class="card">
        <div class="card_image">
          <img :src="recipe.image" />
          <div
            v-if="
              this.$root.store.username &&
              this.$route.params.recipeId[0] !== '-'
            "
          >
            <button
              class="favorite-button"
              :class="{ favorite: recipe.favorite }"
              @click.prevent="toggleFavorite(recipe)"
            >
              <i class="fas fa-star" title="Favorite"></i>
            </button>
          </div>
        </div>
        <div class="card_content">
          <h2 class="card_title">{{ recipe.title }}</h2>
          <hr />
          <div class="recipe-details">
            <div class="icons">
              <i class="fas fa-clock" title="Time">
                {{ recipe.readyInMinutes }} minutes</i
              >
              <i class="fas fa-thumbs-up" title="Likes">
                {{ recipe.aggregateLikes }}</i
              >
              <i
                class="fas fa-utensils"
                title="Servings"
                style="
                  --fa-primary-color: #666666;
                  --fa-secondary-color: #cccccc;
                  --fa-secondary-opacity: 0.7;
                "
              >
                {{ recipe.servings }}
              </i>
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
          </div>
          <div class="card_text">
            <div
              v-if="
                recipe.extendedIngredients && recipe.extendedIngredients.length
              "
            >
              <hr />
              <h3>Ingredients:</h3>
              <Ingredients :ingredients="recipe.extendedIngredients" style="text-align: left"/>
            </div>
            <div v-if="recipe.instructions">
              <hr />
              <h3>Instructions:</h3>
              <b-row
                style="text-align: left"
                v-for="(i, index) in recipe.instructions.split('\n\n')"
                :key="index"
              >
                {{ i }}
              </b-row>
              <!-- <Instructions :instructions="recipe.instructions" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>


<script>
import debounce from "lodash/debounce"; // Import debounce function from Lodash or use your custom debounce implementation
import Ingredients from "../components/Ingredients.vue";
import Instructions from "../components/Instructions.vue";
export default {
  components: { Ingredients },
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;

      try {
        response = await this.axios.get(
          this.$root.store.server_domain +
            "/recipes/" +
            this.$route.params.recipeId
        );

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        id,
        title,
        readyInMinutes,
        image,
        aggregateLikes,
        vegan,
        vegetarian,
        glutenFree,
        extendedIngredients,
        instructions,
        servings,
        favorite,
        watched,
      } = response.data;

      console.log("instructions", instructions);
      console.log(response.data);

      if (Array.isArray(instructions)) {
        // console.log("instructions", instructions);
        // instructions = instructions
        //   .map((fstep) => {
        //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
        //     return fstep.steps;
        //   })
        //   .map((step) => step.map((s) => s.step));

        // instructions = instructions[0].steps;
        if (!watched)
        {
          this.axios
          .post(this.$root.store.server_domain + `/users/watched`, {
            recipe_id: id,
          })
          .then(() => {
            watched = true;
          });
        }
        if (!instructions.length)
          instructions = undefined;
        else
        {
          instructions = instructions[0].steps
          .map((s) => String(s.number) + ". " + s.step)
          .join("\n\n");
        }
      }
      // .reduce((a, b) => [...a, ...b], []);
      console.log("instructions", instructions);

      let _recipe = {
        id,
        title,
        readyInMinutes,
        image,
        aggregateLikes,
        vegan,
        vegetarian,
        glutenFree,
        extendedIngredients,
        instructions,
        servings,
        favorite,
        watched,
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    toggleFavorite: debounce(function (recipe) {
      if (!this.$root.store.username) {
        this.$root.$bvToast.toast("Please login to see your favorite recipes", {
          title: "Login",
          variant: "warning",
          solid: true,
        });
        return;
      }
      if (recipe.favorite) {
        this.axios
          .delete(
            this.$root.store.server_domain + `/users/favorites/${recipe.id}`
          )
          .then(() => {
            recipe.favorite = false;
          });
      } else {
        this.axios
          .post(this.$root.store.server_domain + `/users/favorites`, {
            recipe_id: recipe.id,
          })
          .then(() => {
            recipe.favorite = true;
          });
      }
    }, 500),
  },
};
</script>

<style scoped>

body {
  font-family: "Oxygen", sans-serif;
  color: #050505;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.main {
  max-width: 1200px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0 auto;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
  justify-content: center;

}

.cards_item {
  display: flex;
  padding: 1rem;
  justify-content: center;
  text-align: center;
  
}

.card_image {
  position: relative;
  /* width: 70%; */
  margin: 20px auto 0 auto;
  /* max-height: 55%; */
}

.card_image img {
  border-radius: 0.75rem;
  width: 60%;
  /* max-height: 800px; */

}

.favorite-button {
  position: absolute;
  top: 0;
  right: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 0.25rem;
  background-color: #c89b3f;
  font-size: 18px;
  font-weight: 700;
}

.favorite-button span {
  font-size: 12px;
  margin-top: -2px;
}

.note {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 8px;
  border-radius: 0.25rem;
  background-color: #c89b3f;
  font-size: 14px;
  font-weight: 700;
  
}

@media (min-width: 40rem) {
  .cards_item {
    width: 50%;
    
  }
}

@media (min-width: 56rem) {
  .cards_item {
    width: 70%;
    
  }
}

.card {
  background-color: rgba(255, 255, 255, 0.587);
  border-radius: 0.75rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  overflow: hidden;
  position: absolute;
  width: 70%;
  max-height: 85%;

}

.card_content {
  position: relative;
  padding: 16px 12px 32px 24px;
  margin: 16px 8px 8px 0;
  /* max-height: 300px; */
  overflow-y: scroll;
  overflow-x: hidden;

}

.card_content::-webkit-scrollbar {
  width: 8px;
}

.card_content::-webkit-scrollbar-track {
  box-shadow: 0;
  border-radius: 0;
}

.card_content::-webkit-scrollbar-thumb {
  background: #c89b3f;
  border-radius: 15px;
}

.card_title {
  position: relative;
  margin: 0 0 24px;
  padding-bottom: 10px;
  text-align: center;
  /* font-size: 20px; */
  font-weight: 700;
}

/* .card_title::after {
  position: absolute;
  display: block;
  width: 50px;
  height: 2px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #c89b3f;
  content: "";
} */

hr {
  margin: 24px auto;
  width: 25%;
  border-top: 2px solid #c89b3f;
}

.card_text p {
  margin: 0 0 24px;
  font-size: 14px;
  line-height: 1.5;
}

.card_text p:last-child {
  margin: 0;
}

.icons {
  display: flex;
  /* justify-content: space-between; */
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10px;
}

.favorite-button:hover {
  background-color: rgb(233, 150, 7);
}

.favorite {
  color: gold;
}
</style>
