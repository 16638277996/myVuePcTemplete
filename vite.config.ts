import vue from "@vitejs/plugin-vue";
import { type UserConfig, type ConfigEnv, loadEnv, defineConfig } from "vite";


// 配置自动导出插件unplugin   自动导出插件要和elemenntplus一起用
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// 导入插件实现svg图标本地化
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// css原子化 有利于css计算页面加载速度
import UnoCSS from 'unocss/vite'

import {
  name,
  version,
  engines,
  dependencies,
  devDependencies,
} from "./package.json";



import { resolve } from "path";

// 平台的名称、版本、运行所需的 node 版本、依赖、构建时间的类型提示
const __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
  buildTimestamp: Date.now(),
};


// 配置路径别名 __dirname代表当前路径 pathSrc表示当前路径+src
const pathSrc = resolve(__dirname, "src");


// vite 配置教程 https://vite.dev/config/
export default defineConfig(({ mode }:ConfigEnv):UserConfig => {

  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 
  // `VITE_` 前缀。   mode是env文件  process.cwd()获取当前目录的文件
  const env = loadEnv(mode, process.cwd(), '')





  return {
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },

    css: {
        // CSS 预处理器
        preprocessorOptions: {
        //define global scss variable
            scss: {
              javascriptEnabled: true,
              api: "modern-compiler",
              additionalData: `
                @use "@/styles/variables.scss" as *;
              `,
            },
        }
    },

    server: {
      host: "0.0.0.0",
      port: +env.VITE_APP_PORT,
      open: true,
      proxy: {
        // 代理 /dev-api 的请求
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 代理目标地址：https://api.youlai.tech
          target: env.VITE_APP_API_URL,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },

    plugins: [
      vue(),
      UnoCSS({ hmrTopLevelAwait: false, }),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "@vueuse/core", "pinia", "vue-router", "vue-i18n"],
   
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({}),
        ],

        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
        vueTemplate: true, // 是否在 vue 模板中自动导入

        // dts: false
        dts: resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
      }),

      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"] // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          }),
        ],
        // 指定自定义组件位置(默认:src/components)
        dirs: ["src/components", "src/**/components"],
        // 导入组件类型声明文件路径 (false:关闭自动生成)
        dts: resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入函数TS类型声明文件路径
      }),

      


      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式   唯一名称
        symbolId: 'icon-[dir]-[name]',
      }),

      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),

    ],

        // 预加载项目必需的组件
    optimizeDeps: {
        include: [
          "vue",
          "vue-router",
          "element-plus",
          "pinia",
          "axios",
          "@vueuse/core",
          "sortablejs",
          "exceljs",
          "path-to-regexp",
          "echarts",
          "@wangeditor/editor",
          "@wangeditor/editor-for-vue",
          "vue-i18n",
          "path-browserify",
          "element-plus/es/components/form/style/css",
          "element-plus/es/components/form-item/style/css",
          "element-plus/es/components/button/style/css",
          "element-plus/es/components/input/style/css",
          "element-plus/es/components/input-number/style/css",
          "element-plus/es/components/switch/style/css",
          "element-plus/es/components/upload/style/css",
          "element-plus/es/components/menu/style/css",
          "element-plus/es/components/col/style/css",
          "element-plus/es/components/icon/style/css",
          "element-plus/es/components/row/style/css",
          "element-plus/es/components/tag/style/css",
          "element-plus/es/components/dialog/style/css",
          "element-plus/es/components/loading/style/css",
          "element-plus/es/components/radio/style/css",
          "element-plus/es/components/radio-group/style/css",
          "element-plus/es/components/popover/style/css",
          "element-plus/es/components/scrollbar/style/css",
          "element-plus/es/components/tooltip/style/css",
          "element-plus/es/components/dropdown/style/css",
          "element-plus/es/components/dropdown-menu/style/css",
          "element-plus/es/components/dropdown-item/style/css",
          "element-plus/es/components/sub-menu/style/css",
          "element-plus/es/components/menu-item/style/css",
          "element-plus/es/components/divider/style/css",
          "element-plus/es/components/card/style/css",
          "element-plus/es/components/link/style/css",
          "element-plus/es/components/breadcrumb/style/css",
          "element-plus/es/components/breadcrumb-item/style/css",
          "element-plus/es/components/table/style/css",
          "element-plus/es/components/tree-select/style/css",
          "element-plus/es/components/table-column/style/css",
          "element-plus/es/components/select/style/css",
          "element-plus/es/components/option/style/css",
          "element-plus/es/components/pagination/style/css",
          "element-plus/es/components/tree/style/css",
          "element-plus/es/components/alert/style/css",
          "element-plus/es/components/radio-button/style/css",
          "element-plus/es/components/checkbox-group/style/css",
          "element-plus/es/components/checkbox/style/css",
          "element-plus/es/components/tabs/style/css",
          "element-plus/es/components/tab-pane/style/css",
          "element-plus/es/components/rate/style/css",
          "element-plus/es/components/date-picker/style/css",
          "element-plus/es/components/notification/style/css",
          "element-plus/es/components/image/style/css",
          "element-plus/es/components/statistic/style/css",
          "element-plus/es/components/watermark/style/css",
          "element-plus/es/components/config-provider/style/css",
          "element-plus/es/components/text/style/css",
          "element-plus/es/components/drawer/style/css",
          "element-plus/es/components/color-picker/style/css",
          "element-plus/es/components/backtop/style/css",
          "element-plus/es/components/message-box/style/css",
          "element-plus/es/components/skeleton/style/css",
          "element-plus/es/components/skeleton/style/css",
          "element-plus/es/components/skeleton-item/style/css",
          "element-plus/es/components/badge/style/css",
          "element-plus/es/components/steps/style/css",
          "element-plus/es/components/step/style/css",
          "element-plus/es/components/avatar/style/css",
          "element-plus/es/components/descriptions/style/css",
          "element-plus/es/components/descriptions-item/style/css",
          "element-plus/es/components/checkbox-group/style/css",
          "element-plus/es/components/progress/style/css",
          "element-plus/es/components/image-viewer/style/css",
          "element-plus/es/components/empty/style/css",
        ],
    },
    
    // 构建配置
    build: {
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      minify: "terser", // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
        format: {
          comments: false, // 删除注释
        },
      },
      rollupOptions: {
        output: {
          // manualChunks: {
          //   "vue-i18n": ["vue-i18n"],
          // },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: "js/[name].[hash].js",
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: "js/[name].[hash].js",
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: (assetInfo: any) => {
            const info = assetInfo.name.split(".");
            let extType = info[info.length - 1];
            // console.log('文件信息', assetInfo.name)
            if (
              /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
            ) {
              extType = "media";
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = "img";
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "fonts";
            }
            return `${extType}/[name].[hash].[ext]`;
          },
        },
      },
    },

    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

  }
})