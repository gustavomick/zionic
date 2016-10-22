import * as pubsub from '../_infra/pubsub.service';
import * as loc from '../location/location.service';
export class MapController {
    // static $inject: Array<string> = ['dependency1'];
    // resizeMap = "resize-map";
    // location;
    locations;
    map;
    constructor($scope, $stateParams, $ionicModal, $ionicPopup, private locationService: loc.ILocationService, private pubSubService: pubsub.IPubSubService) {
        "ngInject";
        const me = this;
        $scope.$on('$stateChangeSuccess', () => {

            me.locations = locationService.locations;
            // $scope.newLocation;

            // if (!InstructionsService.instructions.newLocations.seen) {

            //     var instructionsPopup = $ionicPopup.alert({
            //         title: 'Add Locations',
            //         template: InstructionsService.instructions.newLocations.text
            //     });
            //     instructionsPopup.then(function (res) {
            //         InstructionsService.instructions.newLocations.seen = true;
            //     });

            // }

            me.map = {
                defaults: {
                    tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                    maxZoom: 18,
                    zoomControlPosition: 'bottomleft'
                },
                markers: {},
                events: {
                    map: {
                        enable: ['context'],
                        logic: 'emit'
                    }
                }
            };

            // me.goTo(0);

        });

        // let Location :loc.ILocation = function () {
        //     if (!(this instanceof Location)) return new Location();
        //     this.lat = "";
        //     this.lng = "";
        //     this.name = "";
        // };

        // $ionicModal.fromTemplateUrl('templates/addLocation.html', {
        //     scope: $scope,
        //     animation: 'slide-in-up'
        // }).then(function (modal) {
        //     $scope.modal = modal;
        // });

        // $scope.$on('leafletDirectiveMap.contextmenu', function (event, locationEvent) {
        //     $scope.newLocation = new Location();
        //     $scope.newLocation.lat = locationEvent.leafletEvent.latlng.lat;
        //     $scope.newLocation.lng = locationEvent.leafletEvent.latlng.lng;
        //     $scope.modal.show();
        // });

        // $scope.saveLocation = function () {
        //     LocationsService.locations.push($scope.newLocation);
        //     $scope.modal.hide();
        //     $scope.goTo(LocationsService.locations.length - 1);
        // };




    };


    // leafletData.getMap().then((map) =>{
    //     // L.GeoIP.centerMapOnPosition(map, 15);
    //     me.map = map;
    //     this.fixResize();
    // });

    // $scope.$on("$ionicView.enter",(event, data) => {

    //     PubSubService.event.emit(this.resizeMap);
    //     // $scope.selectedItemId = data.stateParams.selectedItemid;

    // });

    goTo = (locationKey) => {
        const me = this;
        let location = me.locations[locationKey];

        me.map.center = {
            lat: location.lat,
            lng: location.lng,
            zoom: 12
        };

        me.map.markers[locationKey] = {
            lat: location.lat,
            lng: location.lng,
            message: location.name,
            focus: true,
            draggable: false
        };

    };

    locate = () => {
        const me = this;

        me.locationService.getCurrentPosition()
            .then((position) => {
                me.map.center.lat = position.coords.latitude;
                me.map.center.lng = position.coords.longitude;
                me.map.center.zoom = 15;

                me.map.markers.now = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    message: 'You Are Here',
                    focus: true,
                    draggable: false
                };

            });
    };
}
angular
    .module('zionic.map')
    .controller('MapController', MapController);

