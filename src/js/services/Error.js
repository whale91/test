
let injection = ['ErrorsService', ['$rootScope', '$q', ErrorsService]];

function ErrorsService($rootScope, $q) {
  let service = {};  window.rsc = $rootScope;
  window.es = service;
  service.setError = function (params) {
    if ($rootScope.errorDialogs === undefined) {
      $rootScope.errorDialogs = [];
    }
    
    let defer = $q.defer();
    
    let instance = {
      title: params.title,
      errors: params.errors ? params.errors : [],
      defer: defer
    };
    
    /// push new element from above - to keep order
    $rootScope.errorDialogs.unshift(instance);
    
    return defer.promise;
  };
  
  service.closeError = function (index) {
    let closed = $rootScope.errorDialogs.splice(index, 1).pop();
    closed.defer.resolve();
  };
  
  return service;
}


export default injection;
