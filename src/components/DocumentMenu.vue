<template>
  <div>
    <button type="button" class="btn btn-primary" @click="addDocument">+</button>
  </div>
</template>

<script>
export default {
  name: "DocumentMenu",
  methods: {
    addDocument() {
      this.$store.dispatch("document/newDoc");
    },
  },
};
</script>

<style scoped></style>
