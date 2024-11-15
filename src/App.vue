<template>
  <!-- 设置全区配置的element组件 -->
  <el-config-provider :locale="locale" :size="size">
    <!-- 开启水印 -->
    <el-watermark
      v-if="watermarkEnabled"
      :font="{ color: fontColor }"
      :content="defaultSettings.watermarkContent"
      :z-index="9999"
      class="wh-full"
    >
      <router-view />
    </el-watermark>
    <!-- 关闭水印 -->
    <router-view v-else />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useAppStore, useSettingsStore } from "@/store";
import defaultSettings from "@/settings"; //基础设置 设置系统title 版本 固定头部 标签视图 水印等等
import { ThemeEnum } from "@/enums/ThemeEnum"; // 主题颜色  暗黑 明亮 自动
import { SizeEnum } from "@/enums/SizeEnum"; // 布局大小 默认 大型 小型

const appStore = useAppStore();
const settingsStore = useSettingsStore();

const locale = computed(() => appStore.locale); //设置语言
const size = computed(() => appStore.size as SizeEnum);  //设置大小： 默认 大 小
const watermarkEnabled = computed(() => settingsStore.watermarkEnabled); //是否显示水印

console.log('1212')
console.log(watermarkEnabled)

// 明亮/暗黑主题水印字体颜色适配
const fontColor = computed(() => {
  return settingsStore.theme === ThemeEnum.DARK
    ? "rgba(255, 255, 255, .15)"
    : "rgba(0, 0, 0, .15)";
});
</script>
