import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import NProgress from "@/utils/nprogress"; // 进度条
import { getToken } from "@/utils/auth";
import router from "@/router";
import { usePermissionStore, useUserStore } from "@/store";

export function setupPermission() {
  console.log('全局路由守卫setupPermission')
  // 白名单路由
  const whiteList = ["/login"];

  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    const isLogin = !!getToken(); // 判断是否登录

    console.log('跳转path')
    console.log(to.path)

    if (isLogin) {
      if (to.path === "/login") {
        // 已登录，访问登录页，跳转到首页
        next({ path: "/" });
      } else {
        const permissionStore = usePermissionStore();
        // 判断路由是否加载过
        if (permissionStore.isRoutesLoaded) {
          if (to.matched.length === 0) {
            // 路由未匹配，跳转到404
            next("/404");
          } else {   
            // 动态设置页面标题
            const title =
              (to.params.title as string) || (to.query.title as string);
            if (title) {
              to.meta.title = title;
            }
            next();
          }
        } else {
          try {
            // 生成动态路由
            const dynamicRoutes = await permissionStore.generateRoutes();
            console.log('动态路由')
            console.log(dynamicRoutes)
            dynamicRoutes.forEach((route: RouteRecordRaw) =>
              router.addRoute(route)
            );
            next({ ...to, replace: true }); // 添加动态路由后重新导航
          } catch (error) {
            console.error(error);
            // 路由加载失败，重置 token 并重定向到登录页
            await useUserStore().clearUserSession();
            redirectToLogin(to, next);
            NProgress.done();
          }
        }
      }
    } else {
      // 未登录，判断是否在白名单中
      if (whiteList.includes(to.path)) {
        next();
      } else {
        // 不在白名单，重定向到登录页
        redirectToLogin(to, next);
        NProgress.done(); // 关闭进度条
      }
    }
  });

  // 后置守卫，保证每次路由跳转结束时关闭进度条
  router.afterEach(() => {
    NProgress.done();
  });
}

/** 重定向到登录页 */
function redirectToLogin(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const params = new URLSearchParams(to.query as Record<string, string>); // 先获取参数
  const queryString = params.toString(); // 将参数转为string类型
  const redirect = queryString ? `${to.path}?${queryString}` : to.path; //  拼接登录之后的重定向路由   path+参数
  next(`/login?redirect=${encodeURIComponent(redirect)}`); //重定向到login界面   login登录之后重定向到刚才没有访问的界面 并且把参数安全加密
}

/** 判断是否有权限 */
export function hasAuth(
  value: string | string[],
  type: "button" | "role" = "button"
) {
  const { roles, perms } = useUserStore().userInfo;

  // 超级管理员 拥有所有权限
  if (type === "button" && roles.includes("ROOT")) {
    return true;
  }

  const auths = type === "button" ? perms : roles;
  return typeof value === "string"
    ? auths.includes(value)
    : value.some((perm) => auths.includes(perm));
}
