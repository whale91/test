/**
 * Created by kit91ka 20.12.2017
 */
let injection = ['Chat', ['$scope', '$timeout', Chat]];
function Chat($scope, $timeout) {
  "use strict";
  $scope.messages = [];
  $scope.inputMessage = "";
  $scope.blockSending = true;
  $scope.delete = (index) => $scope.messages.splice(index, 1);

  let messageObj = (message, id = 1, name = 'You') => {
    return {
      message,
      id,
      name,
      date:new Date()
    }
  };

  let sendMessage = (input, id, name) => $scope.messages.push(messageObj(input, id, name));

  $scope.revert = () => {

    if ($scope.inputMessage && $scope.inputMessage.length && $scope.inputMessage.length > 1 && !scope.blockSending) {
      let message = $scope.inputMessage;
      $scope.inputMessage = "";
      sendMessage(message);
      $timeout(()=> {
        let reverseStr = message.split("").reverse().join("");
        sendMessage(reverseStr, 2, 'Reverse bot');
      },1000);

    } else {
      console.log('error');
    }
  };

  /// Explanatory words of the bot
  $timeout(()=>{
    sendMessage('Hi! I\'m reverse word bot', 2, 'Reverse bot');
  }, 1000);
  $timeout(()=>{
    sendMessage('Please, send me some text and i reverse it!', 2, 'Reverse bot');
  }, 3000);
  $timeout(()=>{
    sendMessage('Like hi!=> !ih. Now you can write to me', 2, 'Reverse bot');
    $scope.blockSending = false;
  }, 5000);

  window.scope = $scope;
  console.log('chat');
  // ErrorsService.setError({title:"asd"});
}

export default injection;