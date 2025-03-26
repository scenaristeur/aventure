<template>
  <span class="login">
    <!-- <b-icon-person-circle></b-icon-person-circle> -->
    <div
      v-if="session == null || session.isLoggedIn == false"
      class="d-flex align-items-center"
    >
      <select class="custom-select" autofocus size="sm" v-model="issuer" @change="login">
        <option :value="null" selected>-- Login / Connexion --</option>
        <option v-for="issuer in issuers" :key="issuer.value" :value="issuer.value">
          {{ issuer.text }}
        </option>
      </select>
    </div>

    <div v-else class="d-flex align-items-center">
      <button class="btn btn-danger" @click="logout" size="sm">Logout</button>
      <a :href="session.webId" target="_blank">pod</a>
    </div>
  </span>
</template>

<script>
export default {
  name: "SolidLogin",
  data() {
    return {
      issuers: [
        { value: "https://solidcommunity.net", text: "SolidCommunity.net (NSS)" },
        { value: "https://solidweb.org", text: "Solidweb.org (NSS)" },
        { value: "https://solidweb.me/", text: "Solidweb.me (CSS)" },
        {
          value: "https://broker.pod.inrupt.com",
          text: "Broker Pod Inrupt (Entreprise Solid Server)",
        },
        { value: "https://inrupt.net", text: "Inrupt.net (NSS)" },
        { value: "https://dev.inrupt.net", text: "dev.inrupt.net (NSS)" },
        { value: "https://trinpod.us/", text: "Trinpod.us (hs ?)" },
        { value: "other", text: "Autre / Other" },
      ],
      issuer: null,
      restore: true,
      other: "",
    };
  },
  mounted() {
    this.$store.dispatch("solid/checkSession");
  },
  methods: {
    onInput() {
      console.log("input", this.other);
    },
    onChange() {
      console.log("change", this.other);
      if (this.other != undefined && this.other.length != undefined) {
        this.issuer = this.other;
        this.login(this.issuer);
      }
    },
    login(e) {
      let issuer = e.target.value;
      console.log("login", issuer);
      this.issuer = issuer;
      if (this.issuer != null && this.issuer != "other") {
        console.log(this.issuer);
        this.$store.dispatch("solid/login", this.issuer);
      }
    },
    logout() {
      this.$store.dispatch("solid/logout");
    },
  },
  computed: {
    session: {
      get() {
        return this.$store.state.solid.session;
      },
      set(/*value*/) {
        /*this.updateTodo(value)*/
      },
    },
    state() {
      return this.other.startsWith("http");
    },
    invalidFeedback() {
      if (this.other.length > 0 && !this.other.startsWith("http")) {
        return "the url of your pod provider should start with `http`";
      }
      return "the url of your pod provider, not your webId ! ";
    },
  },
};
</script>

<style>
/* .login{
float: left
} */
</style>
