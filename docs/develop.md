# 开发

### 路由

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

### 插件

插件和第三方组件的引入通过 plugins/all.js 引入即可

vuex store 暂未形成统一规范，参照官方实践即可


### 组件模块

组件和模块分别放在 components 和 modules 文件中，通过监控每个一级目录中的 index.vue 文件，自动引入并注册。

```
- components
    - layout
        - index.vue         // 会被引入
        - main.vue          // 不会被引入

- modules
    - large
        - m1.vue
        - m2.vue
        ...

建议交大模块放入统一的文件夹中，然后手动管理，避免过多的导入全局组件中，以及目录混乱。


```