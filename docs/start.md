# 上手

blade-scipts 对vue 项目的一些常规的配置的写法入口做了封装，再开发过程中，主要关注页面，组件，数据，vuex状态。（理念和代码上借鉴了next, nuxt等ssr框架的实现）

---
blade-scripts 提供了一个初始项目模板，会生成如下目录
```
vue init doctorwork/blade-vue demo

```

```
    - components        // 组件
    - modules           // 复合功能模块
    - pages             // 页面
    - plugins           // 插件
        - all.js
        - route.js
        - api.js
    - static            // 静态资源
        - less
            - reset.less
        - style.less
    - utils
        index.vue
    - web.config.js     // 全局配置文件
    - package.json
```
### 配置

``` javascript
module.exports = {
    "proxy": {
        "/api": {
            "target": "http://mock.doctorwork.com/mock/59c9b8333dea15470360b836/urinalysis",
            pathRewrite: {
                '^/api': ''
            },
            changeOrigin: true
        }
    },
    // options: mobile|pc|hybrid
    "type": "mobile",
    "framework": "vue",
    "title": "企鹅医生诊所",
    "routes": {
        'bills': "/bills/:id"
    },
    // 全局 import less
    resources: "static/less/base.less",
    plugins: {
        global: '~/plugins/all',
        route: '~/plugins/route'
    },
    build: {
        noimg: true,
        postcss: {
            plugins: {
                'postcss-cssnext': {
                    features: {
                        rem: false
                    }
                },
                'postcss-pxtorem': {
                    rootValue: 40,
                    propList: ['*']
                }
            }
        }
    },
    router: {
        base: "/app/wx-clinic/"
    },
    vuex: '~/plugins/store',
    addons: {
        sentry: "https://0976a77982b74f11b73db66c09f60ba0@sentry.io/238376",
        growingio: ""
    },
    /**
     * 域名，公众号，公共配置地址，
     * 只能为字符串的键值对
     * @type {Object}
     */
    env: {
        default: {},
        development: {
            API_HOST: "http://api-dev.doctorwork.com"
        },
        qa: {
            API_HOST: "http://api-qa.doctorwork.com"
        },
        production: {
            API_HOST: "http://api.doctorwork.com"
        }
    }
}
```

框架在封装各种配置的时候，也提供了一些自定义配置

---

- proxy : 和webpack-dev-server中proxy配置方式一致 https://webpack.js.org/configuration/dev-server/#devserver-proxy

- type : 提供了3种类型, (pc|mobile|hybrid) 目前差别不大，正在逐步完善，mobile类型会插入一些针对移动端的优化代码和插件

- title: html-webpack-plugin 的模板文件中的标题

- route: 覆盖单个路由的路径，用于需要给路由添加路由参数 (具体参照 路由生成规则)

- plugins.global: 全局插件，用于添加第三方库和组件
- plugins.route: 用于定义 router的 beforeEach方法 （afterEach方法暂未添加);

``` js
// route插件有两种第一方式， 早期的版本采用了第一种， 第二种方式再 1.1.28后可用

export default function (to, from, next) {
	next();
}

export default function (router) {
    // 可以直接获取 router 对象
}

```

- router.base: 定义路由的base路径
- vuex: 用来定义 vuex store的文件入口 建议才用默认，模块和方法拆分也建议放在 plugins目录下的 store文件夹里
- env: 注入的环境变量, 分默认和不同环境的变量

---

其他配置

- html-webpack-plugin 的模板文件，暂不支持配置，但是可以通过再根目录创建 app.html文件，实现覆盖