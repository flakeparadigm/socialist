const filters: { [fn: string]: Function } = {
  capitalize(value: any): string {
    if (!value) return '';

    const newVal: string = value.toString();

    return newVal.charAt(0).toUpperCase() + newVal.slice(1);
  },

  friendlyUser: (value: string, currentUser: string): string => (value === currentUser ? 'me' : value),
};

export default filters;
