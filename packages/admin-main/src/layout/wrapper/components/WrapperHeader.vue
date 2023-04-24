<template>
  <div
    class="w-full bg-bg h-48px border-b border-border-light flex flex-row items-center justify-between relative pl-space-sm">
    <div class="flex flex-row items-center">
      <i
        class="i-uplus:logo inline-block align-middle w-space h-space mr-space-xxs cursor-pointer"
        @click="
          () => {
            route.name !== 'home' ? router.push({ name: 'home' }) : null;
          }
        " />
      <div class="text-size-medium font-500">统一运营管理平台</div>
      <div v-if="route.meta.title" class="flex flex-row items-center">
        <div class="bg-border w-space-xxs h-2px mx-space-xxs" />
        <div class="text-size-medium font-500">{{ route.meta.title }}</div>
      </div>
    </div>
    <WrapperHeaderAuth class="ml-space-xs" />
  </div>
</template>

<script lang="ts" setup>
  import { useRoute, useRouter } from 'vue-router';
  import WrapperHeaderAuth from './WrapperHeaderAuth.vue';
  const route = useRoute();
  const router = useRouter();
</script>
