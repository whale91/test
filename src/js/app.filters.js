
import emptyToDefault from 'filters/empty_to_default.js';
import trust from 'filters/trust.js';
let Filters = [
  emptyToDefault,
  trust,
];
export default class {
  static inject(app) {
    for (let filter of Filters) {
      app.filter(...filter);
    }
  }
}
