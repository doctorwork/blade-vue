# 开发

## 路由

相比一般的手动配置router.js 文件，然后写入App中，blade-scripts 通过监控 pages文件夹中的 vue 文件自动生成路由(借鉴了nuxt的实现方式)。

``` 
-pages
    - index.vue
    - main.vue
    - main
        - test.vue
        - index.vue
    - part
        - a.vue
        - b.vue

//    以上目录会形成 4 条路由记录。
//    其中 main 下两条和main存在嵌套关系（需要和文件夹同名的vue - main.vue文件，建立嵌套关系）。
//    part/a 和 part/b 为独立路由.
```

## 插件

插件和第三方组件的引入通过 plugins/all.js 引入即可

vuex store 暂未形成统一规范，参照官方实践即可

> blade-scripts 内置插件/mixins

- $forward : 封装了 vue-router的push方法，可以修改该方法实现更多自定义逻辑，该方法为推荐实践，不强制要求使用
- $redirect: 直接的url 跳转，同上。

(更多方法完善中)

## 组件模块

组件和模块分别放在 components 和 modules 文件中，通过监控每个一级目录中的 index.vue 文件，自动引入并注册。

```js
- components
    - layout
        - index.vue         // 会被引入
        - main.vue          // 不会被引入

- modules
    - large
        - m1.vue
        - m2.vue
        ...

// 建议复杂模块放入统一的文件夹中，然后手动管理，避免过多的导入全局组件中，以及目录混乱。

```

## 数据请求

blade-scripts 对axios 提供了简单封装 并 export 了一些工具方法

- 提供基础的请求构建方法 makeGet, makePost, makePut, makeDelete
- 添加restful方式 makeResource
- setup 方法，设置实例defaults 属性 ,参见axios文档，常见的有baseUrl， header 等

```js
setup({
    headers: {
        'content-type': 'application/json;charset=UTF-8'
        // 默认使用 application/x-www-form-urlencoded
    },
    baseURL
});
```

- createApi 方法，创建单独axios实例
- 全局错误处理方法  - decorateMaker（不同于，且不建议使用默认的interceptor）

```js
import {makeGet, makePost, makePut, makeDel} from "@/api";

// 普通的个请求
const test = makeGet("/api/test");
test().then(data => console.log(data));

// 添加 restful 请求, 可根据需要自行覆盖actions, 默认有 get, query, update, create, delete 5个方法，

const api = makeResource("/api/test");

api.query();
api.get({id: 1}); // 默认参数名为id

const api = makeResource("/api/test", {one: "/{id}/{name}"}); // 自定义action时，默认action不可用
api.one({name: 'doctorwork', id: 1}); 


// 全局错误处理 - 用于对默认的 makeGet 等方法添加错误处理

const processor = function(res) {
    if (res.errcode !== 0) {
        toast(res.errmsg);
        return Promise.reject(res);
    } else {
        return res.data;
    }
}

const get = decorateError(makeGet, processor);
const newtest = get("/api/test");

```

实际项目中，建议将请求统一放在 plugins/api.js中，然后再实例中通过 this.$model 访问，（可修改该方法，避免请求被覆盖）

```js

    // plugins/api.js  该文件已被引入 all.js中

    export default {
        test: makeGet("/url");
    }

    // index.vue

    this.$model('test').then(data => this.list = data);

```