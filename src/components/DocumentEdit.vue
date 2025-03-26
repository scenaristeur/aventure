<template>
  <div>
    the doc {{ doc }}
    <div v-for="block of doc.blocks" v-bind:key="block.id">
      menu:
      <div :id="block.id" contenteditable="true" @change="change" @input="input">
        {{ block.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentEdit",
  methods: {
    // change(e) {
    //   console.log("change", e);
    // },
    input(e) {
      console.log("input", e.target.innerHTML, e.target.id);
    },
  },
  watch: {
    doc() {
      console.log(this.doc);
    },
  },
  computed: {
    doc() {
      return this.$store.state.document.doc;
    },
  },
};
</script>

<style scoped></style>
