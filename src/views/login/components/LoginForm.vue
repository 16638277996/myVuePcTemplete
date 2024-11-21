<template>
    <div class="login-form">
        <h2>欢迎登录</h2>

        <el-form ref="loginFormRef" :model="loginData" :rules="loginRules">
            <!-- 用户名 -->
            <el-form-item prop="username">
                <div class="input-wrapper">
                    <el-icon class="mx-2">
                        <User />
                    </el-icon>
                    <el-input
                        ref="username"
                        v-model="loginData.username"
                        :placeholder="$t('login.username')"
                        name="username"
                        size="large"
                        class="h-[48px]"
                    ></el-input>
                </div>
            </el-form-item>

            <!-- 密码 -->
            <el-tooltip
                :visible="isCapslock"
                :content="$t('login.capsLock')"
                placement="right"
            >
                <el-form-item prop="password">
                    <div class="input-wrapper">
                        <el-icon class="mx-2">
                            <Lock />
                        </el-icon>
                        <el-input
                            v-model="loginData.password"
                            :placeholder="$t('login.password')"
                            type="password"
                            name="password"
                            size="large"
                            class="h-[48px] pr-2"
                            show-password
                            @keyup="checkCapslock"
                            @keyup.enter="handleLoginSubmit"
                        />
                    </div>
                </el-form-item>
            </el-tooltip>

            <div class="flex-x-between w-full py-1">
                <el-checkbox>
                    {{ $t("login.rememberMe") }}
                </el-checkbox>
            </div>

            <!-- 登录按钮 -->
            <el-button
                :loading="loading"
                type="primary"
                size="large"
                class="w-full"
                @click.prevent="handleLoginSubmit"
            >
                {{ $t("login.login") }}
            </el-button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
// import { LocationQuery, useRoute } from "vue-router";

import AuthAPI, { type LoginData } from "@/api/auth";
// import router from "@/router";

import type { FormInstance } from "element-plus";

// import defaultSettings from "@/settings";
// import { ThemeEnum } from "@/enums/ThemeEnum";

// import { useSettingsStore, useUserStore, useDictStore } from "@/store";

// const userStore = useUserStore();
// const settingsStore = useSettingsStore();
// const dictStore = useDictStore();

// const route = useRoute();
const { t } = useI18n();
const loginFormRef = ref<FormInstance>();

// const isDark = ref(settingsStore.theme === ThemeEnum.DARK); // 是否暗黑模式
const loading = ref(false); // 按钮 loading 状态
const isCapslock = ref(false); // 是否大写锁定
// const captchaBase64 = ref(); // 验证码图片Base64字符串

// const logo = ref(new URL("../../assets/logo.png", import.meta.url).href);
// const loginImage = ref(
//     new URL("../../assets/images/login-image.svg", import.meta.url).href
// );

const loginData = ref<LoginData>({
    username: "",
    password: "",
    captchaKey: "",
    captchaCode: "",
});

const loginRules = computed(() => {
    return {
        username: [
            {
                required: true,
                trigger: "blur",
                message: t("login.message.username.required"),
            },
        ],
        password: [
            {
                required: true,
                trigger: "blur",
                message: t("login.message.password.required"),
            },
            {
                min: 6,
                message: t("login.message.password.min"),
                trigger: "blur",
            },
        ],
        captchaCode: [
            {
                required: true,
                trigger: "blur",
                message: t("login.message.captchaCode.required"),
            },
        ],
    };
});

// // 获取验证码
// function getCaptcha() {
//     AuthAPI.getCaptcha().then((data) => {
//         loginData.value.captchaKey = data.captchaKey;
//         captchaBase64.value = data.captchaBase64;
//     });
// }

// 登录
async function handleLoginSubmit() {
    loginFormRef.value?.validate((valid: boolean) => {
        console.log(valid);
        // if (valid) {
        //     loading.value = true;
        //     userStore
        //         .login(loginData.value)
        //         .then(async () => {
        //             await userStore.getUserInfo();
        //             // 需要在路由跳转前加载字典数据，否则会出现字典数据未加载完成导致页面渲染异常
        //             await dictStore.loadDictionaries();
        //             // 跳转到登录前的页面
        //             const { path, queryParams } = parseRedirect();
        //             router.push({ path: path, query: queryParams });
        //         })
        //         .catch(() => {
        //             getCaptcha();
        //         })
        //         .finally(() => {
        //             loading.value = false;
        //         });
        // }
    });
}

// /**
//  * 解析 redirect 字符串 为 path 和  queryParams
//  *
//  * @returns { path: string, queryParams: Record<string, string> } 解析后的 path 和 queryParams
//  */
// function parseRedirect(): {
//     path: string;
//     queryParams: Record<string, string>;
// } {
//     const query: LocationQuery = route.query;
//     const redirect = (query.redirect as string) ?? "/";

//     const url = new URL(redirect, window.location.origin);
//     const path = url.pathname;
//     const queryParams: Record<string, string> = {};

//     url.searchParams.forEach((value, key) => {
//         queryParams[key] = value;
//     });

//     return { path, queryParams };
// }

// 检查输入大小写
function checkCapslock(event: KeyboardEvent) {
    // 防止浏览器密码自动填充时报错
    if (event instanceof KeyboardEvent) {
        isCapslock.value = event.getModifierState("CapsLock");
    }
}

// // 设置登录凭证
// const setLoginCredentials = (username: string, password: string) => {
//     loginData.value.username = username;
//     loginData.value.password = password;
// };

// onMounted(() => {
//     // getCaptcha();
// });
</script>

<style lang="scss" scoped>
.login-form {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 50px 25px 0 25px;
    h2 {
        font-weight: 400;
        margin-bottom: 16px;
    }
    .input-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
    }

    :deep(.el-form-item) {
        background: var(--el-input-bg-color);
        border: 1px solid var(--el-border-color);
        border-radius: 5px;
    }
    :deep(.el-input) {
        .el-input__wrapper {
            padding: 0;
            background-color: transparent;
            box-shadow: none;

            &.is-focus,
            &:hover {
                box-shadow: none !important;
            }

            input:-webkit-autofill {
                /* 通过延时渲染背景色变相去除背景颜色 */
                transition: background-color 1000s ease-in-out 0s;
            }
        }
    }
}
</style>
