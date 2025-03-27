<template>
  <div v-if="doc != null">
    <h1 id="titre" contenteditable="true" @blur="blur">{{ doc.title }}</h1>
    <small id="header" contenteditable="true" @blur="blur">{{ doc.header }}</small>
    <div class="flex m-10">
      <draggable class="dragArea list-group w-full" :list="doc.blocks" @change="log">
        <transition-group>
          <div v-for="block in doc.blocks" :key="block.id">
            <button type="button" class="btn btn-sm">☰</button>

            <div
              :id="block.id"
              contenteditable="true"
              @blur="blur"
              @input="input"
              autofocus
              style="display: inline-block"
              class="list-group-item bg-gray-300 m-1 p-3 rounded-md"
            >
              <!-- <img v-if="block.type == 'img'" :src="block.content || block.default" />
            <div v-else> -->
              {{ block.content || block.default }}
              <!-- </div> -->
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>

    <hr />
    <button
      type="button"
      class="btn btn-light btn-sm"
      @click="addBlock({ type: 'paragraph', default: '' })"
    >
      Text
    </button>
    <button
      type="button"
      class="btn btn-light btn-sm"
      @click="addBlock({ type: 'img', default: 'https://picsum.photos/200/300' })"
    >
      Image
    </button>
    <button
      type="button"
      class="btn btn-light btn-sm"
      @click="addBlock({ type: 'link', default: 'Hello World' })"
    >
      Link
    </button>
    <button
      type="button"
      class="btn btn-light btn-sm"
      @click="addBlock({ type: 'code', default: 'Hello World' })"
    >
      Code
    </button>
    <button
      type="button"
      class="btn btn-light btn-sm"
      @click="addBlock({ type: 'table', default: 'Hello World' })"
    >
      Table
    </button>
    <button
      type="button"
      class="btn btn-light btn-sm"
      @click="addBlock({ type: 'media', default: 'Hello World' })"
    >
      Media
    </button>
    <hr />
    Choix :
    <div v-for="choice in doc.choices" :key="choice.id">
      {{ choice }}
    </div>
    <button type="button" class="btn btn-primary" @click="addChoiceNew()">+ new</button>
    <button type="button" class="btn btn-primary" @click="addChoiceLink()">+ link</button>
    <hr />
    <button type="button" class="btn btn-light btn-sm" @click="debug = !debug">
      debug
    </button>
    <div v-if="debug">{{ doc }}</div>
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
      dragging: false,
      debug: false,
    };
  },
  methods: {
    log(event) {
      console.log(event);
      this.$store.dispatch("document/reorderBlocks", this.doc);
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
    addChoice(params) {
      this.$store.commit("document/newChoice", params);
    },
    async addChoiceNew() {
      let current_doc = this.doc;
      let id_new_doc = await this.$store.dispatch("document/newDoc");
      console.log("id_new_doc", id_new_doc);
      this.addChoice({ doc_id: current_doc.id, choice_id: id_new_doc });
    },
    addChoiceLink() {
      this.$store.dispatch("document/newChoice", { type: "link" });
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
