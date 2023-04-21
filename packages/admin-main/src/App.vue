<template>
  <RouterView />
</template>

<script setup lang="ts">
  // import { ref, onMounted } from 'vue';
  // import { useRoute, useRouter } from 'vue-router';
  // import type { RouteRecordRaw } from 'vue-router';
  // import AppWrapper from './modules/appWrapper/views/AppWrapper.vue';
  // import { appList } from './utils/config';

  // const router = useRouter();

  // onMounted(() => {
  //   const layoutRoute = router.options.routes.find((route) => route.name === 'wrapper');
  //   const children: RouteRecordRaw[] = [];
  //   if (layoutRoute) {
  //     if (layoutRoute.children && layoutRoute.children.length > 0) {
  //       children.push(layoutRoute.children[0]);
  //     }
  //     appList.forEach((appConfig) => {
  //       children.push({
  //         name: appConfig.name,
  //         path: '/' + appConfig.name,
  //         component: AppWrapper,
  //         meta: {
  //           title: appConfig.title,
  //           iconClass: appConfig.iconClass,
  //           order: appConfig.order,
  //         },
  //       });
  //     });
  //     layoutRoute.children = children;
  //     router.addRoute(Object.assign({}, layoutRoute));
  //     console.log('route:::::', router);
  //   }
  // });
</script>
