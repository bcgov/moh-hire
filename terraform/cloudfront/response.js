function handler(event) {
  var response = event.response;
  var headers = response.headers;

  // Set HTTP security headers
  // Since JavaScript doesn't allow for hyphens in variable names, we use the dict["key"] notation
  headers['strict-transport-security'] = { value: 'max-age=63072000; includeSubdomains; preload' };
  headers['content-security-policy'] = {
    value:
      "default-src 'self' https://keycloak.freshworks.club https://common-logon-dev.hlth.gov.bc.ca https://common-logon-test.hlth.gov.bc.ca https://common-logon.hlth.gov.bc.ca; img-src 'self'; style-src 'self'; script-src 'self'; form-action 'self'; frame-ancestors 'self'; worker-src 'self' blob:",
  };
  headers['permissions-policy'] = {
    value:
      'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), interest-cohort=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()',
  };
  headers['x-content-type-options'] = { value: 'nosniff' };
  headers['x-frame-options'] = { value: 'DENY' };
  headers['x-xss-protection'] = { value: '1; mode=block' };
  headers['x-download-options'] = { value: 'noopen' };
  headers['server'] = { value: '*' };
  headers['cache-control'] = { value: 'no-store' };
  // Return the response to viewers
  return response;
}
