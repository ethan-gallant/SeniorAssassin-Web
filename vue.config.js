const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    publicPath: './',
    pwa: {
        name: 'SeniorAssassin',
        themeColor: '#ba0108',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        manifestOptions:{
            name: 'SeniorAssassin',
            short_name: 'Assassin',
            start_url: '.',
            display: 'standalone',
            icons: [
                {
                    "src": "/img/icons/android-icon-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "/img/icons/android-icon-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                },
                {
                    "src": "/img/icons/apple-icon-180x180.png",
                    "sizes": "180x180",
                    "type": "image/png"
                },
                {
                    "src": "/img/icons/apple-touch-icon.png",
                    "sizes": "512x512",
                    "type": "image/png"
                },
                {
                    "src": "/img/icons/icon.png",
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ],
        },

        // configure the workbox plugin
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            swDest: 'service-worker.js',
            // ...other Workbox options...
        }
    },
    configureWebpack:{
        plugins: [
            new CopyPlugin([
                {from: 'src/assets/img/icons', to: 'img/icons'}
            ]),
        ],
    }

};