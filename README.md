## blade-vue

### 目录结构

- modules
- components
- pages
- plugins
- static

`别名`

- `~` 对应项目目录
- `@` 对应.blade 目录

### 数据请求

- 提供基础的请求构建方法 makeGet, makePost, makePut, makeDelete
- 添加restful方式 makeResource
- setup 方法，设置实例defaults 属性
- createApi 方法，创建单独实例

```
// 添加 interceptor
setup({
	interceptors: {
		response: function(response) {

		}
	}
});
```

```
// 普通的个请求
const test = makeGet("/api/test");
test().then(data => console.log(data));

// 添加 restful 请求, 可根据需要自行覆盖actions, 默认有 get, query, update, create, delete 5个方法，

const api = makeResource("/api/test");

api.query();
api.get({id: 1}); // 默认参数名为id

const api = makeResource("/api/test", {one: "/{id}/{name}"}); // 自定义action时，默认action不可用
api.one({name: 'doctorwork', id: 1}); 

```

### 替换 html 模板

- 在根目录下创建一个app.html 文件即可

### 路由插件 （beforeEach 回调）

- 在 web.config.js 中 配置 

``` js
plugins: {
  route: '~/plugins/route',
}
```

``` js
export default function (to, from, next) {
	next();
}
```

### 路由覆盖
- 配置 routes 

``` js
// 文件 pages/papers/details 的 路径修改为 含参数 `id` 的动态路由
"routes": {
  'papers-details': "/:id"
}
```

### 404 页面

- views.notFound 配置

```
views: {
  notFound: '~/404.vue'
}
```