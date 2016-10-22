import * as cons from '../app.constants';
import * as exception from '../_infra/exception.service';

export class HttpExceptionInterceptorService {
    constructor(private $log, private $q, private exceptionService: exception.IExceptionService, private $c: cons.  CONSTANTS) { }

    // response = (response)=> { return (<any>this.authService)._response(response)  }
    // request = (config) =>{ return (<any>this.authService)._request(config)  }
    responseError = (httpres) => {
        const me = this;
        let http = me.parseHttp(httpres);
        let msg = '';
        let data = httpres.data;
        if (data) {
            if (data.message) msg = data.message;
        } else {
            msg = 'server unreachable - client status code 0';
        }
        let meta = { ori: cons.ErrorOrigin.HTTP, msg: msg , http: http };
        return me.exceptionService.wrapError(null, meta);

    }
    parseHttp = (response: any) => { // fat arrow to fix this bind
        let data: any = {};
        data.status = response.status;
        data.statusText = response.statusText;
        data.method = response.config.method;
        data.url = response.config.url;
        data.data = response.config.data;
        data.headers = response.config.headers;
        data.msg = data.method + ' ' + data.url + ' ' + data.status + ' (' + data.statusText + ')';
        return data;
    }
}

angular
    .module('zionic.infra')
    .service('httpExceptionInterceptorService', HttpExceptionInterceptorService);