
let injection = ['SuccessService', ['$rootScope', '$q', SuccessService]];

function SuccessService($rootScope, $q) {
  
  let service = {};
  service.setSuccess = function (params) {
    if ($rootScope.successDialogs === undefined) {
      $rootScope.successDialogs = [];
    }
    
    let defer = $q.defer();
    
    let instance = {
      message: params.message,
      defer: defer
    };
    
    /// push new element from above - to keep order
    $rootScope.successDialogs.unshift(instance);
    
    return defer.promise;
  };
  
  service.closeSuccess = function (index) {
    let closed = $rootScope.successDialogs.splice(index, 1).pop();
    closed.defer.resolve();
  };
  
  return service;
}


export default injection;
