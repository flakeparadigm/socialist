<template>
  <div class="entry-summary">
    <div class="details">
      <p class="title">
        <a v-if="entry.url" :href="entry.url" target="_blank" rel="noopener">{{ entry.title }}</a>
        <span v-else>{{ entry.title }}</span>
      </p>

      <p class="meta">
        Added by
        <router-link :to="{ name: 'FromUser', params: { viewUser: entry.creator.id } }">
          {{ entry.creator.id | friendlyUser(currentUser) }}
        </router-link>
      </p>
    </div>

    <button
      class="completion"
      :class="{ done: entry.done }"
      :disabled="readOnly"
      @click="toggleDone"
      title="Mark as done"
    >
      ✓
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import ENTRIES from '@/graphql/entries.graphql';
import TOGGLE_ENTRY from '@/graphql/toggleEntry.graphql';
import {
  addToCachedLists,
  removeFromCachedLists,
} from '@/utils/apolloCacheHelpers';

export default Vue.extend({
  name: 'EntrySummary',
  props: {
    entry: Object,
  },
  computed: {
    readOnly() {
      return this.entry.owner.id !== this.currentUser;
    },
    ...mapGetters(['currentUser']),
  },
  methods: {
    toggleDone() {
      this.$bar.start();
      this.sendMutation().then(this.$bar.finish);
    },

    sendMutation() {
      return this.$apollo.mutate({
        mutation: TOGGLE_ENTRY,
        variables: {
          entryId: this.entry.id,
          done: !this.entry.done,
        },

        update: (store: any, data: any) => {
          const dataKey = 'toggleEntry';
          const queries = [
            {
              name: 'entries',
              query: ENTRIES,
              variables: {
                owner: this.entry.owner.id, done: false,
              },
            },
            {
              name: 'entries',
              query: ENTRIES,
              variables: {
                owner: this.entry.owner.id, creator: this.entry.creator.id, done: false,
              },
            },
          ];
          const helper = data.data.toggleEntry.done
            ? removeFromCachedLists(dataKey, queries)
            : addToCachedLists(dataKey, queries);

          helper(store, data);
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.entry-summary {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  clear: both;
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  .details {
    flex-grow: 1;
    padding: 1em;

    p {
      margin: 0;

      &.title {
        font-size: 1.5em;
      }

      &.meta {
        color: #888;
        font-size: 0.75em;
        margin-top: 0.25em;
      }
    }
  }

  .completion {
    background: rgba(0, 0, 0, 0.03);
    border: none;
    box-sizing: content-box;
    color: rgba(0, 0, 0, 0.1);
    font-size: 1em;
    font-weight: bold;
    padding: 1em;
    width: 2em;

    &:not([disabled]) {
      cursor: pointer;
    }

    &:hover:not([disabled]) {
      background: rgba(0, 0, 0, 0.1);
    }

    &:hover:not([disabled]), &.done {
      color: #4FC4A1;
    }
  }
}
</style>
