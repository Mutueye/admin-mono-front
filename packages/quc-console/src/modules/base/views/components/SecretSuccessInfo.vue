<template>
  <div class="flex flex-col">
    <div class="color-text-primary font-semibold leading-24px">
      SecretKey: {{ showKey ? secret : '********************************************' }}
    </div>
    <div class="flex flex-row mt-spacing-xxs">
      <el-button size="small" @click="toggleShowKey">{{ showKey ? '隐藏' : '显示' }}</el-button>
      <el-button size="small" class="ml-spacing-xxs" @click="handleCopy">复制</el-button>
    </div>
  </div>
  <div class="w-full flex-col justify-start my-spacing-xs leading-24px">
    <div class="color-text-primary">SK信息仅限于在本窗口内查看，关闭后将无法再次查看，请及时保存</div>
    <div class="color-danger">如需再次查看，只能创建新的SK</div>
  </div>
  <div class="w-full flex flex-row justify-end">
    <el-button type="primary" @click="close">关闭</el-button>
  </div>
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useClipboard } from '@vueuse/core';

  const { copy } = useClipboard();

  const props = defineProps<{
    /** 应用SK */
    secret: string;
  }>();

  const { secret } = toRefs(props);

  const showKey = ref<boolean>();

  const toggleShowKey = () => {
    showKey.value = !showKey.value;
  };

  const handleCopy = () => {
    copy(secret.value);
    ElMessage.success('复制成功');
  };

  const emit = defineEmits(['close']);

  const close = () => {
    emit('close');
  };
</script>
