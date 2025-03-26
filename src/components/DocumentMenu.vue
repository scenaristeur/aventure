<template>
  <div>
    <button type="button" class="btn btn-primary" @click="addDocument">+</button>

    <div v-for="doc in docs" :key="doc.id" @click="$store.commit('document/setDoc', doc)">
      {{ doc.title }}
    </div>
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
  computed: {
    docs() {
      return this.$store.state.document.docs;
    },
  },
};
</script>

<style scoped></style>
