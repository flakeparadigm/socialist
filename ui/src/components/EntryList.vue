<template>
  <div class="entry-list">
    <entry-summary v-for="entry in filteredEntries" :key="entry.id" :entry="entry" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Entry } from '@/schemas/Entry/typedefs.ts';
import EntrySummary from './EntrySummary.vue';

export default Vue.extend({
  name: 'EntryList',
  components: { EntrySummary },
  props: {
    entries: Array,
  },
  computed: {
    filteredEntries() {
      return this.entries.filter((entry: Entry) => !!entry);
    },
  },
});
</script>

<style scoped>
.entry-list {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 -1em;
}
</style>
