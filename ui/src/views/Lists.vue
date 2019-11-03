<template>
  <div class="lists">
    <h2 class="page-title">
      Your Lists
    </h2>

    <div class="page-content">
      <ul>
        <li v-for="list in lists" :key="list.id">
          <router-link
            :to="{ name: 'ViewList', params: { listId: list.id }}"
          >{{ list.name }}</router-link>
        </li>
      </ul>
    </div>

    <p v-if="isLoading">
      <img src="/static/images/loading.svg" />
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import LISTS_QUERY from '@/schemas/List/lists.graphql';
import { List } from '@/schemas/List/types.ts';

@Component({
  apollo: {
    lists: {
      query: LISTS_QUERY,
      variables() {
        return {
          ownerId: this.currentUser,
        };
      },
      watchLoading(isLoading: boolean) {
        if (isLoading && !this.isLoading) {
          this.isLoading = isLoading;
          this.$bar.start();
        } else if (!isLoading && this.isLoading) {
          this.isLoading = isLoading;
          this.$bar.finish();
        }
      },
    },
  },
  computed: mapGetters(['loggedIn', 'currentUser']),
})
class Lists extends Vue {
  private loggedIn: boolean;

  private currentUser: string;

  private isLoading = false;

  private showDone = false;

  private lists: List[] = [];

  beforeMount() {
    if (!this.loggedIn) {
      this.$router.replace({ name: 'Home' });
    }
  }
}
export default Lists;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
p {
  text-align: center;
}
</style>
