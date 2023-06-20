<template>
  <div>
    <div v-if="ingredients">
      <b-row v-for="(i, index) in ingredients.split(',')" :key="index">
        {{i}}
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ingredients",
  props: {
    ingredients: {
      type: String,
      required: true,
    }
  }
};
</script>

<style>
</style>