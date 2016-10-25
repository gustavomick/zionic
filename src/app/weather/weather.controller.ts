import * as pubsub from '../_infra/pubsub.service';
import * as cons from '../app.constants';

export class WeatherController {
    // static $inject: Array<string> = ['dependency1'];
    weatherRefresh;
    constructor(private $scope: angular.IScope, private pubSubService: pubsub.IPubSubService) {
        let vm = this;
        vm.weatherRefresh = cons.Events.weatherRefresh;
    }
    refresh = () => {
        let me = this;
        me.pubSubService.event.emit(me.weatherRefresh);
    }
    refreshCompleted = ()=>{
        let me=this;
        me.$scope.$broadcast('scroll.refreshComplete')
    }
}

angular
    .module('zionic.weather')
    .controller('WeatherController', WeatherController);
