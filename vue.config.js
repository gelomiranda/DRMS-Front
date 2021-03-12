module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
       symlinks: false
    }
  },
  transpileDependencies: [
    '@coreui/utils'
  ],
  devServer: {
    port: 8080,
    proxy: {
        '/api': {
            target: 'http://localhost:8080/'
            // changeOrigin: true,
            // pathRewrite: {
            //     '^/V1': ''
            // }
        },
        '/V2': {
            target: 'http://192.168.68.109:8080',
            changeOrigin: true,
            pathRewrite: {
                '^/V2': ''
            }
        },

    }
}
}
