<template>
  <div class="flex flex-row items-start justify-between w-full">
    <div class="flex flex-col justify-start items-start">
      <div :id="titleId" class="text-size-18px font-bold color-text-primary leading-20px">
        {{ title }}
      </div>
      <div
        v-if="subTitle"
        class="text-size-12px leading-14px mt-8px"
        :class="subTitleDanger ? 'color-danger' : 'color-text-secondary'">
        {{ subTitle }}
      </div>
    </div>
    <div class="flex flex-row items-center">
      <slot />
      <button
        v-if="showCloseBtn"
        class="color-text-placeholder outline-none bg-transparent border-none text-size-16px cursor-pointer hover:color-text-regular leading-20px m-0 p-0 flex items-center justify-center h-20px w-20px"
        @click="clickClose">
        <div class="w-20px h-20px transform-gpu relative rotate-45 group">
          <div
            class="w-2px h-14px rounded absolute bg-text-secondary left-1/2 top-1/2 -mt-7px -ml-1px group-hover:bg-primary" />
          <div
            class="w-14px h-2px rounded absolute bg-text-secondary left-1/2 top-1/2 -mt-1px -ml-7px group-hover:bg-primary" />
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    titleId: string;
    title: string;
    subTitle?: string;
    showCloseBtn: boolean;
    subTitleDanger?: boolean;
  }>();

  const emit = defineEmits(['close']);

  const clickClose = () => {
    emit('close');
  };
</script>
