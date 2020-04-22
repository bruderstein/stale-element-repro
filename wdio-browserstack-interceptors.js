/**
 * Interceptor callback for responses
 * Checks the required protocol in the capabilities and transforms responses
 * to ensure compatibility between Browserstack and webdriverio
 *
 * @param   {Object}    response        Original response
 * @param   {Object}    requestOptions  Options of the request
 * @param   {Object}    capabilities    Capabilities of session
 * @returns {Object}                    Transformed response
 */
function transformResponse(response, requestOptions) {

  // This maps the W3C capabilities returned by Browserstack to JSONWireProtocol
  // capabilities in the cases we know it's falling back to JSONWireProtocol
  // This makes WebdriverIO treat it like a JSONWire session instead of a W3C one
  if (
    requestOptions.method === 'POST' &&
    requestOptions.uri.path === '/wd/hub/session'
  ) {
    return transformCreateSessionResponse(response);
  }

  return response;
}

/**
 * Maps capabilities of a response to `POST /session` to the equivalent
 * JSONWireProtocol capabilities
 *
 * @param   {Object}    response    Original response
 * @returns {Object}                Response with transformed body
 */
function transformCreateSessionResponse(response) {
  const { body } = response;

  if (body.value.capabilities) {
    body.value.capabilities = mapW3CToLegacyCapabilities(
      body.value.capabilities
    );
  } else if (body.value) {
    body.value = mapW3CToLegacyCapabilities(body.value);
  }

  return response;
}

/**
 * Maps a capabilities object containing W3C capabilities to
 * equivalent JSONWireProtocol capabilities
 *
 * @param   {Object}  w3c     Capabilities of W3C WebDriver protocol
 * @returns {Object}          Equivalent capabilities of JSONWireProtocol
 */
function mapW3CToLegacyCapabilities(w3c) {
  const newCaps = {
    ...w3c,
    os: w3c.platformName,
    os_version: w3c.platformVersion,
    browserName: w3c.browserName,
    browser_version: w3c.browserVersion,
    setWindowRect: true
  };

  delete newCaps.platformName;
  delete newCaps.platformVersion;
  delete newCaps.browserVersion;
  return newCaps;
}

module.exports = { transformResponse };
