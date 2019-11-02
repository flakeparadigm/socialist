const fakeDb = {
  users: {
    flakeparadigm: {
      id: 'flakeparadigm',
    },
    alice: {
      id: 'alice',
    },
  },

  entries: {
    0: {
      id: '0',
      owner: 'flakeparadigm',
      creator: 'flakeparadigm',
      title: 'Some title',
      url: 'http://example.com',
      done: false,
    },
    1: {
      id: '1',
      owner: 'alice',
      creator: 'alice',
      title: 'Another title',
      url: 'http://google.com',
      done: false,
    },
    2: {
      id: '2',
      owner: 'flakeparadigm',
      creator: 'flakeparadigm',
      title: 'A text post!',
      url: '',
      done: false,
    },
  },
};

function fakeNetworkLag(callback) {
  const wait = 3000 * Math.random();

  return new Promise((resolve, reject) => {
    window.setTimeout(() => callback(resolve, reject), wait);
  });
}

/* Public "endpoints" */
function addEntry(e) {
  return fakeNetworkLag((resolve) => {
    const entry = {
      ...e,
      id: Object.keys(fakeDb.entries).length,
      done: false,
    };

    fakeDb.entries[entry.id] = entry;
    resolve(entry);
  });
}

function updateEntry(changes) {
  return fakeNetworkLag((resolve) => {
    const entry = fakeDb.entries[changes.id];

    Object.assign(entry, changes);
    resolve(entry);
  });
}

function fetchEntries(ids) {
  const { entries } = fakeDb;

  return fakeNetworkLag((resolve) => {
    resolve(ids.map((id) => entries[id])
      .filter((entry) => !!entry)
      .reverse());
  });
}

function fetchUnreadEntryIds() {
  const { entries } = fakeDb;

  return fakeNetworkLag((resolve) => {
    resolve(Object.keys(entries)
      .filter((id) => !entries[id].done)
      .reverse());
  });
}

function fetchEntryIdsByUser(user) {
  const { entries } = fakeDb;

  return fakeNetworkLag((resolve) => {
    resolve(Object.keys(entries)
      .filter((id) => entries[id].owner === user)
      .reverse());
  });
}

export default {
  addEntry,
  updateEntry,
  fetchEntries,
  fetchUnreadEntryIds,
  fetchEntryIdsByUser,
};
