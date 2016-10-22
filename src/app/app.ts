import './app.constants';
import './_infra';
import './app.config';
import './app.router';

angular.module('zionic.core', ['zionic.infra', 'zionic.constants', 'zionic.config', 'zionic.router' ]);


import './location';
import './weather';
import './map';
import './menu';

angular.module('zionic', [
    'ionic', 'nemLogging', 'ui-leaflet',
    'zionic.core', 'zionic.menu', 'zionic.location', 'zionic.weather', 'zionic.map'
])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

