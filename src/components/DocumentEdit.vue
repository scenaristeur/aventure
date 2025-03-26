<template>
  <div v-if="doc != null">
    <div v-for="block of doc.blocks" v-bind:key="block.id">
      menu:
      <div :id="block.id" contenteditable="true" @blur="blur" @input="input">
        {{ block.content || block.default }}
      </div>
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click="addBlock({ type: 'paragraph', default: 'Hello World' })"
    >
      Text
    </button>
    <button
      type="button"
      class="btn btn-primary"
      @click="addBlock({ type: 'img', default: 'https://picsum.photos/200/300' })"
    >
      Image
    </button>

    <hr />
    the doc {{ doc }}
  </div>
</template>

<script>
export default {
  name: "DocumentEdit",
  methods: {
    blur(e) {
      console.log(e.target.id, e.target);
      let block = {
        id: e.target.id,
        // innerHTML: e.target.innerHTML,
        content: e.target.innerText,
      };
      console.log("Blur", block);
      this.$store.dispatch("document/updateBlock", block);
    },
    // input(e) {
    //   console.log(e.target.id, e.target);
    //   // let block = {
    //   //   id: e.target.id,
    //   //   //content: e.target.innerHTML,
    //   //   innerText: e.target.innerText,
    //   // };
    //   // this.$store.dispatch("document/updateBlock", block);
    // },
    addBlock(params) {
      this.$store.dispatch("document/newBlock", params);
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
