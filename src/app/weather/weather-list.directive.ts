import * as pubsub from '../_infra/pubsub.service';
import * as ws from './weather.service';
class WeatherListDirective implements ng.IDirective {
    restrict = 'E';
    scope = {
        refreshWhenEmit :'@',
        refreshCompleted :'&'
    }
    // controllerAs = "wlCtrl";
    // bindToController =  true;
    templateUrl = './templates/weather-list.html';
    constructor(private $interval: ng.IIntervalService, private weatherService: ws.IWeatherService, private $q: ng.IQService, private pubSubService: pubsub.IPubSubService, private $state) { }
    static instance = ($interval, weatherService, $q, pubSubService, $state): any => {
        'ngInject';
        return new WeatherListDirective($interval, weatherService, $q, pubSubService, $state);
    }
    vm;
    afterRefresh; isupdated ;errorMessage; lastUpdated; err;
    controller = ($scope, weatherService: ws.IWeatherService) => {
        'ngInject';
        let me = this;
        let vm = $scope; 
        vm.weatherService = weatherService; // added for repeater to avoid using of extra watchers - if there are many specif internal that is used like a lot  could be better be "watched" to save name refactorings (if that matters)
        $scope.$watchCollection( ()=> me.weatherService.weathersCurrentLocation, ()=>{ vm.weathers =  me.weatherService.weathersCurrentLocation }); // example of watched item service
        vm.refresh = me.refresh;
        vm.goSelectedId = me.goSelectedId;
    }

    link = (scope, elem, attrs, ctrl) => {
        let me = this;
        let vm = this.vm = scope;
        // example of recieving events with adaptable name event
        // emited from menu.controller.ts
        me.pubSubService.event.on(vm, attrs.refreshWhenEmit, me.refresh);
        vm.isupdated = true;
        vm.errorMessage = '';
    }
    goSelectedId= (ix) => {
        let me = this;
        me.weatherService.lastSelectedId = ix;
        me.$state.go('app.map');

    }
    refresh = (): Promise<any> => {
        let me = this;
        let vm = me.vm; // = me.vm;
        return me.weatherService.getCurrentWithMyLocation().then((lastWeather) => {
           // not really needed because im using direct svc ref also save future refacts and sahred watchs
           // refs https://www.bennadel.com/blog/2744-exposing-a-service-directly-on-the-scope-in-angularjs.htm 
           // only as an example 
           if (lastWeather) {
                vm.lastUpdated = lastWeather.dt;
           }
           vm.err = null;
        }).catch((res) => {
            vm.err = res;
        }).finally(()=>{
            vm.refreshCompleted()
        });
    }

}

angular
    .module('zionic.weather')
    .directive('weatherList', WeatherListDirective.instance);
