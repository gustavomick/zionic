import { ILocationService } from './location.service';
// import { Geolocation } from 'ionic-native';
declare var inject;
declare var angul;


describe('location service', () => {

    ///////
    let module = angular.mock.module;
    beforeEach(module('ionic'));
    // disable template caching
    beforeEach(module(function ($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function () { });
        $urlRouterProvider.deferIntercept();
    }));
    ///////

    // module.sharedInjector();
    beforeEach(module('zionic.location'));
    beforeEach(module('ngCordovaMocks'));
    ///////
    let $rootScope, $q: angular.IQService;
    beforeEach(inject((_$rootScope_, _$q_, $ionicPlatform) => {
        $rootScope = _$rootScope_;
        $q = _$q_;
        // ionic.service('$ionicPlatform', ($provide) => {
        //     $ionicPlatform.ready = () => $q.resolve;
        // });
    }));
    ///////

    let locationService: ILocationService;
    let $cordovaGeolocation;
    let $timeout;
    beforeEach(inject((_$cordovaGeolocation_, ) => {
        $cordovaGeolocation = _$cordovaGeolocation_;
    }));
    beforeEach(inject((_locationService_, _$timeout_) => {
        locationService = _locationService_;
        $timeout = _$timeout_;
    }));

    // spyOn($cordovaGeolocation, 'getCurrentPosition').and.callFake((opts) => {
    //     debugger;
    //     const position = { coords: { latitude: 12.3, longitude: -32.1 } };
    //     // return $q.resolve(position);
    // });


    it('getCurrentPosition should have result and 2 items', () => {
        let lastPosition;

        let mpos = { coords: { longitude: 1, latitude: 1 }, timestamp: Date() };
        $cordovaGeolocation.currentPosition = mpos;
        $cordovaGeolocation.useHostAbilities = false;

        expect(locationService.locations.length).toEqual(0);

        let st = 0;
        locationService.getCurrentPosition()
            .then((res) => {
                lastPosition = locationService.lastPosition;
                st = 1;
            })
            .catch((res) => {
                st = 2;
            });
        $rootScope.$apply(); // $rootScope.$digest();

        expect(st).toBe(1, 'promise status ok');
        expect(locationService.locations.length).toBe(1);
        expect(lastPosition).not.toBeNull();
        expect(lastPosition).toBe(mpos);

        // add 2nd item
        locationService.getCurrentPosition();
        $rootScope.$apply(); 
        expect(locationService.locations.length).toBe(2);

    });

    it('getCurrentPosition should enhance gps failure', () => {
        let mpos = { coords: { longitude: 1, latitude: 1 }, timestamp: Date() };
        $cordovaGeolocation.currentPosition = mpos;
        $cordovaGeolocation.useHostAbilities = false;
        $cordovaGeolocation.throwsError = true;
        let catchResult;
        locationService.getCurrentPosition().catch((data) => { catchResult = data; });
        $rootScope.$apply();
        expect(catchResult).not.toBeNull();
        expect(catchResult.meta).not.toBeNull();
    });

});
