module.exports = function(config) {
    var testWebpackConfig = require('./webpack.test.config.js');

    config.set({
 
        basePath: '.',
 
        frameworks: ['jasmine'],
 
        // files: [
        //     // paths loaded by Karma
        //     // {pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: true},
        //     // {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
        //     // {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: true},
        //     {pattern: 'node_modules/angular2/bundles/angular2.dev.js', included: true, watched: true},
        //     {pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: true},
        //     // {pattern: 'karma-test-shim.js', included: true, watched: true},
 
        //     // // paths loaded via module imports
        //     // {pattern: 'dist/**/*.js', included: false, watched: true},
 
        //     // paths to support debugging with source maps in dev tools
        //     {pattern: 'src/**/**/*.js', included: false, watched: false},
        //     {pattern: 'src/**/**/*.js.map', included: false, watched: false}
        // ],
 
        files: [
            // {pattern: 'dist/**/*.js', included: false, watched: true},
            { pattern: './spec-bundle.js', watched: false }
            // { pattern: 'src/**/**/*.js', included: false, watched: false},
            // { pattern: 'src/**/**/*.js.map', included: false }, 
        
        ],


        // proxied base paths
        proxies: {
            // required for component assests fetched by Angular's compiler
            // '/src/': '/base/src/'
        },
 
        port: 9876,
 
        logLevel: config.LOG_INFO,
 
        colors: true,
 
        autoWatch: true,
 
        browsers: ['Chrome','PhantomJS'],
        //browsers : ['PhantomJS'],
 
        // Karma plugins loaded
        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher'
        ],
 
        // Coverage reporter generates the coverage // progress
        reporters: ['mocha', 'coverage'],
 
        // Source files that you wanna generate coverage for.
        // Do not include tests or libraries (these files will be instrumented by Istanbul)
        
        preprocessors: { './spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

        webpack: testWebpackConfig,

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            color: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e. 
                chunks: false
            }
        },

        coverageReporter: {
            includeAllSources: false,
            reporters:[
                {type: 'json', subdir: '.', file: 'coverage-final.json'},
                { type: 'text-summary' },
                { type: 'html' }
            ]
        },
 
        singleRun: true,
        noResolve: false
    })
};