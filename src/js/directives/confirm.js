
let injection = ['confirmDialog', ['ConfirmService', confirmDialog]];
// angular.module('test').controller(injection);

function confirmDialog(ConfirmService) {
  "use strict";
  let linker = function (scope, element, attrs) {
    let sModal = $($('.modal-dialog', element)).arcticmodal({
                                                           beforeClose: function () {
                                                             scope.isApproved ? ConfirmService.approve(scope.id) : ConfirmService.reject(scope.id);
                                                           },
                                                         });
    
    scope.approve = function () {
      console.log(scope.instance);
      if (scope.instance.scope
        && scope.instance.scope.validate instanceof Function
        && !scope.instance.scope.validate(scope.instance.scope)
      ) {
        return;
      }
  
      if (scope.instance.mustConfirm && !scope.instance.confirmed) {
        scope.confirmed_error = true;
        return;
      } else {
        scope.confirmed_error = false;
      }
      
      scope.isApproved = true;
      sModal.arcticmodal('close');
    };
    scope.reject = function () {
      console.log('reject', scope.id);
      scope.isApproved = false;
      sModal.arcticmodal('close');
    }
  };
  
  return {
    restrict: "E",
    replace: true,
    link: linker,
    templateUrl: '/templates/directives/confirm.html',
    scope: {
      instance: '=',
      id: '='
    }
  };
}

export default injection;
