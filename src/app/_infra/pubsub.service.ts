export interface IEvent {
    on(scope: any, name: string, listener: (event: angular.IAngularEvent, ...args: any[]) => any): () => void; // Returns a deregistration function for this listener. 
    emit(name: string, ...args: any[]): angular.IAngularEvent;
}
export interface IPubSubService {
    event: IEvent;
    // error:IExceptionService;
}
// wraps angular event handling to monitor and assure correct implementation and avoid memory leaks
// algo enables futhers customizations (history control, prefixes, perf improvemnts, etc)
class EventHandler implements IEvent {
    $rootScope: any;
    constructor($rootScope) {
        this.$rootScope = $rootScope;
    }
    on = (scope: any, name: string, listener: (event: angular.IAngularEvent, ...args: any[]) => any): (() => void) => {
        let handler = this.$rootScope.$on(name, listener);
        if (scope) scope.$on('$destroy', handler); // scope can only be null if is subscribed from a service or other singleton, avoid memory leaks!!
        return handler;
    }
    emit = (eventName, args) => {
        return this.$rootScope.$emit(eventName, args);
    }

};
class PubSubService implements IPubSubService {
    event: IEvent;
    static $inject: Array<string> = ['$rootScope', '$log'];
    constructor($rootScope, private $log) {
        this.event = new EventHandler($rootScope);
    }
}
angular
    .module('zionic.infra')
    .service('pubSubService', PubSubService);
