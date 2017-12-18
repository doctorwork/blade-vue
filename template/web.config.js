const port = process.env.BLADE_PORT || 8080
const proxy = process.env.BLADE_PROXY;

module.exports = {
    "proxy": {
        "/api": {
            "target": proxy || "http://mock.example.com",
            pathRewrite: {
                '^/api': ''
            },
            changeOrigin: true
        }
    },
    port: port,
    // options: mobile|pc|hybrid
    "type": "mobile",
    "framework": "vue",
    "title": "blade",
    "routes": {
        // 'papers-details': "/:id"
    },
    // 全局 import less
    resources: "static/less/base.less",
    plugins: {
        global: '~/plugins/all',
        route: '~/plugins/route',
    },
    build: {
        postcss: {
            plugins: {
                "postcss-cssnext": {
                    features: {
                        rem: false
                    }
                },
                "postcss-pxtorem": {
                    rootValue: 40,
                    propList: ["*"]
                }
            }
        }
    },
    // vuex: '~/plugins/route',
    router: {
        base: "/"
    },
    /**
     * 域名，公众号，公共配置地址，
     * 只能为字符串的键值对
     * @type {Object}
     */
    env: {
        default: {}
    }
}