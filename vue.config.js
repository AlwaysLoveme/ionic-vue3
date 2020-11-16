module.exports = {
    productionSourceMap: false,
    chainWebpack: config => {
        config.module
            .rule('scss')
            .test(/\.scss$/)
            .oneOf('vue')
            .use('px2rem-loader')
            .loader('px2rem-loader')
            .before('postcss-loader') // this makes it work.
            .options({ remUnit: 37.5, remPrecision: 8 })
            .end();
    },
}