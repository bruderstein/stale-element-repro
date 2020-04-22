exports.config = {
    runner: 'local',
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
        browserVersion : "18.0"  // NOTE: v80.0 works
    }],

    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://stale-element-repro.netlify.app/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['browserstack'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
