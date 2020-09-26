import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { VNode } from 'vue';
import LISTS_QUERY from '@/schemas/List/lists.graphql';
import { List } from '@/schemas/List/types.ts';

@Component({
  computed: mapGetters(['currentUser']),
})
class Home extends Vue {
  private readonly currentUser: string;

  beforeMount(): void {
    this.$apollo.query({
      query: LISTS_QUERY,
      variables: {
        ownerId: this.currentUser,
      },
    }).then((result) => {
      const { lists }: { lists: List[]} = result.data;

      if (lists.length === 1) {
        const list = lists[0];

        this.$router.push({ name: 'ViewList', params: { listId: list.id } });
      } else {
        this.$router.push({ name: 'Lists' });
      }
    });
  }

  render(): VNode[] {
    return this.$slots.default;
  }
}
export default Home;
