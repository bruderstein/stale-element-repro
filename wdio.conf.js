// This is optionally included (commented out below) to force to use JSON protocol,
// as otherwise the edge session response from browserstack _looks_ like W3C, but actually
// doesn't support it entirely.
//
// For the purposes of this repro case, this has the effect of switching between using the
// `/element/<elementId>/displayed` endpoint (with the transform enabled) and the
// script version (default), W3C protocol
const { transformResponse } = require('./wdio-browserstack-interceptors');

exports.config = {
    runner: 'local',
    // Using browserstack, unable to try on other providers if that works
    hostname: 'hub-cloud.browserstack.com',
    protocol: 'https',
    user: process.env.BROWSERSTACK_USER,
    key: process.env.BROWSERSTACK_PASSWORD,
    specs: [
        'tests/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    capabilities: [{
        browserName: 'Edge',
        browserVersion: '15.0',
        // Using this older version triggers the JSON protocol, triggering the use of /displayed
        'browserstack.selenium_version': '3.10.0'
    }],
    // ** HERE **
    // Enable `transformResponse` below in order to enable JSON protocol to use /displayed
    // the same effects are seen either way
    // transformResponse,  // COMMENT OUT to return to W3C protocol
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://stale-element-repro.netlify.app/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['browserstack'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
