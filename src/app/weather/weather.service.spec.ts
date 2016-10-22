import * as cons from '../app.constants';
import { IWeatherService } from './weather.service';
declare var inject;
declare var angul;


describe('weather service', () => {

    ///////
    let module = angular.mock.module;
    beforeEach(module('ionic'));
    // disable template caching
    beforeEach(module(function ($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function () { });
        $urlRouterProvider.deferIntercept();
    }));
    ///////

    beforeEach(module('zionic.weather'));

    ///////
    let $rootScope, $q: angular.IQService, $c: cons.CONSTANTS, mockedData;
    beforeEach(inject((_$rootScope_, _$q_, $ionicPlatform, _$c_, _mockedData_) => {
        $rootScope = _$rootScope_;
        $c = _$c_;
        mockedData = _mockedData_;
        $q = _$q_;
    }));
    ///////

    let $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', /https:\/\/api.flickr.com\/services\/rest\//) // ?api_key=a1b56d94e030a41625b4e0ac6722533c&extras=geo&format=json&has_geo=1&lat=-34.5998152&lon=-58.4345914&method=flickr.photos.search&nojsoncallback=1&per_page=5/)
            .respond(mockedData.resFlickr);
    }));

    let weatherService: IWeatherService;
    beforeEach(inject((_weatherService_) => {
        weatherService = _weatherService_;
        spyOn(weatherService['locationService'], 'getCurrentPosition').and.callFake(() => {
            return $q.resolve({ coords: { latitude: -34.5998152, longitude: -58.4345914 }, timestamp: 1476913189581 });
        });

    }));

    it('getCurrentWithMyLocation should get lastweather and photo', () => {

        $httpBackend.when('GET', /http:\/\/api.openweathermap.org\/data\/2.5\/weather.*/) // appid=64077f1122eceae4d76019103faca3a0&lat=-34.5998152&lon=-58.4345914&units=Imperial
            .respond(mockedData.resWeather);

        let lastWeather;
        weatherService.getCurrentWithMyLocation().then((res) => {
            lastWeather = res;
        });
        $rootScope.$apply();
        $httpBackend.flush();
        expect(lastWeather).not.toBeNull();
        expect(lastWeather.dt).not.toBeNull();
        expect(lastWeather.photo.url).not.toBeNull('photo con url');
    });


    it('call http weather service error', () => {
        $httpBackend.when('GET', /http:\/\/api.openweathermap.org\/data\/2.5\/weather.*/).respond(400);

        let lastWeather;
        let st = 0;
        let err;
        weatherService.getCurrentWithMyLocation().then((res) => {
            lastWeather = res;
            st = 1;
        }).catch((res) => {
            st = 2;
            err = res;
        });
        $rootScope.$apply();
        $httpBackend.flush();

        expect(st).toBe(2, 'http error doesnt q.reject');
        expect(err.meta.first).not.toBeNull(' http interceptor must add meta info ');
        expect(err.meta.first.ori).toBe(cons.ErrorOrigin.HTTP, 'meta.first.ori must be HTTP enum type');
    });


});
