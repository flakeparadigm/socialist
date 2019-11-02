<template>
  <form class="entry-add" :class="{ loading: disabled }" @submit.prevent="submit">
    <div class="fields">
      <input class="title" v-model="entry.title" :disabled="disabled" placeholder="Title">
      <input class="url" v-model="entry.url" :disabled="disabled" placeholder="URL (optional)">
    </div>
    <input class="submit" type="submit" :disabled="disabled" value="&gt;" title="Submit your post">
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import CREATE_ENTRY from '@/graphql/createEntry.graphql';
import ENTRIES from '@/graphql/entries.graphql';
import { addToCachedLists } from '@/utils/apolloCacheHelpers';
import { Entry } from '@/schemas/Entry/typedefs.ts';

function getBlankEntry(component: any) {
  return {
    ownerId: component.ownerId,
    creatorId: component.currentUser,
    title: '',
  };
}

export default Vue.extend({
  name: 'AddEntry',
  props: {
    ownerId: String,
  },

  data: () => ({
    disabled: false,
    entry: {},
  }),

  computed: {
    ...mapGetters(['currentUser']),
  },

  methods: {
    submit() {
      if (!this.entry.title) {
        return;
      }

      this.disabled = true;
      this.$bar.start();

      this.sendMutation(this.entry)
        .then(() => {
          this.$emit('submitted', this.done);
        })
        .catch(() => {
          // TODO: handle error?
          this.disabled = false;
        });
    },

    sendMutation(entry: Entry) {
      return this.$apollo.mutate({
        mutation: CREATE_ENTRY,
        variables: { entry },
        update: addToCachedLists('createEntry', [
          { name: 'entries', query: ENTRIES, variables: { owner: this.ownerId } },
          { name: 'entries', query: ENTRIES, variables: { owner: this.ownerId, done: false } },
          { name: 'entries', query: ENTRIES, variables: { owner: this.ownerId, creator: this.currentUser } },
          { name: 'entries', query: ENTRIES, variables: { owner: this.ownerId, creator: this.currentUser, done: false } },
        ]),

        // refetchQueries: [
        //   { query: ENTRIES, variables: { owner: this.ownerId, done: false } },
        //   { query: ENTRIES, variables: { owner: this.ownerId, done: null } },
        // ],
      });
    },

    done() {
      this.$bar.finish();
      this.entry = getBlankEntry(this);
      this.disabled = false;
    },
  },

  beforeMount() {
    this.entry = getBlankEntry(this);
  },
});
</script>

<style lang="scss" scoped>
.entry-add {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  clear: both;
  margin: 0 -1em;

  display: flex;
  align-items: stretch;
  justify-content: space-between;

  &.loading {
    background: rgba(0, 0, 0, 0.05);
    cursor: progress;
  }

  .fields {
    flex: 1;
    padding: 1em;

    input {
      background: rgba(0, 0, 0, 0.05);
      border: none;
      display: block;
      padding: 0;
      width: 100%;
        max-width: 25em;

      &[disabled], &[disabled]:hover, &[disabled]:focus {
        background: rgba(0, 0, 0, 0.05);
        cursor: progress;
      }

      &:hover, &:focus {
        background: rgba(0, 0, 0, 0.02);
      }

      &.title {
        font-size: 1.5em;
      }

      &.url {
        font-size: 0.75em;
        margin-top: 0.25em;
      }
    }
  }

  .submit {
    background: rgba(0, 0, 0, 0.03);
    border: none;
    box-sizing: content-box;
    cursor: pointer;
    font-size: 1em;
    padding: 1em;

    flex: 0 0 2em;

    &[disabled], &[disabled]:hover {
      background: inherit;
      color: inherit;
      cursor: progress;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.1);
      color: #4FC4A1;
    }
  }
}
</style>
