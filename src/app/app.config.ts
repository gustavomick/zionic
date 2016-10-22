angular.module('zionic.config', ['zionic.constants']).config(($logProvider, $ionicConfigProvider) => {
    // $logProvider.debugEnabled(true);
    $ionicConfigProvider.views.forwardCache(true);
});
