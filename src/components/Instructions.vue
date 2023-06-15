<template>
  <div>
    {{
      instructions.length > $root.store.consts.MAX_LENGTH_INSTRUCTIONS && readMore === false
        ? instructions.substring(0, $root.store.consts.MAX_LENGTH_INSTRUCTIONS) + "..."
        : instructions
    }}
    <b-button
      v-if="instructions.length > $root.store.consts.MAX_LENGTH_INSTRUCTIONS && !readMore"
      size="sm"
      variant="link"
      @click="readMore = !readMore"
      >Read More</b-button
    >
  </div>
</template>
  
  <script>

export default {
  name: "Instructions",
  props: {
    instructions: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      readMore: false
    };
  },
};
</script>
  
  <style>
</style>