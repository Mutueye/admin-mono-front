<template>
  <div class="search-form">
    <!-- 日期范围 -->
    <div class="search-form-item flex flex-row items-center flex-1 min-w-230px max-w-500px">
      <el-date-picker
        v-model="formData.dateRange"
        type="daterange"
        unlink-panels
        :clearable="false"
        range-separator="至"
        value-format="YYYY-MM-DD"
        start-placeholder="开始日期"
        end-placeholder="截止日期"
        @change="onRangePicked" />
    </div>
    <!-- TODO fix el-radio-group 边框颜色 -->
    <el-radio-group v-model="quickDateRange" class="search-form-item" @change="onRangeChange">
      <el-radio-button v-for="item in dateRangeList" :key="item.title" :label="item.title" />
    </el-radio-group>

    <!-- 事件ID -->
    <div class="search-form-item flex flex-row items-center flex-1 min-w-200px max-w-500px">
      <el-input
        ref="eventIdInputRef"
        v-model="formData.eventId"
        class="flex-1"
        placeholder="请输入事件id"
        clearable
        @clear="onSubmitEventId"
        @keydown="onInputKeyDown">
        <template #append>
          <el-button @click="onSubmitEventId"><i class="i-solar-magnifer-linear" /></el-button>
        </template>
      </el-input>
    </div>

    <!-- 事件类型 -->
    <el-select
      v-model="formData.eventType"
      class="search-form-item min-w-120px max-w-400px flex-1"
      value-key="name"
      clearable
      placeholder="选择事件类型"
      @change="submitSearch"
      @clear="submitSearch">
      <el-option v-for="item in event_type" :key="item.name" :value="item.name" :label="item.title" />
    </el-select>

    <!-- 事件来源 -->
    <el-select
      v-model="formData.eventSource"
      class="search-form-item min-w-120px max-w-400px flex-1"
      value-key="name"
      clearable
      placeholder="选择事件来源"
      @change="submitSearch"
      @clear="submitSearch">
      <el-option v-for="item in event_source" :key="item.name" :value="item.name" :label="item.title" />
    </el-select>

    <!-- 成功状态 -->
    <el-checkbox-group v-model="successStatus" class="search-form-item" @change="() => submitSearch(false)">
      <el-checkbox-button v-for="item in successStatusList" :key="item.name" :label="item.name">
        {{ `${item.title} (${count[item.name]})` }}
      </el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch, ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { getCurrentDateStr, datePlusDays } from '@qst-admin/utils';
  import { ElInput } from 'element-plus';
  import { useBulletinsStore } from '../../../store/bulletins';
  import { useEnumsStore, type EnumList } from '@/store/enums';
  import type { BulletinsPayload, QuickDateRangeType, SuccessStatusType } from '../../../types';

  const bulletinsStore = useBulletinsStore();
  const enumsStore = useEnumsStore();
  const { event_type, event_source } = storeToRefs(enumsStore);
  const { pagination, count } = storeToRefs(bulletinsStore);

  /** 快捷日期返回列表 */
  const dateRangeList: { title: QuickDateRangeType; range: [string, string] }[] = [
    {
      title: '今日',
      range: [getCurrentDateStr(), getCurrentDateStr()],
    },
    {
      title: '3日内',
      range: [datePlusDays(new Date(), -2), getCurrentDateStr()],
    },
    {
      title: '7日内',
      range: [datePlusDays(new Date(), -6), getCurrentDateStr()],
    },
    {
      title: '30日内',
      range: [datePlusDays(new Date(), -29), getCurrentDateStr()],
    },
  ];

  /** 成功状态列表 */
  const successStatusList: { name: SuccessStatusType; title: string; formKey: string }[] = [
    {
      name: 'success',
      title: '全部成功',
      formKey: 'allSuccess',
    },
    {
      name: 'segment',
      title: '部分成功',
      formKey: 'segmentSuccess',
    },
    {
      name: 'fail',
      title: '全部失败',
      formKey: 'allFail',
    },
  ];

  const formData = reactive<
    Omit<BulletinsPayload, 'pageSize' | 'pageNumber' | 'startTimestamp' | 'endTimestamp'> & {
      /** 日期范围 [YYYY-MM-DD, YYYY-MM-DD] */
      dateRange: [string, string];
    }
  >({
    // startDate: getDateStr('-', new Date(new Date(`${getDateStr()} 00:00:00`).getTime() - 2 * 24 * 60 * 60 * 1000)),
    dateRange: [datePlusDays(new Date(), -2), getCurrentDateStr()],
    eventId: '',
    eventType: '',
    eventSource: '',
    allSuccess: 1,
    segmentSuccess: 1,
    allFail: 1,
  });

  /** 快捷日期范围类型 单选框的值 */
  const quickDateRange = ref<QuickDateRangeType | ''>('');
  /** 暂存的eventId，避免重复查询相同内容 */
  const tempEventId = ref<string>(formData.eventId ? formData.eventId : '');
  /** 成功状态 复选框的值 */
  const successStatus = ref<SuccessStatusType[]>(['success', 'segment', 'fail']);

  onMounted(() => {
    enumsStore.getEnums('event_type');
    enumsStore.getEnums('event_source');
    // 因为默认选定了时间范围，此处直接调用onRangePicked方法加载列表数据
    onRangePicked();
  });

  watch(pagination, (val, oldVal) => {
    if (val.pageNumber !== oldVal.pageNumber || val.pageSize !== oldVal.pageSize) {
      getData(false);
    }
  });

  const onRangeChange = () => {
    if (quickDateRange.value) {
      const targetRange = dateRangeList.find((item) => item.title === quickDateRange.value);
      if (targetRange) {
        formData.dateRange = [...targetRange.range];
      }
      submitSearch();
    }
  };

  const onRangePicked = () => {
    let matched = false;
    dateRangeList.forEach((item) => {
      if (item.range[0] === formData.dateRange[0] && item.range[1] === formData.dateRange[1]) {
        matched = true;
        quickDateRange.value = item.title;
      }
    });
    if (!matched) quickDateRange.value = '';
    submitSearch();
  };

  const onSubmitEventId = () => {
    // 暂存的eventId和提交的不一致，则提交查询
    if (formData.eventId !== tempEventId.value) submitSearch();
  };

  const onInputKeyDown = (evt: KeyboardEvent | Event) => {
    if ((evt as KeyboardEvent).key === 'Enter') {
      onSubmitEventId();
    }
  };

  /** 提交查询 */
  const submitSearch = (getCount = true) => {
    if (pagination.value.pageNumber > 1) {
      // 如果当前页码不为1，因查询条件改变，变更当前页码为1，并通过上面watch pagination出发数据加载
      bulletinsStore.updatePagination({ pageNumber: 1 });
    } else {
      getData(getCount);
    }
  };

  /** 获取数据 */
  const getData = (getCount = true) => {
    const payload: BulletinsPayload = {
      pageNumber: pagination.value.pageNumber,
      pageSize: pagination.value.pageSize,
      startTimestamp: new Date(`${formData.dateRange[0]} 00:00:00`).getTime(),
      endTimestamp: new Date(`${formData.dateRange[1]} 23:59:59`).getTime(),
      allSuccess: successStatus.value.includes('success') ? 1 : 0,
      segmentSuccess: successStatus.value.includes('segment') ? 1 : 0,
      allFail: successStatus.value.includes('fail') ? 1 : 0,
    };
    if (formData.eventId) payload.eventId = formData.eventId;
    if (formData.eventType) payload.eventType = formData.eventType;
    if (formData.eventSource) payload.eventSource = formData.eventSource;

    if (tempEventId.value !== formData.eventId) tempEventId.value = formData.eventId ? formData.eventId : '';

    bulletinsStore.getDataSyncList(payload, getCount);
  };

  defineExpose({ submitSearch });
</script>
