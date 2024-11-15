import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

// 全局注册 store
export function setupStore(app: App<Element>) {
  app.use(store);
}

export * from "./modules/app";
export * from "./modules/permission";
export * from "./modules/settings";
export * from "./modules/tags-view";
export * from "./modules/user";
export * from "./modules/dict";

export { store }; // 抛出全局注册的store实例  用于modules中各个store模块抛出实例给外部ts文件用
