# webdriver.io repro case

This is a repro for https://github.com/webdriverio/webdriverio/issues/5311

v5 and v6 configurations and package.json/package-lock.json files are included.

There is an optional interceptor in order for "force" wdio to use JWP, such that we can see the same issue when not using the script version of `isDisplayed`
