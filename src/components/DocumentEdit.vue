<template>
  <div v-if="doc != null">
    <h1 id="titre" contenteditable="true" @blur="blur">{{ doc.title }}</h1>
    <div class="flex m-10">
      <draggable class="dragArea list-group w-full" :list="doc.blocks" @change="log">
        <div
          class="list-group-item bg-gray-300 m-1 p-3 rounded-md"
          v-for="block in doc.blocks"
          :key="block.id"
        >
          <div
            :id="block.id"
            contenteditable="true"
            @blur="blur"
            @input="input"
            style="display: inline-block"
          >
            <!-- <img v-if="block.type == 'img'" :src="block.content || block.default" />
            <div v-else> -->
            {{ block.content || block.default }}
            <!-- </div> -->
          </div>
        </div>
      </draggable>
    </div>

    <hr />
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
import { VueDraggableNext } from "vue-draggable-next";
export default {
  name: "DocumentEdit",
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      enabled: true,
      list: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 },
      ],
      dragging: false,
    };
  },
  methods: {
    log(event) {
      console.log(event);
    },
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
