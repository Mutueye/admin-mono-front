<template>
  <AdminScrollableContent>
    <div class="w-full flex flex-col items-center">
      <div class="w-full py-space-xxxl text-center font-bold">HOME</div>
      <HelloWorld msg="Hellow World" />
      <el-button>text</el-button>
    </div>
  </AdminScrollableContent>
</template>

<script lang="ts" setup>
  import HelloWorld from '@/components/HelloWorld.vue';
  import AdminScrollableContent from '@/layout/admin/components/AdminScrollableContent.vue';
</script>
