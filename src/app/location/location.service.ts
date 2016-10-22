import * as exception from '../_infra/exception.service';
// import { Geolocation, Coordinates } from 'ionic-native';
import * as cons from '../app.constants';
export interface ILocation {
    lat;
    lng;
    name;
}
export interface ILocationService {
    locations: Array<any>;
    getCurrentPosition: () => ng.IPromise<any>;
    lastPosition;
    //  getCurrentPosition(options?: Coordinates.GeolocationOptions): Promise<Geoposition>;
}
export class LocationService implements ILocationService {
    positionOptions;
    lastPosition;
    locations = [];
    geopts: any = { maximumAge: 5000, timeout: 5000 };
    constructor(private $ionicPlatform, private $q: ng.IQService,  private exceptionService: exception.IExceptionService, private $cordovaGeolocation) {
        const me = this;
        me.positionOptions = { timeout: 10000, enableHighAccuracy: true };
        me.init();

    }
    init= () => {
        let me = this;
        this.wrapLibGet(me.geopts);
    }
    wrapLibGet = (opts) => { // allows to chge bet ngc and ionic-nat
        const me = this;
         return me.$cordovaGeolocation.getCurrentPosition(opts).then((res)=>{ return res; });
        // return me.$q.resolve( { coords: { latitude: 12.3, longitude: -32.1 } })
        // { coords:{latitude:-34.5998152,longitude:-58.4345914}, timestamp : 1476913189581 }
        // return me.$ionicPlatform.ready().then( () => { return me.$cordovaGeolocation.getCurrentPosition(opts) });
        // return me.$ionicPlatform.ready().then( () => Geolocation.getCurrentPosition(opts) );
    }
    getCurrentPosition = () : ng.IPromise<any> => {
        let me = this;
        return <any> me.wrapLibGet(me.geopts)
            .then((data) => {
                me.lastPosition = data;
                me.locations.push(data);
                return data;
            }).catch(me.parseError);
    }
    parseError = (e) => {
        let me = this;
        let msg = '';
        // if (e.constructor.name === 'PositionError') {
            if (e.code === 2) {
                // e = PositionError {code: 2, message: "application does not have sufficient geolocation permissions."}
                msg = 'Please check GPS permissions.';
            } else {
                msg = 'Please enable GPS and restart.';
            }
        // }
        let meta = {ori: cons.ErrorOrigin.LOCATION , msg : msg };
        return me.exceptionService.wrapError(e, meta);

    }
}

angular
    .module('zionic.location')
    .service('locationService', LocationService);
