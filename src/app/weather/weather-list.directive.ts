import * as pubsub from '../_infra/pubsub.service';
import * as ws from './weather.service';
class WeatherListDirective implements ng.IDirective {
    restrict = 'E';
    // scope :{
    //     refreshWhenEmit :'@'
    // }
    // controllerAs = "wlCtrl";
    // bindToController =  true;
    templateUrl = './templates/weather-list.html';
    constructor(private $interval: ng.IIntervalService, private weatherService: ws.IWeatherService, private $q: ng.IQService, private pubSubService: pubsub.IPubSubService, private $state) { }
    static instance = ($interval, weatherService, $q, pubSubService, $state): any => {
        "ngInject";
        return new WeatherListDirective($interval, weatherService, $q, pubSubService, $state);
    }
    vm;
    controller = ($scope, weatherService: ws.IWeatherService) => {
        "ngInject";
        let vm = $scope;
        let me = this;
        vm.weatherService = weatherService; // to avoid using of extra watchers
        vm.weathers = vm.weatherService.weathersCurrentLocation;
        vm.goSelectedId = me.goSelectedId;
    }

    link = (scope, elem, attrs, ctrl) => {
        let me = this;
        let vm = this.vm = scope;
        // example of recieving events with adaptable name event
        // emited from menu.controller.ts
        // not usually needed it, because it can be handled and ref directly throw service inj
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
        let vm = me.vm;
        return me.weatherService.getCurrentWithMyLocation().then((lastWeather) => {
           // not really needed because im using direct svc ref also save future refacts and sahred watchs
           // refs https://www.bennadel.com/blog/2744-exposing-a-service-directly-on-the-scope-in-angularjs.htm 
           // only as an example 
           if (lastWeather) {
                vm.lastUpdated = lastWeather.dt;
           }
        });
    }

}

angular
    .module('zionic.weather')
    .directive('weatherList', WeatherListDirective.instance);
