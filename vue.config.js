/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

module.exports = {
    pluginOptions: {
        i18n: {
            locale: "de",
            fallbackLocale: "de",
            localeDir: "locales",
            enableInSFC: false
        }
    },
    configureWebpack: {
        devtool: "source-map"
    },
    devServer: {
        disableHostCheck: true,
        proxy: {
            "/api/": {
                target: "http://localhost:5000",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
            "/files/": {
                target: "http://localhost:5000/files/",
                changeOrigin: true,
                pathRewrite: {
                    "^/files": ""
                }
            }
        }
    }
}
