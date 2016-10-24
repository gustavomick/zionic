// An example configuration file.
exports.config = {
  directConnect: true,
  chromeOnly: true,
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
      'browserName': 'chrome',
      'chromeOptions': {                
          args: ['--disable-web-security']
      } 
  },
  baseUrl: 'http://localhost:8100',
  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['./weather.spec.js'],

  // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        isVerbose: true,
    }
};