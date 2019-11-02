<template>
  <div class="feed">
    <h2 class="page-title">
      Welcome,
      <router-link
        :to="{ name: 'FromUser', params: { viewUser: currentUser } }"
      >{{ currentUser | capitalize }}</router-link>!
    </h2>
    <p class="toggle-text">
      <a @click="showDone = !showDone">
        <span v-if="showDone">Hide</span>
        <span v-else>Show</span>
        done
      </a>
    </p>

    <add-entry :ownerId="currentUser" @submitted="updateEntries" />
    <entry-list :entries="entries" />

    <hr v-if="shouldShowLoadingHr" class="add-bottom" />
    <p v-if="isLoading">
      <img src="/static/images/loading.svg" />
    </p>
    <p v-else class="text-fin">Fin.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import AddEntry from '@/components/AddEntry.vue';
import EntryList from '@/components/EntryList.vue';
import ENTRIES from '@/graphql/entries.graphql';

export default Vue.extend({
  name: 'Feed',
  components: { EntryList, AddEntry },

  data: () => ({
    isLoading: false,
    showDone: false,
    entries: [],
  }),

  computed: {
    shouldShowLoadingHr() {
      return (
        this.isLoading
        && ((this.entries && !this.entries.length) || !this.entries)
      );
    },
    ...mapGetters(['loggedIn', 'currentUser']),
  },

  apollo: {
    entries: {
      query: ENTRIES,
      variables() {
        return {
          owner: this.currentUser,
          done: this.showDone ? undefined : false,
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

  methods: {
    updateEntries(done: () => void) {
      this.$apollo.queries.entries.refetch().then(done);
    },
  },

  beforeMount() {
    if (!this.loggedIn) {
      this.$router.replace({ name: 'Home' });
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
p {
  text-align: center;
}
</style>
