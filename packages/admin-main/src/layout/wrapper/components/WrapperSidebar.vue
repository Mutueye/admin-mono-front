<template>
  <div class="flex flex-col h-full w-64px bg-bg-secondary flex-shrink-0 border-r border-border-light min-h-0">
    <!-- <i
      class="i-uplus:logo inline-block align-middle w-36px h-36px m-14px cursor-pointer"
      @click="
        () => {
          route.name !== 'home' ? router.push({ name: 'home' }) : null;
        }
      " /> -->
    <div class="w-full flex flex-col flex-1 min-h-0">
      <el-scrollbar>
        <!-- apps menu -->
        <WrapperSidebarItem v-for="item in menus" :key="item.name" :route-data="item" :active="route.name === item.name" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed /*, onMounted */ } from 'vue';
  import { sortBy, get } from 'lodash-es';
  import { useRoute, useRouter } from 'vue-router';
  import type { RouteRecordRaw } from 'vue-router';
  import WrapperSidebarItem from './WrapperSidebarItem.vue';
  // import { appList } from '@/utils/subAppConfig';
  // import AppWrapper from '@/modules/appWrapper/views/AppWrapper.vue';
  // import { RouteRecordName } from 'vue-router';

  // const { allRoutes, route, router } = useRouteInfo();
  const route = useRoute();
  const router = useRouter();

  const menus = computed(() => {
    const layoutRoute = router.options.routes.find((route) => route.name === 'wrapper');
    if (layoutRoute && layoutRoute.children) {
      const result = getMenuRoutes(layoutRoute.children);
      return result;
    }
    return [];
  });

  const getMenuRoutes = (routes: RouteRecordRaw[]) => {
    const result: RouteRecordRaw[] = [];
    routes.forEach((route) => {
      if (route.meta && route.meta.menuConfig) {
        result.push(route);
      }
    });
    return sortBy(result, (item) => get(item, 'meta.menuConfig.order', 1000));
  };

  // onMounted(() => {
  //   const layoutRoute = router.options.routes.find((route) => route.name === 'wrapper');
  //   const children: RouteRecordRaw[] = [];
  //   if (layoutRoute) {
  //     if (layoutRoute.children && layoutRoute.children.length > 0) {
  //       children.push(layoutRoute.children[0]);
  //     }
  //     appList.forEach((appConfig) => {
  //       router.addRoute(layoutRoute.name as RouteRecordName, {
  //         name: appConfig.name,
  //         path: '/' + appConfig.name,
  //         component: AppWrapper,
  //         meta: {
  //           title: appConfig.title,
  //           menuConfig: {
  //             iconClass: appConfig.iconClass,
  //             order: appConfig.order,
  //           },
  //           subAppUrl: appConfig.url,
  //           authCode: appConfig.authCode,
  //         },
  //       });
  //     });
  //     // layoutRoute.children = children;
  //     // router.addRoute(Object.assign({}, layoutRoute));
  //   }
  // });
</script>
