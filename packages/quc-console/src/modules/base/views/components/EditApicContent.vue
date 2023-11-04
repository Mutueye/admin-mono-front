<!-- 配置权限表单 -->
<template>
  <div class="w-full flex flex-col">
    <el-checkbox-group v-model="apicList" class="flex flex-col mb-spacing-xxs">
      <el-checkbox v-for="item in apicDataList" :key="item.name" :label="item.name">
        {{ item.title }}
      </el-checkbox>
    </el-checkbox-group>
    <div class="flex flex-row items-center justify-end">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :loading="submitting" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useEnumsStore } from '@/store/enums';
  import { useAppletsStore } from '../../store/applets';
  import { storeToRefs } from 'pinia';
  import { ElMessage } from 'element-plus';

  const enumsStore = useEnumsStore();
  const appletsStore = useAppletsStore();

  const { currentApplet } = storeToRefs(appletsStore);

  const emit = defineEmits(['cancel', 'submit']);

  const apicDataList = ref<{ name: string; title: string }[]>([]);
  const apicList = ref<string[]>([]);
  const submitting = ref(false);

  onMounted(() => {
    enumsStore.getEnums('apic').then((res) => {
      apicDataList.value = res;
    });
  });

  watch(
    currentApplet,
    (val) => {
      if (val && val.apicList) {
        apicList.value = val.apicList.map((item) => item.name);
      }
    },
    { immediate: true, deep: true }
  );

  const cancel = () => {
    emit('cancel');
  };

  const save = () => {
    if (currentApplet.value) {
      if (apicList.value.length === 0) {
        ElMessage.warning('权限集合不能为空');
        if (currentApplet.value && currentApplet.value.apicList) {
          apicList.value = currentApplet.value.apicList.map((item) => item.name);
        }
        return;
      }

      submitting.value = true;
      const id = currentApplet.value.id;
      appletsStore
        .editApic({ id, apicList: apicList.value })
        .then((res) => {
          if (res.success) {
            appletsStore.getAppletDetail(id);
            emit('submit');
          }
        })
        .finally(() => {
          submitting.value = false;
        });
    }
  };
</script>
