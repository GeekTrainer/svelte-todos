const proxy = require('http2-proxy');

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
    public: '/', // public becomes root of app
    src: '/dist',// dist is a subfolder with JavaScript
  },
  plugins: [
    /* ... */
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-svelte',
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
    {
      src: '/api/.*',
      dest: (req, res) => {
        // remove /api prefix (optional)
        // req.url = req.url.replace(/^\/api/, '');

        return proxy.web(req, res, {
          hostname: 'localhost',
          port: 7071,
        });
      },
    },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
