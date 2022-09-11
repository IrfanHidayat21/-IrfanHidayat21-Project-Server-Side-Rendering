import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'https://partner.nyuciyuk.com/',
      prerenderConfig: './prerender.config.js',
      serviceWorker: {
       
        // globPatterns: [
        //   '**/*.{js, json, html, css}'
        // ],
        skipWaiting: true,
        navigateFallback: '/index-org.html',
        navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/]
        
      }
    },
    {
      type: 'dist-hydrate-script',
      dir: 'dist/prerender'
    }
  ],
  globalStyle: 'src/global/style/app.css',
  globalScript: 'src/global/app.ts'
};
