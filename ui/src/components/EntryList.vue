<template>
  <div class="entry-list">
    <entry-summary
      v-for="entry in filteredEntries"
      :key="entry.id"
      :entry="entry"
      @updated="$emit('updated')"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Entry } from '@/schemas/Entry/types.ts';
import EntrySummary from './EntrySummary.vue';

@Component({
  components: { EntrySummary },
})
class EntryList extends Vue {
  @Prop(Array) private readonly entries: Entry[];

  get filteredEntries(): Entry[] {
    return this.entries.filter((entry: Entry) => !!entry);
  }
}
export default EntryList;
</script>

<style scoped>
.entry-list {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 -1em;
}
</style>
