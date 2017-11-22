## {{ name }}

文档参见： https://doctorwork.github.io/blade-vue/#/develop

移动端 postcss 配置
```
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
}
```

---
powered by blade
