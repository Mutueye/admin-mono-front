<template>
  <ScrollableContent>
    <div class="grid grid-cols-3 xl:grid-cols-4 gap-space-md">
      <div v-for="app in appList" :key="app.name" class="bg-bg-page p-space">{{ app.title }}</div>
    </div>

    <!-- <div class="w-full flex flex-col items-center">
      <div class="w-full py-space-xxxl text-center font-bold">HOME</div>
      <HelloWorld msg="Hellow World" />
      <el-button>text</el-button>
    </div> -->
  </ScrollableContent>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  // import HelloWorld from '@/components/HelloWorld.vue';
  import ScrollableContent from '@/components/ScrollableContent.vue';
  import type { SubAppConfig } from '@/utils/subAppConfig';
  import { getLocalSubAppList } from '@/utils/subAppConfig';

  const appList = ref<SubAppConfig[]>([]);

  onMounted(() => {
    const list = getLocalSubAppList();
    if (list) appList.value = list;
  });
</script>
