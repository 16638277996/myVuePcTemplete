# Vue 3 + TypeScript + Vite + pina + elementplus  + axios

后台管理系统初始化项目

启动项目：
pnpm install

npm run dev

打包：
npm run build

dev环境配置跨域：
viteconfig.ts :   proxy 配置

自动引入组件方式： 组件需要写在src任意子目录下的components目录下

<!-- 自动本地icon方式： svg放在assets/icons 目录任意目录下 可以分模块避免命名冲突     <SvgIcon :icon-class="item.svgName" width="56px" height="76"/> -->

全局scss  在style common scss目录下
