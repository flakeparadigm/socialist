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
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import ProgressBar from '../components/ProgressBar.vue';

@Component({
  computed: mapGetters(['loggedIn']),
})
class Home extends Vue {
  private $bar: ProgressBar;

  private loggedIn: boolean;

  private newUser = '';

  login() {
    this.$store.dispatch('USER_LOGIN', { user: this.newUser })
      .then(() => {
        if (this.loggedIn) this.$router.push({ name: 'Lists' });
      });
  }

  beforeMount() {
    this.$bar.finish();

    if (this.loggedIn) {
      this.$router.replace({ name: 'Lists' });
    }
  }
}
export default Home;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
