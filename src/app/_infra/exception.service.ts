// jhon papa https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#exception-handling

// en etapa de inicio de provider se agrega evento onerror para cubrir cualquier error no atrapado por
// el $exceptionHandler luego se configura y retorna el exceptionhandler
// http://www.bennadel.com/blog/2855-piping-global-errors-into-the-exceptionhandler-service-in-angularjs.htm

export interface IExceptionService {
    wrapError: (e, meta) => Promise<any>;
}
export class ExceptionService implements IExceptionService {
    constructor(private $q) {
    }
    wrapError = (e: any = { ok: false }, meta) => {
        const me = this;
        if (e == null) {
            e = { meta: meta };
            e.meta.first = e.meta;
            e.meta.inner = null;
        } else if (e.meta) { // ya existe un meta anterior
            let inner = e.meta;
            e.meta = meta;
            e.meta.inner = inner;
            e.meta.first = inner.first;
            // Object.assign(e.meta, meta);
        } else {// if (typeof (e) === 'string') {  // no es un obj es un string
            meta.emsg = e;
            meta.inner = null;
            e = { meta: meta };
            e.meta.first = e.meta;
            // e.meta.first = e;
        }
        return me.$q.reject(e);
    }
}


function WindowOnError($window, $log) {
    'ngInject';
    $window.onerror = (message, fileName, lineNumber, columnNumber, error) => {
        if (!error) {
            error = new Error(message);
            error.fileName = fileName; error.lineNumber = lineNumber; error.columnNumber = (columnNumber || 0);
        }
        $log.error(error);
    };
}


angular
    .module('zionic.infra')
    .run(WindowOnError)
    .service('exceptionService', ExceptionService)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpExceptionInterceptorService');
    });



