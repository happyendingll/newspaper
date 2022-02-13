module.exports = {
    devServer: {
        // 端口号
        port: 8081,
        // 配置不同的后台API地址
        proxy: {
            '/api': {
                target: 'http://www.qidianlife.com/Singular/index.php',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/article': {
                target: 'http://api.hackboy.tech:168/api/article',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/article': ''
                }
            }
        },
        disableHostCheck: true
    }
}
