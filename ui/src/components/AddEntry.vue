<template>
  <form class="entry-add" :class="{ loading: disabled }" @submit.prevent="submit">
    <div class="fields">
      <input class="title" v-model="entry.title" :disabled="disabled" placeholder="Title">
      <input class="url" v-model="entry.url" :disabled="disabled" placeholder="URL (optional)">
    </div>
    <input class="submit" type="submit" :disabled="disabled" value="⏎" title="Submit your post">
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import CREATE_ENTRY from '@/schemas/Entry/createEntry.graphql';
import { EntryInput } from '@/schemas/Entry/types.ts';
import ProgressBar from './ProgressBar.vue';

function getBlankEntry(component: AddEntry): EntryInput {
  return {
    listId: component.listId,
    creatorId: component.currentUser,
    title: '',
  };
}

@Component({
  computed: mapGetters(['currentUser']),
})
class AddEntry extends Vue {
  private readonly $bar: ProgressBar;

  readonly currentUser: string;

  @Prop(String) readonly listId: string;

  private disabled = false;

  private entry: EntryInput = null;

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
        this.$bar.fail();
        this.disabled = false;
      });
  }

  sendMutation(entry: EntryInput) {
    return this.$apollo.mutate({
      mutation: CREATE_ENTRY,
      variables: { entry },
    });
  }

  done() {
    this.$bar.finish();
    this.entry = getBlankEntry(this);
    this.disabled = false;
  }

  beforeMount() {
    this.entry = getBlankEntry(this);
  }
}
export default AddEntry;
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
