<template>
  <div>
    <b-modal v-model="showModal" hide-footer @hide="cancelAddRecipe">
      <div class="modal-content">
        <h2 class="modal-title">Create New Recipe</h2>
        <div class="modal-body">
          <label for="recipeTitle">Title</label>
          <input type="text" id="recipeTitle" v-model="newRecipe.title" />

          <br />

          <label for="recipeImage">Image</label>
          <input type="text" id="recipeImage" v-model="newRecipe.image" />

          <br />

          <label for="recipeReadyInMinutes">Ready in Minutes</label>
          <input
            type="number"
            min="1"
            id="recipeReadyInMinutes"
            v-model="newRecipe.readyInMinutes"
          />

          <br />
          <label for="recipeServings">Servings</label>
          <input
            type="number"
            min="1"
            id="recipeServings"
            v-model="newRecipe.servings"
          />

          <br />

          <label for="recipeAggregateLikes">Aggregate Likes</label>
          <input
            type="number"
            min="0"
            id="recipeAggregateLikes"
            v-model="newRecipe.aggregateLikes"
          />

          <br />

          <div class="toggle-option">
            <button
              class="toggle-button"
              :class="{ active: newRecipe.vegan }"
              @click="newRecipe.vegan = !newRecipe.vegan"
            >
              <i class="fas fa-seedling"></i>
            </button>
            <span class="toggle-label">Vegan</span>
          </div>

          <div class="toggle-option">
            <button
              class="toggle-button"
              :class="{ active: newRecipe.vegetarian }"
              @click="newRecipe.vegetarian = !newRecipe.vegetarian"
            >
              <i class="fas fa-leaf"></i>
            </button>
            <span class="toggle-label">Vegetarian</span>
          </div>

          <div class="toggle-option">
            <button
              class="toggle-button"
              :class="{ active: newRecipe.glutenFree }"
              @click="newRecipe.glutenFree = !newRecipe.glutenFree"
            >
              <i class="fas fa-bread-slice"></i>
            </button>
            <span class="toggle-label">Gluten Free</span>
          </div>

          <br />

          <label for="recipeExtendedIngredients">Ingredients:</label>
          <div class="table-container">
            <table class="ingredient-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Unit</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(ingredient, index) in newRecipe.extendedIngredients"
                  :key="index"
                >
                  <td><input type="text" v-model="ingredient.name" /></td>
                  <td>
                    <input type="number" min="1" v-model="ingredient.amount" />
                  </td>
                  <td>
                    <select v-model="ingredient.unit">
                      <option value="">Select Unit</option>
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                      <option value="ml">ml</option>
                      <option value="l">l</option>
                      <option value="tsp">tsp</option>
                      <option value="tbsp">tbsp</option>
                      <option value="cup">cup</option>
                      <option value="oz">oz</option>
                      <option value="lb">lb</option>
                    </select>
                  </td>
                  <td>
                    <button class="remove-row" @click="removeIngredient(index)">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button class="add-row" @click="addIngredient">
              Add Ingredient
            </button>
          </div>

          <br />

          <label for="recipeInstructions">Instructions:</label>
          <br />

          <div class="table-container">
            <table class="instruction-table">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Instruction</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(instruction, index) in newRecipe.instructions"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td><textarea v-model="instruction.text"></textarea></td>
                  <td>
                    <button
                      class="remove-row"
                      @click="removeInstruction(index)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="add-row" @click="addInstruction">
            Add Instruction
          </button>
        </div>
        <div class="modal-footer">
          <button class="cancel-button" @click="cancelAddRecipe">Cancel</button>
          <button class="reset-button" @click="resetForm">Reset</button>
          <button class="save-button" @click="saveRecipe">Save</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { BModal } from "bootstrap-vue";

