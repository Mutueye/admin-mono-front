<!-- 编辑应用配置表单 -->
<template>
  <el-form ref="formRef" :model="formData" label-width="130px" label-position="left">
    <!-- hosts -->
    <el-form-item
      v-for="(item, index) in formData.hostList"
      :key="'host.' + index"
      :label="index === 0 ? 'hosts' : ''"
      :prop="'hostList.' + index + '.host'"
      :rules="formRules.hosts">
      <div class="flex flex-row w-full items-center justify-between">
        <el-input v-model="item.host" class="flex-1" />
        <el-button
          v-if="formData.hostList.length > 1"
          text
          bg
          class="w-component-size ml-spacing-xxs"
          @click.prevent="removeHost(index)">
          <i class="i-mdi-close text-size-16px" />
        </el-button>
      </div>
    </el-form-item>
    <el-form-item label="">
      <el-button class="w-full" @click="addHosts">
        <i class="i-mdi-plus text-size-16px mr-spacing-xxxs" />
        <span>添加</span>
      </el-button>
    </el-form-item>

    <!-- 访问令牌超时时间 -->
    <el-form-item label="访问令牌超时时间">
      <!-- TODO 使用el-input-number -->
      <el-input v-model="formData.accessTokenTimeData.value">
        <template #append>
          <el-select v-model="formData.accessTokenTimeData.unit" value-key="value" class="w-120px">
            <el-option v-for="item in timeUnits" :key="item.value" :value="item" :label="item.title" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>

    <!-- 刷新令牌超时时间 -->
    <el-form-item label="刷新令牌超时时间">
      <!-- TODO 使用el-input-number -->
      <el-input v-model="formData.refreshTokenTimeData.value">
        <template #append>
          <el-select v-model="formData.refreshTokenTimeData.unit" value-key="value" class="w-120px">
            <el-option v-for="item in timeUnits" :key="item.value" :value="item" :label="item.title" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>

    <!-- 有效期 -->
    <el-form-item prop="expireType" label="有效期">
      <el-radio-group v-model="formData.expireType">
        <el-radio label="永久有效" />
        <el-radio label="选择有效期" />
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="formData.expireType === '选择有效期'" prop="expireAt">
      <el-date-picker
        ref="datePicker"
        v-model="formData.expireAt"
        class="flex flex-1 w-full"
        type="date"
        value-format="x"
        placeholder="选择有效期" />
    </el-form-item>

    <!-- 状态：启用/禁用 -->
    <el-form-item prop="enabled" label="状态">
      <el-radio-group v-model="formData.enabled">
        <el-radio :label="true">启用</el-radio>
        <el-radio :label="false">禁用</el-radio>
      </el-radio-group>
    </el-form-item>

    <!-- 数据同步 -->
    <el-form-item prop="bulletinType" label="数据同步">
      <el-radio-group v-model="formData.bulletinType">
        <el-radio label="关闭数据同步" />
        <el-radio label="事件回调模式" />
      </el-radio-group>
    </el-form-item>
    <div
      v-if="formData.bulletinType === '事件回调模式'"
      class="ml-130px px-18px pt-18px bg-bg-page -mt-12px mb-18px flex flex-col">
      <!-- URI -->
      <el-form-item prop="bulletinMetadata.uri" label="URI" :label-width="subLabelWidth" :rules="formRules.uri">
        <el-input v-model="formData.bulletinMetadata.uri" />
      </el-form-item>
      <!-- Token -->
      <el-form-item prop="bulletinMetadata.token" label="token" :label-width="subLabelWidth" :rules="formRules.token">
        <el-input v-model="formData.bulletinMetadata.token" />
      </el-form-item>
      <!-- 订阅事件 -->
      <el-form-item
        prop="bulletinMetadata.events"
        label="订阅事件"
        :label-width="subLabelWidth"
        :rules="formRules.types">
        <el-checkbox-group v-model="formData.bulletinMetadata.events">
          <el-checkbox v-for="item in eventTypeList" :key="item.name" :label="item.name">{{ item.title }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 数据签名：开启/关闭 -->
      <el-form-item prop="bulletinMetaData.signatureEnabled" label="数据签名" :label-width="subLabelWidth">
        <el-radio-group v-model="formData.bulletinMetadata.signatureEnabled">
          <el-radio :label="false">关闭</el-radio>
          <el-radio :label="true">开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <div
        v-if="formData.bulletinMetadata.signatureEnabled"
        class="px-18px pt-18px -mt-12px bg-bg-secondary flex flex-col border-border border-1px rounded-base mb-18px"
        :style="{ marginLeft: subLabelWidth }">
        <!-- 签名算法 -->
        <el-form-item
          prop="bulletinMetadata.signatureAlgorithm"
          label="签名算法"
          :label-width="subLabelWidth"
          :rules="formRules.signatureAlgorithm">
          <el-select
            v-model="formData.bulletinMetadata.signatureAlgorithm"
            value-key="name"
            class="w-full"
            placeholder="请选择签名算法">
            <el-option v-for="item in signatureAlgorithmList" :key="item.name" :value="item.name" :label="item.title" />
          </el-select>
        </el-form-item>
        <!-- 签名钥匙 -->
        <el-form-item
          prop="bulletinMetadata.signatureKey"
          label="签名钥匙"
          :label-width="subLabelWidth"
          :rules="formRules.signatureKey">
          <el-input v-model="formData.bulletinMetadata.signatureKey" placeholder="请输入签名钥匙" />
        </el-form-item>
        <div class="flex flex-row items-center mb-18px">
          <el-checkbox v-model="formData.bulletinMetadata.signingTimestamp">签名时间戳</el-checkbox>
          <el-checkbox v-model="formData.bulletinMetadata.signingNonce">签名随机数</el-checkbox>
        </div>
      </div>
      <!-- 数据加密：开启/关闭 -->
      <el-form-item prop="bulletinMetaData.encryptEnabled" label="数据加密" :label-width="subLabelWidth">
        <el-radio-group v-model="formData.bulletinMetadata.encryptEnabled">
          <el-radio :label="false">关闭</el-radio>
          <el-radio :label="true">开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <div
        v-if="formData.bulletinMetadata.encryptEnabled"
        class="px-18px pt-18px -mt-12px bg-bg-secondary flex flex-col border-border border-1px rounded-base mb-18px"
        :style="{ marginLeft: subLabelWidth }">
        <!-- 加密算法 -->
        <el-form-item
          prop="bulletinMetadata.encryptAlgorithm"
          label="加密算法"
          :label-width="subLabelWidth"
          :rules="formRules.encryptAlgorithm">
          <el-select
            v-model="formData.bulletinMetadata.encryptAlgorithm"
            value-key="name"
            class="w-full"
            placeholder="请选择加密算法">
            <el-option v-for="item in encryptAlgorithmList" :key="item.name" :value="item.name" :label="item.title" />
          </el-select>
        </el-form-item>
        <!-- 加密钥匙 -->
        <el-form-item
          prop="bulletinMetadata.encryptKey"
          label="加密钥匙"
          :label-width="subLabelWidth"
          :rules="formRules.encryptKey">
          <el-input v-model="formData.bulletinMetadata.encryptKey" placeholder="请输入加密钥匙" />
        </el-form-item>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="w-full flex flex-row justify-end">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :loading="formState.submitting" @click="submit">保存</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
  import { reactive, ref, toRefs, onMounted } from 'vue';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { globalFormRules, byteLengthValidator } from '@qst-admin/utils';
  import { AppletData } from '../../types';
  import { useAppletsStore } from '../../store/applets';
  import { useEnumsStore, type EnumList } from '@/store/enums';
  import { timeUnits, translateTime, translateTimeReverse, type TimeWithUnit } from '../../utils';

  const enumsStore = useEnumsStore();
  const appletsStore = useAppletsStore();

  const subLabelWidth = '80px';

  interface AppletFormData extends AppletData {
    /** host列表数据 */
    hostList: { host: string }[];
    /** 访问令牌超时时间数据，已转换带单位 */
    accessTokenTimeData: TimeWithUnit;
    /** 刷新令牌超时时间数据，已转换带单位 */
    refreshTokenTimeData: TimeWithUnit;
    /** 是否设置了有效期 */
    expireType: '永久有效' | '选择有效期';
    /** 数据同步类型 */
    bulletinType: '关闭数据同步' | '事件回调模式';
  }

  /** 转换host列表 */
  const resolveHostList = (hosts: string[]) => {
    return hosts.map((host) => ({ host }));
  };

  /** 订阅事件枚举列表 */
  const eventTypeList = ref<EnumList>([]);
  /** 签名算法枚举列表 */
  const signatureAlgorithmList = ref<EnumList>([]);
  /** 加密算法枚举列表 */
  const encryptAlgorithmList = ref<EnumList>([]);

  /** 转换超时时间数据 */
  const resolveTimeout = (s: number | undefined): TimeWithUnit => {
    if (s) {
      return translateTime(s);
    } else {
      return {
        value: '',
        unit: {
          value: 'minute',
          title: '分钟',
        },
      };
    }
  };

  const resolveAppletFormData = (data: AppletData): AppletFormData => ({
    ...appletData.value,
    hostList: resolveHostList(data.hosts),
    accessTokenTimeData: resolveTimeout(data.accessTokenTimeout),
    refreshTokenTimeData: resolveTimeout(data.refreshTokenTimeout),
    expireType: data.expireAt ? '选择有效期' : '永久有效',
    bulletinType: data.bulletinEnabled ? '事件回调模式' : '关闭数据同步',
    bulletinMetadata: Object.assign({}, data.bulletinMetadata),
  });

  const props = defineProps<{ appletData: AppletData }>();
  const { appletData } = toRefs(props);

  /** 表单ref */
  const formRef = ref<FormInstance>();
  /** 表单数据 */
  const formData = reactive<AppletFormData>(resolveAppletFormData(appletData.value));
  /** 表单验证规则 */
  const formRules = reactive<FormRules>({
    name: globalFormRules.appletName,
    hosts: globalFormRules.hosts,
    uri: globalFormRules.uri,
    token: [
      { required: true, message: '请输入token', trigger: 'blur' },
      {
        // 限制字节长度1000
        validator: (rule: unknown, value: string, callback: (err?: string | Error | undefined) => void) => {
          byteLengthValidator({
            value,
            callback,
            minByteLength: 0,
            maxByteLength: 1000,
            message: '最大长度为 1000 个字符',
          });
        },
        trigger: 'blur',
      },
    ],
    types: [
      {
        type: 'array',
        required: true,
        message: '请至少选择一个订阅事件',
        trigger: 'change',
      },
    ],
    signatureAlgorithm: [{ required: true, message: '请选择签名算法', trigger: 'change' }],
    signatureKey: [{ required: true, message: '请输入签名钥匙', trigger: 'blur' }],
    encryptAlgorithm: [{ required: true, message: '请选择加密算法', trigger: 'change' }],
    encryptKey: [{ required: true, message: '请输入加密钥匙', trigger: 'blur' }],
  });
  /** 表单状态 */
  const formState = reactive<{ submitting: boolean }>({
    /** 是否提交中 */
    submitting: false,
  });

  // const emit = defineEmits(['cancel', 'submit']);
  const emit = defineEmits<{
    (e: 'cancel'): void;
    (e: 'submit'): void;
  }>();

  onMounted(() => {
    enumsStore.getEnums('event_type').then((res) => {
      if (res.data) eventTypeList.value = res.data;
    });
    enumsStore.getEnums('bulletin_signature_algorithm').then((res) => {
      if (res.data) signatureAlgorithmList.value = res.data;
    });
    enumsStore.getEnums('bulletin_encrypt_algorithm').then((res) => {
      if (res.data) encryptAlgorithmList.value = res.data;
    });
  });

  /** 添加一个host */
  const addHosts = () => {
    formData.hostList = [...formData.hostList, { host: '' }];
  };

  /** 删除一个host */
  const removeHost = (index: number) => {
    formData.hostList.splice(index, 1);
  };

  /** 清除表单验证状态 */
  const clearValidate = () => {
    if (formRef.value) {
      formRef.value.clearValidate();
    }
  };

  /** 重置表单数据 */
  const resetFormData = (data?: AppletData) => {
    Object.assign(formData, resolveAppletFormData(data ? data : appletData.value));
  };

  const resetForm = (data?: AppletData) => {
    clearValidate();
    resetFormData(data);
  };

  const cancel = () => {
    resetForm();
    emit('cancel');
  };

  const submit = () => {
    if (!formRef.value) return;
    console.log('formData::::', formData);
    formRef.value.validate((valid) => {
      if (valid) {
        console.log('form valid::::::');
        formData.hosts = formData.hostList.map((item) => item.host);
        formData.accessTokenTimeout = translateTimeReverse(formData.accessTokenTimeData);
        formData.refreshTokenTimeout = translateTimeReverse(formData.refreshTokenTimeData);
        if (formData.expireType === '永久有效') formData.expireAt = undefined;

        formState.submitting = true;
        appletsStore
          .reviseApplet(formData)
          .then((res) => {
            if (res.success) {
              emit('submit');
              resetForm();
              ElMessage.success('修改成功!');
              appletsStore.getAppletDetail(formData.id);
            }
          })
          .finally(() => {
            formState.submitting = false;
          });
      }
    });
  };

  defineExpose({ resetForm });
</script>
