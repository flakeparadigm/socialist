function addDataToQuery(store, { name, query, variables }, newData) {
  try {
    const data = store.readQuery({ query, variables });
    const list = data[name];

    if (newData.id < 0) {
      list.push(newData);
    } else {
      const insertIndex = list.findIndex((element) => element.id > newData.id);
      list.splice(insertIndex, 0, newData);
    }

    store.writeQuery({ query, variables, data });
  } catch (error) {
    // fail silently if the query hasn't been cached before
    if (error.message.indexOf("Can't find field") === -1) {
      throw error;
    }
  }
}

export function addToCachedLists(dataKey, queries = []) {
  return (store, { data }) => {
    const newData = data[dataKey];
    queries.forEach((query) => addDataToQuery(store, query, newData));
  };
}

function removeFromQuery(store, { name, query, variables }, removeData) {
  try {
    const data = store.readQuery({ query, variables });
    const list = data[name];
    const removeIndex = list.findIndex((element) => element.id === removeData.id);

    if (removeIndex !== -1) {
      list.splice(removeIndex, 1);
      store.writeQuery({ query, variables, data });
    }
  } catch (error) {
    // fail silently if the query hasn't been cached before
    if (error.message.indexOf("Can't find field") === -1) {
      throw error;
    }
  }
}

export function removeFromCachedLists(dataKey, queries = []) {
  return (store, { data }) => {
    const newData = data[dataKey];
    queries.forEach((query) => removeFromQuery(store, query, newData));
  };
}
