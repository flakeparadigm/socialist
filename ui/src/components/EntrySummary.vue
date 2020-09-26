<template>
  <div class="entry-summary">
    <div class="details">
      <p class="title">
        <a v-if="entry.url" :href="entry.url" target="_blank" rel="noopener">{{ entry.title }}</a>
        <span v-else>{{ entry.title }}</span>
      </p>

      <p class="meta">
        Added by
        <!-- <router-link :to="{ name: 'FromUser', params: { viewUser: entry.creator.id } }"> -->
          {{ entry.creator.id | friendlyUser(currentUser) }}
        <!-- </router-link> -->
      </p>
    </div>

    <button
      class="completion"
      :class="{ complete: entry.complete }"
      :disabled="readOnly"
      @click="toggleComplete"
      title="Mark as complete"
    >
      ✓
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import TOGGLE_ENTRY from '@/schemas/Entry/toggleEntry.graphql';
import { Entry } from '@/schemas/Entry/types.ts';
import ProgressBar from './ProgressBar.vue';

@Component({
  computed: mapGetters(['currentUser']),
})
class EntrySummary extends Vue {
  private $bar: ProgressBar;

  private currentUser: string;

  @Prop(Object) private readonly entry: Entry;

  get readOnly(): boolean {
    return this.entry.list.owner.id !== this.currentUser;
  }

  toggleComplete(): void {
    this.$bar.start();
    this.sendMutation().then(this.$bar.finish);
  }

  sendMutation(): Promise<void> {
    return this.$apollo.mutate({
      mutation: TOGGLE_ENTRY,
      variables: {
        entryId: this.entry.id,
        complete: !this.entry.complete,
      },
    }).then(() => {
      this.$emit('updated');
    });
  }
}

export default EntrySummary;
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

    &:hover:not([disabled]), &.complete {
      color: #4FC4A1;
    }
  }
}
</style>
