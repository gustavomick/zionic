var path = require('path')

module.exports = function (config) {
// var webpackConfig = require('./webpack.config.js')
// console.log(webpackConfig.module.loaders)
  // Karma configuration
configuration = {

  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '',


  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['jasmine'],


  // list of files / patterns to load in the browser
  files: [
    './www/lib/angular/angular.js',
    './www/lib/angular-animate/angular-animate.js',
    './www/lib/angular-sanitize/angular-sanitize.js',
    './node_modules/angular-mocks/angular-mocks.js',
    // './www/lib/angular-resource/angular-resource.js',
    './www/lib/angular-ui-router/release/angular-ui-router.js',
    // './www/js/bootstrap-custom/ui-bootstrap-custom-0.10.0.js',
    './www/lib/ionic/js/ionic.js',
    './www/lib/ionic/js/ionic-angular.js', {
      pattern: 'src/vendor.ts'
    },
    './node_modules/ng-cordova/dist/ng-cordova-mocks.js', {
      pattern: 'src/app/app.ts'
    },
    // './node_modules/angular-mocks/angular-mocks.js',
    {
      pattern: 'src/**/*spec.ts'
    },
    'www/templates/**/*.html',
    'tests/mock/**/*.js'
  ],


  // list of files to exclude
  exclude: [],


  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    '**/*.ts': ['webpack'],
    "./www/templates/**/*.html": ["ng-html2js"]
  },


  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['progress'],


  // web server port
  port: 9876,


  // enable / disable colors in the output (reporters and logs)
  colors: true,


  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  logLevel: config.LOG_INFO,


  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,


  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['Chrome'],


  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: false,

  // Concurrency level
  // how many browser should be started simultaneous
  concurrency: Infinity

  ,
  ///////////////////////////////////

  webpack: {
    resolve: {
      extensions: ['', '.js', '.ts']
    },
    devtool: 'source-map',
    module: {
      // postloader required for coverage (comment if code intrumentation is to ugly)
      // postLoaders: [{
      //     test: /\.ts$/,
      //     exclude: /(tests|node_modules|\.spec\.ts$)/,
      //     loader: 'istanbul-instrumenter'
      // }],       
      loaders: [{
          test: /\.ts$/,
          loaders: ['ng-annotate', 'awesome-typescript-loader']
        }
        // ,
        // {test: /\.js$/, loaders: ['ng-annotate']}
      ]
    }
  },

  webpackMiddleware: {
    // quiet: true,
    stats: {
      colors: true
    }
  },

  reporters: ['progress'], //, 'coverage'],

  coverageReporter: {
    type: 'html',
    dir: 'tests/coverage/'
  },

  ngHtml2JsPreprocessor: {
    // If your build process changes the path to your templates,
    // use stripPrefix and prependPrefix to adjust it.
    stripPrefix: 'www/',
    prependPrefix: './',


    // the name of the Angular module to create
    moduleName: "zionic.templates"
  }

}
if (process.env.TRAVIS) {
  configuration.browsers = ['Chrome_travis_ci'];
  configuration.customLaunchers = {
    Chrome_travis_ci: {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  }
}
  config.set(configuration)
}