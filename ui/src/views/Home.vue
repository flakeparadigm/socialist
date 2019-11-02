<template>
  <div class="home">
    <h2>Welcome</h2>

    <div class="login">
      <h3>Please login</h3>

      <form @submit.prevent="login">
        <input v-model="newUser" placeholder="User" /><br>
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Home',

  data: () => ({
    newUser: '',
  }),

  computed: {
    ...mapGetters(['loggedIn']),
  },

  methods: {
    login() {
      this.$store.dispatch('USER_LOGIN', { user: this.newUser })
        .then(() => {
          if (this.loggedIn) this.$router.push({ name: 'Feed' });
        });
    },
  },

  beforeMount() {
    this.$bar.finish();

    if (this.loggedIn) {
      this.$router.replace({ name: 'Feed' });
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
