
// import {setNextGameState} from './_redux/actions'
angular.module('zionic.router',['zionic.constants']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'MenuController',
            controllerAs: 'menuCtrl',
            resolve: {
                // pepe : function($ngRedux){ console.log('helou')}
                // 'reduxStart': function ($ngRedux){ 
                //     debugger
                //     const actions : any= {};
                //     $ngRedux.connect(null,setNextGameState)(actions);
                //     return actions.bootstrap();
                // }

            }
        })
        .state('app.weather', {
            url: '/weather',
            views: {
                'menuContent': {
                    templateUrl: 'templates/weather.html',
                    controller: 'WeatherController',
                    controllerAs: 'weatherCtrl'
                }
            }
        })
        .state('app.map', {
            url: '/map',
            params: {id: {value: null}},
            cache: true,
            views: {
                'menuContent': {
                    // template: '<weather-map></weather-map>'//,
                    templateUrl: 'templates/map.html',
                    controller: 'MapController',
                    controllerAs: 'mapCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/weather');

})
.run(['$rootScope', '$log', function ($rootScope, $log) {
        // let $log = $log.getInstance('RouterShared');
        // Credits: Adam's answer in http://stackoverflow.com/a/20786262/69362

        // $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        //     let previousState: any = {};
        //     previousState.fromState = '/';
        //     previousState.fromParams = '';

        //     if (fromState.name != '') {
        //         previousState.fromState = fromState.name;
        //         previousState.fromParams = fromParams;
        //         // event.preventDefault();
        //     }
        //     $rootScope.previousState = previousState;

        //     $log.debug('$stateChangeStart to ' + toState.to + '///- fired when the transition begins. toState,toParams : \n', toState, toParams);
        // });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            let args = { toState: toState, toParams: toParams, fromState: fromState, fromParams: fromParams };
            let state = JSON.stringify(args);
            let msg = ' - Error occurs during transition: $stateChangeError - ' + state + '.';
            error.message = error.message + msg;
            $log.error(error);
        });

        // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        //     $log.debug('$stateChangeSuccess to ' + toState.name + '///- fired once the state transition is complete.');
        // });

        // $rootScope.$on('$viewContentLoaded', function (event) {
        //     $log.debug('$viewContentLoaded - fired after dom rendered', event);
        // });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            let args = { unfoundState: unfoundState, fromState: fromState, fromParams: fromParams };
            let state = JSON.stringify(args);
            let msg = ' - Error occurs, state cannot be found by its name: $stateChangeError - ' + state + '.';
            $log.error(msg);
        });
    }]);
