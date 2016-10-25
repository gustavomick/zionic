import * as pubsub from '../_infra/pubsub.service';
import * as cons from '../app.constants';

export class MenuController {
  // static $inject: Array<string> = ['dependency1'];
  constructor(private pubSubService: pubsub.IPubSubService, private $scope, $ionicModal, private $timeout, private weatherService) { // , $ngRedux) {
    let me = this;
  }
  modal;
  refreshDash= () => {
    this.pubSubService.event.emit(cons.Events.weatherRefresh);
  }


}

angular
  .module('zionic.menu')
  .controller('MenuController', MenuController);
