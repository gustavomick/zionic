import * as pubsub from '../_infra/pubsub.service';

export class WeatherController {
    // static $inject: Array<string> = ['dependency1'];
    dashRefresh;
    constructor(private $scope: angular.IScope, private pubSubService: pubsub.IPubSubService) {
        let vm = this;
        vm.dashRefresh = 'dash-refresh';
    }
    refresh = () => {
        let me = this;
        me.pubSubService.event.emit(me.dashRefresh);
    }
}

angular
    .module('zionic.weather')
    .controller('WeatherController', WeatherController);
