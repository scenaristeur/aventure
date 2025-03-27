<template>
  <div v-if="session != null && session.isLoggedIn">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">@</span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="Username"
        aria-label="path"
        aria-describedby="basic-addon1"
        v-model="path"
      />
    </div>
    <button type="button" class="btn btn-primary" @click="save">save</button>
  </div>
</template>

<script>
export default {
  name: "PodSave",
  data() {
    return {
      // path: "public/aventure/",
    };
  },
  methods: {
    save() {
      this.$store.dispatch("document/save", { path: this.path, type: "solid" });
    },
  },
  computed: {
    path() {
      return this.$store.state.solid_data.aventures_path;
    },
    session() {
      return this.$store.state.solid.session;
    },
  },
};
</script>

<style scoped></style>
