
let injection = ['ConfirmService', ['$rootScope', '$q', ConfirmService]];

function ConfirmService($rootScope, $q) {
  let service = {};
  service.confirm = function (params) {
    if ($rootScope.confirmDialogs === undefined) {
      $rootScope.confirmDialogs = [];
    }
    
    let defer = $q.defer();
  
    let instance = Object.assign(
      params.__noCopy ? params : angular.copy(params),
      {
        defer: defer
      }
    );
    
    /// push new element from above - to keep order
    $rootScope.confirmDialogs.unshift(instance);
    
    return defer.promise;
  };
  
  service.approve = function (index) {
    let closed = $rootScope.confirmDialogs.splice(index, 1).pop();
    closed.defer.resolve();
  };
  
  service.reject = function (index) {
    let closed = $rootScope.confirmDialogs.splice(index, 1).pop();
    closed.defer.reject();
  };
  
  return service;
}


export default injection;