export default {
  components: {
    BModal,
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      newRecipe: {
        title: "",
        image: "",
        readyInMinutes: 1,
        servings: 1,
        aggregateLikes: 0,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        instructions: [{ text: "" }],
        extendedIngredients: [{ name: "", amount: 1, unit: "" }],
      },
    };
  },

  methods: {
    cancelAddRecipe() {
      this.newRecipe = {
        title: "",
        image: "",
        readyInMinutes: 1,
        servings: 1,
        aggregateLikes: 0,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        instructions: [{ text: "" }],
        extendedIngredients: [{ name: "", amount: 1, unit: "" }],
      };
      this.$emit("inputChange", false);
    },

    saveRecipe() {
      let DBrecipe = {
        title: this.newRecipe.title,
        image: this.newRecipe.image,
        readyInMinutes: this.newRecipe.readyInMinutes,
        servings: this.newRecipe.servings,
        aggregateLikes: this.newRecipe.aggregateLikes,
        vegan: this.newRecipe.vegan ? 1 : 0,
        vegetarian: this.newRecipe.vegetarian ? 1 : 0,
        glutenFree: this.newRecipe.glutenFree ? 1 : 0,
        instructions: this.newRecipe.instructions,
        extendedIngredients: this.newRecipe.extendedIngredients,
      };

      DBrecipe.extendedIngredients = this.newRecipe.extendedIngredients
        .map((ingredient) => {
          return (
            ingredient.name + " " + ingredient.amount + " " + ingredient.unit
          );
        })
        .join(",");
      DBrecipe.instructions = this.newRecipe.instructions
        .map((instruction, index) => {
          return String(index + 1) + ". " + instruction.text;
        })
        .join("\n\n");

      this.axios
        .post(this.$root.store.server_domain + "/users/createdRecipe", DBrecipe)
        .then((response) => {
          this.cancelAddRecipe();
          this.$root.toast("Create New Recipe", "New recipe created successfully", "success");
        })
        .catch((error) => {
          console.error("Error saving recipe:", error);
        });
    },

    addIngredient() {
      this.newRecipe.extendedIngredients.push({
        name: "",
        amount: 0,
        unit: "",
      });
    },

    removeIngredient(index) {
      this.newRecipe.extendedIngredients.splice(index, 1);
    },

    addInstruction() {
      this.newRecipe.instructions.push({ text: "" });
    },

    removeInstruction(index) {
      this.newRecipe.instructions.splice(index, 1);
    },
    resetForm() {
      this.newRecipe = {
        title: "",
        image: "",
        readyInMinutes: 1,
        servings: 1,
        aggregateLikes: 0,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        instructions: [{ text: "" }],
        extendedIngredients: [{ name: "", amount: 1, unit: "" }],
      };
    },
  },
};
</script>

<style scoped>
.modal-content {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 0.75rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}

.modal-title {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.modal-body {
  margin-bottom: 16px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.cancel-button,
.save-button,
.reset-button,
.add-row,
.remove-row {
  padding: 8px 16px;
  border-radius: 0.25rem;
  font-weight: 700;
}

.cancel-button {
  background-color: #c89b3f;
  color: #ffffff;
  margin-right: 8px;
}

.save-button {
  background-color: #669c35;
  color: #ffffff;
}
.reset-button {
  background-color: #ea0000;
  color: #ffffff;
}

.add-row {
  background-color: #669c35;
  color: #ffffff;
}

.remove-row {
  background-color: #c89b3f;
  color: #ffffff;
}

.add-row:hover,
.remove-row:hover {
  background-color: rgb(233, 150, 7);
}

.toggle-option {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.toggle-button {
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 24px;
  margin-right: 8px;
  cursor: pointer;
}

.toggle-button.active {
  color: #669c35;
}

.toggle-label {
  font-size: 18px;
}

.table-container {
  margin-bottom: 16px;
}

.ingredient-table,
.instruction-table {
  width: 100%;
  border-collapse: collapse;
}

.ingredient-table th,
.instruction-table th {
  text-align: left;
}

.ingredient-table th,
.ingredient-table td,
.instruction-table th,
.instruction-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.ingredient-table th:last-child,
.instruction-table th:last-child,
.ingredient-table td:last-child,
.instruction-table td:last-child {
  text-align: center;
}

.ingredient-table input[type="text"],
.instruction-table textarea,
.ingredient-table select {
  width: 100%;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

.remove-row {
  padding: 0;
  border: none;
  background-color: transparent;
  font-size: 18px;
  color: #c89b3f;
  cursor: pointer;
}

.remove-row:hover {
  color: rgb(233, 150, 7);
}
input[type="number"] {
  width: 70px;
  padding: 4px;
  margin: 2%;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  text-align: center;
}
input[type="text"] {
  width: 100%;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  text-align: center;
}
label {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  display: block;
}
</style>