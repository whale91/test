
import Confirm from 'directives/confirm.js';
import Error from 'directives/error.js';
import Header from 'directives/header.js';
import Success from 'directives/success.js';
let Directives = [
  Header,
  Success,
  Error,
  Confirm,
];
export default class {
  static inject(app) {
    for (let directives of Directives) {
      app.directive(...directives);
    }
  }
}
