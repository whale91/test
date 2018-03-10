
import Chat from 'controllers/Chat.js';

let Controllers = [
 Chat
];
export default class {
  static inject(app) {
    for (let ctrl of Controllers) {
      app.controller(...ctrl);
    }
  }
  
  static getResolves() {
    let Resolves = {};
    for (let ctrl of Controllers) {
      /// [0] - controller name, [1] - injectable dependencies, last of them - controller
      let _ctrl = ctrl[1] instanceof Array ? ctrl[1][ctrl[1].length - 1] : ctrl[1];
      Resolves[ctrl[0]] = _ctrl.resolve;
    }
    
    return Resolves;
  }
}