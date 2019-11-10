<template>
  <div class="login">
    <h2 class="page-title">
      Please login
    </h2>

    <div class="page-content">
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
import { Route } from 'vue-router';

@Component({
  computed: mapGetters(['loggedIn']),
})
class Login extends Vue {
  private loggedIn: boolean;

  private newUser = '';

  login() {
    this.$store.dispatch('USER_LOGIN', { user: this.newUser })
      .then(() => {
        const newRoute = this.$route.query.redirect.toString() || '/';

        if (this.loggedIn) {
          this.$router.push(newRoute);
        }
      });
  }

  beforeRouteEnter(to: Route, from: Route, next: Function) {
    if (this.loggedIn) {
      next({ name: 'Home' });
    }
  }
}

export default Login;
</script>
