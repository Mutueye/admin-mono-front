<template>
  <div
    class="flex flex-col h-full w-64px bg-bg-secondary flex-shrink-0 border-r border-border min-h-0">
    <!-- TODO app menu -->
    <i class="i-uplus:logo inline-block align-middle w-36px h-36px m-14px" />
    <div class="w-full flex flex-col flex-1 min-h-0">
      <el-scrollbar>
        <slot />
      </el-scrollbar>
    </div>
  </div>
</template>
