import * as exception from '../_infra/exception.service';
import * as cons from '../app.constants';
import * as pubsub from '../_infra/pubsub.service';
import * as flickr from '../_infra/flickr.service';
import * as loc from '../location/location.service';
import CONSTANTS from '../app.constants';
export interface IWeatherService {
    weathersCurrentLocation: Array<any>;
    getCurrentWithMyLocation(): ng.IPromise<any>;
    lastSelectedId;
}
export default class WeatherService implements IWeatherService {
    // static $inject: Array<string> = ['$http', 'GeoService', '$c'];
    weathersCurrentLocation = [];
    constructor(private $http, private locationService: loc.ILocationService, private $c: CONSTANTS, private pubSubService: pubsub.IPubSubService, private $q: angular.IQService, private flickrService: flickr.IFlickrService,  private exceptionService: exception.IExceptionService) {
        // example of service receving event, currently recieving at directive
        // this.PubSubService.event.on(null, 'refresh-weather', this.getCurrentWithMyLocation)
    }
    clean = () => {
        // called from menu as an example of direct call from external contrller and automatic refreshing of weather directive 
        this.weathersCurrentLocation = [];
    }
    isUpdated = true;
    errorMessage = '';
    lastSelectedId;
    getWeather = (latitude, longitude): Promise<any> => {
        // let queryString = me.$c.apis.openweathermap.url + '?lat=' + latitude + '&lon=' + longitude + '&appid=' + me.$c.apis.openweathermap + '&units=imperial';        
        let me = this;
        let url = me.$c.apis.openweathermap.url;
        let params = { lat: latitude, lon: longitude, appid: me.$c.apis.openweathermap.key, units: 'Imperial' };
        return me.$http({ url: url, method: 'GET', params: params }, { cache: false });
    }
    getCurrentWithMyLocation = (): ng.IPromise<any> => {
        let me = this;
        return this.locationService.getCurrentPosition()
            .then((data) => {
                // get data 

                let latitude = data.coords.latitude;
                let longitude = data.coords.longitude;
                let proms = [];
                proms.push(me.getWeather(latitude, longitude));
                proms.push(me.flickrService.searchOne(latitude, longitude));
                return me.$q.all(proms); // example of handling concurrent i/o calls

            }).then((res: any) => {
                // parse result
                let weath = res[0].data;
                let photo = res[1];
                if (photo) { weath.photo = photo; }
                weath.dt = new Date();
                // me.weathersCurrentLocation.unshift(weath);
                me.weathersCurrentLocation.push(weath);
                me.isUpdated = true;
                me.errorMessage = '';
                return weath;
            }).catch(me.parseError);
    };
    parseError = (e) => {
        let me = this;
        me.isUpdated = false;
        let meta = { ori: cons.ErrorOrigin.WEATHER, msg: 'Info delayed, please retry later.' };
        return me.exceptionService.wrapError(e, meta);
    };
}

angular
    .module('zionic.weather')
    .service('weatherService', WeatherService);
