<template>
  <div class="flex flex-row items-center group" :class="isBackBtn ? 'cursor-pointer' : ''" @click="onClickBack">
    <i
      v-if="isBackBtn"
      class="i-mdi-chevron-left text-size-extra-large color-text-primary transition-transform -translate-x-2px"
      :class="isBackBtn ? 'group-hover:(text-primary -translate-x-5px)' : ''" />
    <div
      class="text-size-large font-semibold color-text-primary leading-component-size"
      :class="isBackBtn ? 'group-hover:text-primary' : ''">
      {{ route.meta.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, toRefs } from 'vue';
  import { RouteParams } from 'vue-router';
  import { LocationQuery } from 'vue-router';
  import { RouteLocationNormalizedLoaded } from 'vue-router';
  import { RouteLocationRaw } from 'vue-router';
  import { useRoute, useRouter } from 'vue-router';
  const route = useRoute();
  const router = useRouter();

  const props = withDefaults(
    defineProps<{
      /** 是否显示返回按钮 */
      isNav?: boolean;
    }>(),
    { isNav: true }
  );

  const { isNav } = toRefs(props);

  const isBackBtn = computed(() => isNav.value && route.meta.parentRouteData);

  const onClickBack = () => {
    if (isBackBtn.value) {
      const parentRouteLocation = generateParentRouteLocation(route);
      if (parentRouteLocation) {
        router.replace(parentRouteLocation);
      } else {
        router.back();
      }
    }
  };

  /** 根据route.meta.parentRouteData信息，和当前的 */
  const generateParentRouteLocation = (rt: RouteLocationNormalizedLoaded) => {
    const parentRouteData = rt.meta.parentRouteData;
    if (parentRouteData) {
      const parentRouteLocation: RouteLocationRaw = { name: parentRouteData.name };
      // 映射params
      if (parentRouteData.paramKeys && parentRouteData.paramKeys.length > 0) {
        const params: RouteParams = {};
        parentRouteData.paramKeys.forEach((key) => {
          if (rt.params[key]) {
            params[key] = rt.params[key];
          } else {
            console.warn(
              `当前路由param缺少父级路由需要的键:"${key}",请检查您当前路由meta信息中的parentRouteData配置，以及当前路由和父级路由相同param的字段是否匹配。`
            );
          }
        });
        parentRouteLocation.params = params;
      }
      // 映射query
      if (parentRouteData.queryKeys && parentRouteData.queryKeys.length > 0) {
        const query: LocationQuery = {};
        parentRouteData.queryKeys.forEach((key) => {
          if (rt.query[key]) {
            query[key] = rt.query[key];
          } else {
            console.warn(
              `当前路由query缺少父级路由需要的键:"${key}",请检查您当前路由meta信息中的parentRouteData配置，以及当前路由和父级路由相同query的字段是否匹配。`
            );
          }
        });
      }
      return parentRouteLocation;
    } else {
      return null;
    }
  };
</script>
