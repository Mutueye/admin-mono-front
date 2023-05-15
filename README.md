# admin-mono-front

统一运营管理平台前端：本项目为多包项目(Monorepo)，项目使用 lerna-lite 结合 pnpm 的 workspace 进行多包管理

## scripts

```sh
# 安装
pnpm install

# 开发
pnpm dev

# build
pnpm build
```

# 微前端适配问题记录

- 子应用:root 下的样式无效，将:root 改为 html 即可
- 使用 vite 构建的 vue2 项目，element-ui 字体图标无法显示(从 iconfont 网站用 icon class 方式引入字体图标可正常显示)，使用@vue/cli 构建的项目无此问题。
  - 问题原因：怀疑 css 的@font-face 在 vite 环境 shadow-dom 下识别有问题
  - 解决方案：将 element-ui 样式在基座引用一下，或者一个空白 webpack 构建的子项目，引入 element-ui 样式，则 vite 构建的 vue2 项目中 element-ui 字体图标可以正常显示了。
- 下拉框弹出位置不正确，[原因及解决方案](https://wujie-micro.github.io/doc/question/#_4%E3%80%81%E5%86%92%E6%B3%A1%E7%B3%BB%E5%88%97%E7%BB%84%E4%BB%B6-%E6%AF%94%E5%A6%82%E4%B8%8B%E6%8B%89%E6%A1%86-%E5%BC%B9%E5%87%BA%E4%BD%8D%E7%BD%AE%E4%B8%8D%E6%AD%A3%E7%A1%AE):将子应用将 body 设置样式： position: relative 即可。
- 注意子应用中样式单位 vh 的引用，100vh 表示窗口可见高度，可能并不是子应用需要的值
