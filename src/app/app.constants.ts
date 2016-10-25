angular.module('zionic.constants',[]).constant<CONSTANTS>('$c', {
    apis: {
        cloudant: {
            key: 'andespideatioughtfughtni',
            pass: '00293f2eb304bc825f3e6a9ea7ff53ab810d1aff'
        },
        openweathermap: {
            url: 'http://api.openweathermap.org/data/2.5/weather',
            key: '64077f1122eceae4d76019103faca3a0'
        },
        flickr: {
            url: 'https://api.flickr.com/services/rest/',
            key: 'a1b56d94e030a41625b4e0ac6722533c'
        }
    }

});
export enum ErrorOrigin {
    HTTP,LOCATION, WEATHER, MENU, MAP
}


export enum TypeActions {
    DELETE_TODO, INSERT_TODO, UPDATE_TODO,
}


export class Events {
    static weatherRefresh = "weatherRefresh" 
    static weatherClean = "weatherClean" 
}

export interface IPouchDb { // minimal dummy interface to avoid ambiguity with dataaccess db
    find: any;
    create: any;
    allDocs: any;
    getIndexes;
    deleteIndex;
    createIndex;
    bulkDocs;
    put;
    query;
    post;
    get;
    remove;
}
export interface CONSTANTS { apis: IAPIS; }
interface IAPIS {
    cloudant: IKEY & IPASS;
    openweathermap: IKEY & IURL;
    flickr: IKEY & IURL;
}
interface IPASS { pass: string; }
interface IKEY { key: string; }
interface IURL { url: string; }
export default CONSTANTS;


