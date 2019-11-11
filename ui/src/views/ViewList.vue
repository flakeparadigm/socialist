<template>
  <div class="feed">
    <h2 class="page-title">
      List: {{ listTitle }}
      <a href="#" @click="updateEntries">
        🔁
      </a>
    </h2>

    <add-entry :listId="this.listId" @submitted="updateEntries" />
    <entry-list :entries="entries" @updated="updateEntries" />

    <p class="toggle-text">
      <a href="#" @click="toggleShowComplete">
        <span v-if="showComplete">Hide</span>
        <span v-else>Show</span>
        completed
      </a>
    </p>

    <entry-list v-if="showComplete" :entries="completedEntries" @updated="updateEntries" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import AddEntry from '@/components/AddEntry.vue';
import EntryList from '@/components/EntryList.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import LIST_QUERY from '@/schemas/List/list.graphql';
import { Entry } from '@/schemas/Entry/types.ts';
import { List } from '@/schemas/List/types.ts';

const QUERY_INCOMPLETE = 'list';
const QUERY_COMPLETED = 'listCompleted';

@Component({
  apollo: {
    [QUERY_INCOMPLETE]: {
      query: LIST_QUERY,
      skip() {
        return !this.visibleQueries.includes(QUERY_INCOMPLETE);
      },
      variables() {
        return {
          id: this.listId,
        };
      },
      update({ list }: { list: List }) {
        this.entries = list.entries;
        return list;
      },
    },
    [QUERY_COMPLETED]: {
      query: LIST_QUERY,
      skip() {
        return !this.visibleQueries.includes(QUERY_COMPLETED);
      },
      variables() {
        return {
          id: this.listId,
          complete: true,
        };
      },
      update({ list }: { list: List }) {
        this.completedEntries = list.entries;
        return list;
      },
    },
  },
  components: { EntryList, AddEntry },
  watch: {
    visibleQueries(queries) {
      if (queries.includes(QUERY_COMPLETED)) this.updateQueries(queries);
    },
  },
})
class ViewList extends Vue {
  private readonly $bar: ProgressBar;

  private readonly list: List;

  @Prop(String) private readonly listId: string;

  private showComplete = false;

  private entries: Entry[] = [];

  private completedEntries: Entry[] = [];

  private visibleQueries: string[] = [QUERY_INCOMPLETE];

  get listTitle() {
    return this.list ? this.list.name : '⏱';
  }

  toggleShowComplete() {
    this.showComplete = !this.showComplete;

    if (this.showComplete) {
      this.visibleQueries.push(QUERY_COMPLETED);
    } else {
      this.visibleQueries = this.visibleQueries.filter((query) => query !== QUERY_COMPLETED);
    }
  }

  updateQueries(queries: string[]) {
    const handleProgress = !this.$bar.isActive;

    if (handleProgress) this.$bar.start();

    return Promise.all(
      queries.map(
        (query) => this.$apollo.queries[query].refetch(),
      ),
    )
      .then(() => {
        if (handleProgress) this.$bar.finish();
      })
      .catch(() => {
        if (handleProgress) this.$bar.fail();
      });
  }

  updateEntries(done?: () => void) {
    return this.updateQueries(Object.keys(this.$apollo.queries))
      .then(done);
  }

  mounted() {
    this.$apollo.queries.list.refetch();
  }
}
export default ViewList;
</script>

<style lang="scss" scoped>
p {
  text-align: center;
}
</style>
