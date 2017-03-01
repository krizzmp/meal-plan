import { curry } from 'ramda';
const g = {
  test() {
    return 'test';
  }
};

const match = curry((obj, x) => {
  return obj[x]();
});

match(g, 'test');
