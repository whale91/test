import Controllers from 'app.controllers';
import Services from 'app.services';
import Filters from 'app.filters';
import Directives from 'app.directives';


import Routes from 'app.route.js';

let $q = angular.injector(['ng']).get('$q');
// let $cookies = angular.injector(['ng']).get('$cookies');

let app = angular.module('test', ['ui.router', 'ui.mask'])
                 /// configure routes
                 .config([
                           '$stateProvider', '$urlRouterProvider', '$locationProvider', (
                     $stateProvider,
                     $urlRouterProvider,
                     $locationProvider,
                   ) => {
                     "use strict";
                     let Resolves = Controllers.getResolves();
                     for (let route of Routes) {
                       if (typeof Resolves[route.route_object.controller] === 'function') {
                         /// and wrap all resolves with try-catch and catch-reject for rethrow by logging error!
                         let resolves = route.route_object.resolve = Resolves[route.route_object.controller]();
                         for (let res of Object.keys(route.route_object.resolve)) {
                           resolves[res][resolves[res].length - 1] = (function (_resolve) {
                             return function () {
                               try {
                                 let _r = _resolve(...arguments);
                                 if (_r.catch instanceof Function) {
                                   _r.catch(reject => {
                                     console.error(reject);
                                     return $q.reject(reject);
                                   });
                                 }
                                 return _r;
                               }
                               catch (error) {
                                 console.error(error);
                                 throw error;
                               }
                             };
                           })(resolves[res][resolves[res].length - 1]);
                         }
                       }
                       $stateProvider.state(route.name, route.route_object);
                     }
    
                     $urlRouterProvider.otherwise('/');
                     $locationProvider.html5Mode({
                                                   enabled:     true,
                                                   // requireBase: false,
                                                 });
                   },
                         ]);


// after app.config
  "use strict";
  Services.inject(app);
  /// injecting controllers
  Controllers.inject(app);
  Directives.inject(app);
  Filters.inject(app);
document.addEventListener("DOMContentLoaded", function (){
  angular.bootstrap(document, ['test']);
});
// });


