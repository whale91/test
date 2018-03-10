
let injection = ['successDialog', ['SuccessService', successDialog]];
// angular.module('test').controller(injection);

function successDialog(SuccessService) {
  "use strict";
  let linker = function (scope, element, attrs) {
    let sModal = $($('.modal-dialog', element)).arcticmodal({
                                                           beforeClose: function () {
                                                             SuccessService.closeSuccess(scope.id);
                                                           },
                                                         });
    
    scope.close = function () {
      console.log('close', scope.id);
      sModal.arcticmodal('close');
    };
  
    $(document).keyup(function close(event) {
      if ([13, 27].indexOf(event.keyCode) !== -1) {
        scope.close();
        $(document).off('keyup', close);
      }
    });
  };
  
  return {
    restrict: "E",
    replace: true,
    link: linker,
    templateUrl: '/templates/directives/success.html',
    scope: {
      instance: '=',
      id: '='
    }
  };
}

export default injection;
