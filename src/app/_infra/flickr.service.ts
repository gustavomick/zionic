import CONSTANTS from '../app.constants';
export interface IFlickrService {
    search: (latitude: number, longitude: number) => Promise<any>;
    searchOne: (latitude: number, longitude: number) => Promise<any>;
}
export class FlickrService implements IFlickrService {
    // static $inject: Array<string> = ['dependency1'];
    constructor(private $c: CONSTANTS, private $http) {

    }

    getPhotoUrlAndCoord= (item) => {
        // https://www.flickr.com/services/api/misc.urls.html
        let url = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
        return { url, coord: { lat: item.latitude, lon: item.longitude } };
    }

    search = (latitude, longitude): Promise<any> => {
        let me = this;
        //  "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=Your_API_Key&lat=" + latitude + "&lon=" + longitude + "&format=json&jsoncallback=?"                
        let url2 = me.$c.apis.flickr.url;
        // let params2 = { method: 'flickr.photos.getRecent',  api_key: me.$c.apis.flickr.key, format: 'json', nojsoncallback: '1', per_page: 50 }
        let params2 = { method: 'flickr.photos.search', extras: 'geo', lat: latitude, lon: longitude, api_key: me.$c.apis.flickr.key, format: 'json', nojsoncallback: '1', per_page: 50, has_geo: 1 };
        return me.$http({ url: url2, method: 'GET', params: params2 }, { cache: false });
    }
    searchOne = (latitud, longitude) => {
        const me = this;
        return me.search(latitud, longitude)
            .then((res) => {
                let photos = res.data.photos;
                if (photos && photos.photo && photos.photo.length > 0) {
                    let ps = photos.photo;
                    let item: any = ps[Math.floor(Math.random() * ps.length)];
                    return me.getPhotoUrlAndCoord(item);
                }
            });
    }
}

angular
    .module('zionic.infra')
    .service('flickrService', FlickrService);
