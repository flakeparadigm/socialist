<template>
  <div class="feed">
    <h2 class="page-title">
      List: {{ listTitle }}
      <a href="#" @click="updateEntries">
        🔁
      </a>
    </h2>
    <p class="toggle-text">
      <a href="#" @click="showDone = !showDone">
        <span v-if="showDone">Hide</span>
        <span v-else>Show</span>
        done
      </a>
    </p>

    <add-entry :listId="this.listId" @submitted="updateEntries" />
    <entry-list :entries="entries" />

    <hr v-if="shouldShowLoadingHr" class="add-bottom" />
    <p v-if="isLoading">
      <img src="/static/images/loading.svg" />
    </p>
    <p v-else class="text-fin">Fin.</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import AddEntry from '@/components/AddEntry.vue';
import EntryList from '@/components/EntryList.vue';
import LIST_QUERY from '@/schemas/List/list.graphql';
import { Entry } from '@/schemas/Entry/types.ts';
import { List } from '@/schemas/List/types.ts';

@Component({
  apollo: {
    list: {
      query: LIST_QUERY,
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
  },
  components: { EntryList, AddEntry },
  computed: mapGetters(['loggedIn', 'currentUser']),
})
class ViewList extends Vue {
  private readonly $apolloData: { loading: number };

  private list: List;

  private loggedIn: boolean;

  private currentUser: string;

  @Prop(String) private readonly listId: string;

  private showDone = false;

  private entries: Entry[] = [];

  get isLoading(): boolean {
    return this.$apolloData.loading > 0;
  }

  get listTitle() {
    return this.list ? this.list.name : '⏱';
  }

  get shouldShowLoadingHr() {
    return (
      this.isLoading
      && ((this.entries && !this.entries.length) || !this.entries)
    );
  }

  updateEntries(done: () => void) {
    this.$apollo.queries.list.refetch().then(done);
  }

  beforeMount() {
    if (!this.loggedIn) {
      this.$router.replace({ name: 'Home' });
    }
  }

  mounted() {
    this.$apollo.queries.list.refetch();
  }
}
export default ViewList;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
p {
  text-align: center;
}
</style>
