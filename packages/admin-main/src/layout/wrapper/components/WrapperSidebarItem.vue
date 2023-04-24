<template>
  <el-tooltip effect="dark" :content="title" placement="right">
    <div
      class="w-36px h-36px mx-14px mt-14px flex flex-row items-center justify-center hover:bg-bg rounded-base"
      :class="active ? 'bg-white' : 'bg-transparent cursor-pointer'"
      @click="
        () => {
          active ? null : router.push(routeData);
        }
      ">
      <i
        class="inline-block w-22px h-22px"
        :class="[iconClass, active ? 'color-primary' : 'color-text-regular']" />
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
  import { computed, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import type { RouteRecordRaw } from 'vue-router';
  import { get } from 'lodash-es';

  const router = useRouter();

  const props = defineProps<{ routeData: RouteRecordRaw; active: boolean }>();
  const { routeData } = toRefs(props);

  const title = computed(() => get(routeData.value, 'meta.title', ''));

  const iconClass = computed(() => {
    return get(routeData.value, 'meta.menuConfig.iconClass', 'i-mdi-record-circle');
  });
</script>
