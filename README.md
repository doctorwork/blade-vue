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
