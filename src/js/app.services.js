
import SuccessService from 'services/Success.js';
import ErrorsService from 'services/Error.js';
import ConfirmService from 'services/Confirm.js';
let Services = [
  SuccessService,
  ErrorsService,
  ConfirmService,
];
export default class {
  static inject(app) {
    for (let service of Services) {
      app.factory(...service);
    }
  }
}
