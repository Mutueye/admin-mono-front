<!-- 创建密钥弹窗 -->
<template>
  <el-dialog
    v-model="dialogShow"
    :width="dialogWidth"
    :append-to-body="true"
    :z-index="zIndex"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
    :before-close="beforeClose">
    <template #header="{ close, titleId }">
      <DialogHeader
        :title="title"
        :sub-title="subTitle"
        :title-id="titleId"
        :show-close-btn="showClose"
        :sub-title-danger="false"
        @close="close" />
    </template>
    <slot />
  </el-dialog>
</template>

<script setup lang="ts">
  import { toRefs, computed, ref, watch } from 'vue';
  import type { DialogBeforeCloseFn } from 'element-plus';
  import DialogHeader from './DialogHeader.vue';

  interface DialogWrapperProps {
    /** 弹窗宽度 */
    width?: number | string;
    /** 是否显示弹窗 */
    show?: boolean;
    /** 是否显示关闭按钮 */
    showClose?: boolean;
    /** 弹窗标题 */
    title: string;
    /** 弹窗副标题 */
    subTitle?: string;
    /** 弹窗副标题是否红色 */
    subTitleDanger?: boolean;
    /** 键盘esc是否关闭弹窗 */
    closeOnPressEscape?: boolean;
    /** 点击弹窗黑色遮罩时是否关闭弹窗 */
    closeOnClickModal?: boolean;
    /** 关闭弹窗时的操作 */
    beforeClose?: DialogBeforeCloseFn;
    /** z-index */
    zIndex?: number;
  }

  const props = withDefaults(defineProps<DialogWrapperProps>(), {
    width: '600px',
    showClose: true,
    title: '',
    subTitle: '',
    closeOnPressEscape: false,
    closeOnClickModal: false,
    beforeClose: () => null,
    zIndex: 1999,
  });
  const { show, width } = toRefs(props);

  const dialogShow = ref(false);

  watch(show, (val) => {
    dialogShow.value = val;
  });

  const dialogWidth = computed(() => {
    if (typeof width.value === 'number') {
      return width.value + 'px';
    } else if (typeof width.value === 'string') {
      return width.value;
    } else {
      return '600px';
    }
  });
</script>
