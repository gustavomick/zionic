import * as pubsub from '../_infra/pubsub.service';
import * as cons from '../app.constants';
import { IWeatherService } from './weather.service';
import * as exception from '../_infra/exception.service';
declare var inject;
declare var angul;

describe('weather list directive', () => {

    ///////
    let module = angular.mock.module;
    beforeEach(module('ionic'));
    // disable template caching
    beforeEach(module(function ($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function () { });
        $urlRouterProvider.deferIntercept();
    }));
    ///////

    beforeEach(module('zionic.weather', 'zionic.location', 'zionic.templates'));    // load new module containing templates

    ///////
    let $rootScope, $q: angular.IQService, $c: cons.CONSTANTS, mockedData;
    beforeEach(inject((_$rootScope_, _$q_, $ionicPlatform, _$c_, _mockedData_) => {
        $rootScope = _$rootScope_;
        $c = _$c_;
        mockedData = _mockedData_;
        $q = _$q_;
    }));
    ///////

    let element, scope, dirscope;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.ree = 'refresh-dash';
        element = '<weather-list refresh-when-emit="{{::ree}}"></weather-list>';
        element = $compile(element)(scope);
        scope.$digest();
        dirscope = element.isolateScope();
        
    }));

    /// from svc.spec
    let $httpBackend;
    let weatherService: IWeatherService;
    beforeEach(inject((_weatherService_, _$httpBackend_) => {
        weatherService = _weatherService_;
        $httpBackend = _$httpBackend_;
        spyOn(weatherService['locationService'], 'getCurrentPosition').and.callFake(() => {
            return $q.resolve({ coords: { latitude: -34.5998152, longitude: -58.4345914 }, timestamp: 1476913189581 });
        });
        $httpBackend.when('GET', /https:\/\/api.flickr.com\/services\/rest\//) // ?api_key=a1b56d94e030a41625b4e0ac6722533c&extras=geo&format=json&has_geo=1&lat=-34.5998152&lon=-58.4345914&method=flickr.photos.search&nojsoncallback=1&per_page=5/)
            .respond(mockedData.resFlickr);


    }));
    // end from


    let pubSubService: pubsub.IPubSubService;
    beforeEach(inject((_weatherService_, _pubSubService_) => {
        pubSubService = _pubSubService_;
        weatherService = _weatherService_;
        // spyOn(weatherService, 'getCurrentWithMyLocation').and.callFake(() => {
        //     return $q.resolve({ coords: { latitude: -34.5998152, longitude: -58.4345914 }, timestamp: 1476913189581 });
        // });

    }));


    it('should add weather items', function () {

        $httpBackend.when('GET', /http:\/\/api.openweathermap.org\/data\/2.5\/weather.*/) // appid=64077f1122eceae4d76019103faca3a0&lat=-34.5998152&lon=-58.4345914&units=Imperial
            .respond(mockedData.resWeather);
        expect(dirscope.weathers.length).toBe(0);

        let lastWeather;

        pubSubService.event.emit(scope.ree);
        $rootScope.$apply();
        $httpBackend.flush();
        expect(dirscope.weathers.length).toBe(1, 'must add a weather item');

        pubSubService.event.emit(scope.ree);
        $rootScope.$apply();
        $httpBackend.flush();
        expect(dirscope.weathers.length).toBe(2, 'must add a second weather item');
        let ele = element;

        expect(element[0].querySelectorAll('.list.card').length).toBe(2);
        expect(element[0].querySelectorAll('.list.card')[1].innerText.indexOf('(0) Show Map')).toBeGreaterThan(0, 'index is not reversed');

    });

    it('should show error when http/gps is gone', () => {
        $httpBackend.when('GET', /http:\/\/api.openweathermap.org\/data\/2.5\/weather.*/).respond(400);
 
        pubSubService.event.emit(scope.ree);
        $rootScope.$apply();
        $httpBackend.flush();
        let errele = element[0].querySelectorAll('.errmsg');
        expect(errele.length).toBe(1, 'error message must exist');

        expect(errele[0].innerText.length).toBeGreaterThan(0,'error msg cant be empty');

    });


});
