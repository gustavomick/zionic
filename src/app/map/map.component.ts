import * as pubsub from '../_infra/pubsub.service';
import { Component } from '../_infra/decorators';
import * as ws from '../weather/weather.service';
declare var L;
@Component({
    bindings: {
        resizeWhenEmit: '@'
    },
    //     // ng-if="mapa"
    template: '<leaflet  width="2000px" height="500px" defaults="defaults" lf-center="center"  markers="markers"></leaflet>' // ,
    // require: {
    //     mapCtrl: '^ctrl'
    // }
    // templateUrl: './templates/weather-map.html'
})
export class MapComponent {

    defaults;
    vm;
    map;
    meta;
    resizeWhenEmit;
    center: any = {};
    markers = {};
    constructor(private $q: ng.IQService, private $scope, private weatherService: ws.IWeatherService, private leafletData, private pubSubService: pubsub.IPubSubService) {
        "ngInject";
        let me = this;
        let vm = me.vm = $scope;


        let mapa = {
            defaults: {
                tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                // maxZoom: 18,
                autoDiscover: true
                // zoomControlPosition: 'bottomleft'
            },
            center: { zoom: 18 },
            markers: {},
            events: {
                map: {
                    enable: ['context'],
                    logic: 'emit'
                }
            }
        };

        angular.extend($scope, mapa);

        //   $scope.$on("$stateChangeSuccess", ()=> {

        //     $scope.locations = []; //LocationsService.savedLocations;
        //     // $scope.newLocation;

        //     // if(!InstructionsService.instructions.newLocations.seen) {

        //     //   var instructionsPopup = $ionicPopup.alert({
        //     //     title: 'Add Locations',
        //     //     template: InstructionsService.instructions.newLocations.text
        //     //   });
        //     //   instructionsPopup.then(function(res) {
        //     //     InstructionsService.instructions.newLocations.seen = true;
        //     //     });

        //     // }


        //     me.setLocation();
        //     // $scope.goTo(0);

        //   });

        // leafletData.getMap().then((map) => {
        //     // L.GeoIP.centerMapOnPosition(map, 15);
        //     // debugger
        //     me.map = map;
        //     // this.fixResize();
        //     me.setLocation();

        // });

        // // me.PubSubService.event.on(vm, me.resizeWhenEmit, me.fixResize);

        // // example of wath detecting changes from service.
        // $scope.$watch(() => { return WeatherService.lastSelectedId; }, (oldValue, newValue) => {
        //     me.setLocation();
        // });


    }
    // fixResize = () => {
    //     var me = this;
    //     if (me.map) {
    //         setTimeout(() => {
    //             me.map.invalidateSize.bind(me.map, false);
    //         }, (2000));
    //     }
    // }
    // setLocation = () => {
    //     let me = this;
    //     let weather = me.WeatherService.weathersCurrentLocation[me.WeatherService.lastSelectedId];
    //     if (weather && weather.photo && weather.photo.coord) {
    //         let lat = weather.photo.coord.lat;
    //         let lng = weather.photo.coord.lon;
    //         me.center = {
    //             lat: lat,
    //             lng: lng,
    //             zoom: 18
    //         };

    //     } else {
    //         // me.vm.center.lat = 51.505
    //         // me.vm.center.lng = -0.09
    //         me.center = {
    //             lat: 51.505,
    //             lng: -0.09,
    //             zoom: 18
    //         };
    //     }

    //     // http://leafletjs.com/reference.html#map-panto
    //     if (me.map) {
    //         me.map.setView(me.center);
    //         let id = me.WeatherService.lastSelectedId;
    //         me.vm.markers['M' + id] = {
    //             lat: me.center.lat,
    //             lng: me.center.lng,
    //             message: "testing",
    //             focus: true,
    //             draggable: false
    //             //   type:'Point'
    //         };

    //     }


    // }


    $onInit = function () { };
    $onChanges = function (changesObj) { };
    $onDestory = function () { };
}



angular
    .module('zionic.map')
    .component('Map', MapComponent);
