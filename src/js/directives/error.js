
let injection = ['errorDialog', ['ErrorsService', errorDialog]];
// angular.module('test').controller(injection);

function errorDialog(ErrorsService) {
  "use strict";
  let linker = function (scope, element, attrs) {
    let sModal = $($('.modal-dialog', element)).arcticmodal({
                                                           beforeClose: function () {
                                                             ErrorsService.closeError(scope.id);
                                                           },
                                                         });
    
    scope.close = function () {
      console.log('close', scope.id);
      sModal.arcticmodal('close');
    };
  
    $(document).keyup(function close(event) {
      if ([13, 27].indexOf(event.charCode) !== -1) {
        scope.close();
        $(document).off('keyup', close);
      }
    });
  };
  
  return {
    restrict: "E",
    replace: true,
    link: linker,
    templateUrl: '/templates/directives/error.html',
    scope: {
      instance: '=',
      id: '='
    }
  };
}

export default injection;
