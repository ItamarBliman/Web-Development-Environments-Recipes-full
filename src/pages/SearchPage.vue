<template>
  <div class="search-container">
    <h1 class="title">Search</h1>
    <div class="form-group-row">
      <div class="form-group">
        <label for="searchTerm">Search Term:</label>
        <input type="text" id="searchTerm" v-model="searchTerm" />
      </div>
      <div class="form-group">
        <label for="quantity">Quantity:</label>
        <select class="option2" id="quantity" v-model="quantity">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div class="form-group">
        <div class="sort-toggle" @click="toggleSortOptions">
          <i class="fas fa-arrow-down-wide-short"></i>
        </div>
        <div class="sort-options" v-show="showSortOptions">
          <label class="toggle-label">
            <span
              class="toggle-option"
              :class="{ active: sortBy === 'popularity' }"
              @click="sortBy = 'popularity'"
            >
              Popularity
            </span>
            <span
              class="toggle-option"
              :class="{ active: sortBy === 'time' }"
              @click="sortBy = 'time'"
            >
              Time
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="form-group-row">
      <div class="form-group">
        <label for="cuisine">Cuisine:</label>
        <select class="option1" id="cuisine" v-model="cuisine">
          <option value="Any">Any</option>
          <option v-for="c in cuisines" :value="c" :key="c">{{ c }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="diet">Diet:</label>
        <select class="option1" id="diet" v-model="diet">
          <option value="Any">Any</option>
          <option v-for="d in diets" :value="d" :key="d">{{ d }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="intolerances">Intolerances:</label>
        <select class="option1" id="intolerances" v-model="intolerance">
          <option value="Any">Any</option>
          <option v-for="i in intolerances" :value="i" :key="i">{{ i }}</option>
        </select>
      </div>
    </div>
    <div class="button-group">
      <b-button @click="search" variant="danger">Search</b-button>
    </div>
    <RecipePreviewList title="Search Results" :searchResults="searchResults" />
  </div>
</template>

<script>
import cuisines from "../assets/cuisines";
import diets from "../assets/diets";
import intolerances from "../assets/intolerances";
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      searchTerm: "",
      quantity: "5",
      cuisine: "Any",
      diet: "Any",
      intolerance: "Any",
      sortBy: "popularity",
      searchResults: [],
      searched: false,
      lastSearch: "",
      cuisines: cuisines,
      diets: diets,
      intolerances: intolerances,
      showSortOptions: false,
    };
  },
  methods: {
    search() {

      let { searchTerm, quantity, cuisine, diet, intolerance, sortBy } = this;

      cuisine = cuisine === "Any" ? undefined : cuisine;
      diet = diet === "Any" ? undefined : diet;
      intolerance = intolerance === "Any" ? undefined : intolerance;

      if (!this.showSortOptions) {
        sortBy = undefined;
      }

      console.log("Saving search:", this.searchTerm);
      this.axios
        .get(this.$root.store.server_domain + "/recipes/search", {
          params: {
            searchTerm,
            quantity,
            cuisine,
            diet,
            intolerances: intolerance,
            sortBy,
          },
        })
        .then((response) => {
          console.log("Search successfully:", response.data);
          this.searchResults = response.data;
          if (this.$root.store.username){
          this.$root.store.searchResults = response.data;
          }
        })
        .catch((error) => {
          console.error("Error saving recipe:", error);
        });
    },
    toggleSortOptions() {
      this.showSortOptions = !this.showSortOptions;
    },
  },
  mounted() {
    if (this.$root.store.searchResults !== null) {
      this.searchResults = this.$root.store.searchResults;
    }
  },
};
</script>

<style scoped>
.search-container {
  /* max-width: 400px; */
  width: 80%;
  margin: 0 auto;
}

.title {
  text-align: center;
}

.form-group-row {
  display: flex;
  width: 500px;
}

.form-group-row .form-group {
  margin-right: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"] {
  /* width: 100%; */
  /* width: 250px; */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.option1 {
  /* width: 20%; */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.option2 {
  /* width: 8%; */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.sort-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #cc2929;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sort-toggle:hover {
  background-color: #b00c0c;
}

.sort-options {
  top: 0;
  right: -120px;
  padding-left: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 200px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 5px;
}

.toggle-label {
  display: flex;
}

.toggle-option {
  padding: 5px 10px;
  background-color: #ddd;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-option:hover {
  background-color: #ccc;
}

.toggle-option.active {
  background-color: #cc2929;
  color: #fff;
}

.button-group {
  text-align: center;
}

.result-container {
  margin-top: 20px;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  margin-bottom: 5px;
}

.no-results {
  margin-top: 20px;
  text-align: center;
  color: #888;
}

.last-search {
  margin-top: 20px;
  text-align: center;
  color: #888;
}

label {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  display: block;
}
</style>
