module.exports = {
    publicPath: './',
    pwa: {
        name: 'SeniorAssassin',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        manifestOptions:{
            name: 'SeniorAssassin',
            short_name: 'Assassin',
            start_url: '.',
            display: 'standalone'
        },

        // configure the workbox plugin
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            swDest: 'service-worker.js',
            // ...other Workbox options...
        }
    }
};