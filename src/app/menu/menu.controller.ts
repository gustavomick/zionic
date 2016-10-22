import * as pubsub from '../_infra/pubsub.service';
export class MenuController {
  // static $inject: Array<string> = ['dependency1'];
  constructor(private pubSubService: pubsub.IPubSubService, private $scope, $ionicModal, private $timeout, private weatherService) { // , $ngRedux) {
    let me = this;
  }
  modal;
  refreshDash= () => {
    this.pubSubService.event.emit('refresh-dash');
  }


}

angular
  .module('zionic.menu')
  .controller('MenuController', MenuController);
