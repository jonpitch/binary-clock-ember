'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/zonkyio/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "binary-clock-ember",
    short_name: "binary-clock-ember",
    description: "a binary clock, built with Ember",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: 'any',
    lang: 'en-US',
    ms: {
      tileColor: '#000000'
    },
    apple: {
      statusBarStyle: 'black-translucent'
    },
    icons: [{
      src: '/images/favicon.ico',
      sizes: '64x64',
      targets: ['favicon']
    }, {
      src: "/images/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png"
    }, {
      src: "/images/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png"
    }, {
      src: "/images/favicon-96x96.png",
      sizes: "96x96",
      type: "image/png"
    }, {
      src: "/images/favicon-128x128.png",
      sizes: "128x128",
      type: "image/png"
    }, {
      src: "/images/favicon-192x192.png",
      sizes: "192x192",
      type: "image/png"
    }, {
      src: "/images/favicon-196x196.png",
      sizes: "196x196",
      type: "image/png"
    }, {
      src: "/images/favicon-384x384.png",
      sizes: "384x384",
      type: "image/png"
    }, {
      src: "/images/favicon-512x512.png",
      sizes: "512x512",
      type: "image/png"
    }, {
      src: "/images/apple-touch-icon-57x57.png",
      sizes: "57x57",
      type: "image/png",
      targets: ['apple']
    }, {
      src: "/images/apple-touch-icon-60x60.png",
      sizes: "60x60",
      type: "image/png",
      targets: ['apple']
    }, {
      src: "/images/apple-touch-icon-72x72.png",
      sizes: "72x72",
      type: "image/png",
      targets: ['apple']
    }, {
      src: "/images/apple-touch-icon-76x76.png",
      sizes: "76x76",
      type: "image/png",
      targets: ['apple']
    }, {
      src: "/images/apple-touch-icon-114x114.png",
      sizes: "114x114",
      type: "image/png",
      targets: ['apple']
    }, {
      src: "/images/apple-touch-icon-120x120.png",
      sizes: "120x120",
      type: "image/png",
      targets: ['apple']
    }, {
      src: "/images/apple-touch-icon-144x144.png",
      sizes: "144x144",
      type: "image/png",
      targets: ['apple']
    }, {
      src: "/images/apple-touch-icon-152x152.png",
      sizes: "152x152",
      type: "image/png",
      targets: ['apple']
    }, {
      src: '/images/safari-pinned-tab.svg',
      safariPinnedTabColor: '#000',
      targets: ['safari-pinned-tab']
    }, {
      src: "/images/mstile-310x310.png",
      element: "square310x310logo",
      targets: ['ms']
    }]
  };
}
