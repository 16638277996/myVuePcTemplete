import type { App } from "vue";

import { setupDirective } from "@/directive";
import { setupI18n } from "@/lang";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setupElIcons } from "./icons";
import { setupPermission } from "./permission";
import webSocketManager from "@/utils/websocket";
import { InstallCodeMirror } from "codemirror-editor-vue3";

export default {
  // install 方法通常是在创建 Vue 应用实例时被调用，用于初始化整个应用程序所需的各种设置和插件
  install(app: App<Element>) {
    // 自定义指令(directive)
    setupDirective(app);
    // 路由(router)
    setupRouter(app);
    // 状态管理(store)
    setupStore(app);
    // 国际化
    setupI18n(app);
    // Element-plus图标
    setupElIcons(app);
    // 路由守卫
    setupPermission();
    // 初始化 WebSocket
    webSocketManager.setupWebSocket();
    // 注册 CodeMirror
    app.use(InstallCodeMirror);
  },
};
