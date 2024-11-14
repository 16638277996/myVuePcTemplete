<template>
  <div />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { params, query } = route;
const { path } = params;

console.log("redirect.index");
console.log("params", params);
console.log("query", query);
console.log("path", path);

router.replace({ path: "/" + path, query });
</script>
