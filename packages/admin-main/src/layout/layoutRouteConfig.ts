import type { RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';
import BaseLayout from '@/layout/base/Baselayout.vue';
import WrapperLayout from '@/layout/wrapper/WrapperLayout.vue';

/**
 * Page layout enum.
 */
export enum LayoutEnum {
  base = 'base',
  wrapper = 'wrapper',
}

const generateLayoutRoute = (config: {
  name: LayoutEnum;
  component: Component;
}): RouteRecordRaw => {
  return {
    path: `/${config.name}`,
    name: config.name,
    props: { layout: config.name },
    component: config.component,
    children: [],
  };
};

export const layoutRoutes: Record<LayoutEnum, RouteRecordRaw> = {
  base: generateLayoutRoute({ name: LayoutEnum.base, component: BaseLayout }),
  wrapper: generateLayoutRoute({ name: LayoutEnum.wrapper, component: WrapperLayout }),
};
