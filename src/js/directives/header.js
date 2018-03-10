/**
 * Created by kit91ka on 20.12.2017.
 */
let injection = ['testHeader', ['SuccessService', 'ConfirmService', Header]];
// angular.module('test').controller(injection);

function Header(SuccessService, ConfirmService) {
  "use strict";
  return {
    restrict: 'AEC',
    scope: {
      messages : '='
    },
    templateUrl: '/templates/directives/header.html',
    link: function ($scope) {
      window.dirscope = $scope;
      $scope.delete = () => {
        ConfirmService.confirm({message : "Are you shure?"}).then(()=>{
          $scope.messages = [];
        }, ()=>{console.log('ok, don\'t delete messages')});
      };
      $scope.export = () => {
        SuccessService.setSuccess({message : "Export complete"})
      };
    }
  };
}

export default injection;