<template>
  <div class="w-full flex flex-col mt-spacing">
    <table class="admin-flat-table">
      <tr>
        <td colspan="4" class="admin-flat-table__cell bg-bg-secondary">
          <div class="w-full flex flex-row justify-between items-center">
            <div class="text-size-medium font-semibold color-text-primary">应用配置</div>
            <el-button size="small" type="primary">
              <div class="flex flex-row items-center">
                <i class="i-mdi-edit mr-spacing-xxs" />
                <span>修改应用配置</span>
              </div>
            </el-button>
          </div>
        </td>
      </tr>
      <tr>
        <td class="admin-flat-table__cell header w-160px">hosts</td>
        <td colspan="3" class="admin-flat-table__cell">
          <div class="flex flex-row flex-wrap items-center justify-start -mr-8px -mb-8px">
            <div
              v-for="item in appletData.hosts"
              :key="item"
              class="py-spacing-xxxs px-spacing-xxs mr-8px mb-8px bg-bg-secondary rounded-large">
              {{ item }}
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="admin-flat-table__cell header w-160px">访问令牌超时时间</td>
        <td class="admin-flat-table__cell">{{ accessTokenTimeoutStr }}</td>
        <td class="admin-flat-table__cell header w-160px">刷新令牌超时时间</td>
        <td class="admin-flat-table__cell">{{ refreshTokenTimeoutStr }}</td>
      </tr>
      <tr>
        <td class="admin-flat-table__cell header w-160px">有效期</td>
        <td class="admin-flat-table__cell">
          {{ appletData.expireAt ? formatDate(appletData.expireAt, 'YYYY-MM-DD') : '永久有效' }}
        </td>
        <td class="admin-flat-table__cell header w-160px">状态</td>
        <td class="admin-flat-table__cell">{{ appletData.enabled ? '启用' : '禁用' }}</td>
      </tr>
      <tr v-if="appletData.bulletinEnabled && appletData.bulletinMetadata">
        <td colspan="4" class="admin-flat-table__cell">
          <div class="flex flex-col w-full">
            <div class="color-text-primary mb-spacing-xxs">数据同步：{{ appletData.bulletinModeTitle }}模式</div>
            <table class="admin-flat-table">
              <tr>
                <td class="admin-flat-table__cell header w-120px">URI</td>
                <td class="admin-flat-table__cell">
                  {{ appletData.bulletinMetadata.uri || '--' }}
                </td>
              </tr>
              <tr>
                <td class="admin-flat-table__cell header w-120px">token</td>
                <td class="admin-flat-table__cell">
                  {{ appletData.bulletinMetadata.token || '--' }}
                </td>
              </tr>
              <tr>
                <td class="admin-flat-table__cell header w-120px">订阅事件</td>
                <td class="admin-flat-table__cell">
                  <div class="flex flex-row flex-wrap items-center justify-start -mr-8px -mb-8px">
                    <div
                      v-for="item in eventNameList"
                      :key="item"
                      class="py-spacing-xxxs px-spacing-xxs mr-8px mb-8px bg-bg-secondary rounded-large">
                      {{ item }}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="admin-flat-table__cell header w-120px">数据签名</td>
                <td class="admin-flat-table__cell">
                  <div v-if="appletData.bulletinMetadata.signatureEnabled" class="bulltin-info-content">
                    <div class="bulltin-info-line">
                      <div class="bulltin-info-label">签名算法：</div>
                      <div class="bulltin-info-content">{{ appletData.bulletinMetadata.signatureAlgorithm }}</div>
                    </div>
                    <div class="bulltin-info-line">
                      <div class="bulltin-info-label">签名密钥：</div>
                      <div class="bulltin-info-content">{{ appletData.bulletinMetadata.signatureKey }}</div>
                    </div>
                    <div class="bulltin-info-line">
                      <div class="bulltin-info-label">签名时间戳：</div>
                      <div class="bulltin-info-content">
                        {{ appletData.bulletinMetadata.signingTimestamp ? '开启' : '关闭' }}
                      </div>
                    </div>
                    <div class="bulltin-info-line">
                      <div class="bulltin-info-label">签名随机数：</div>
                      <div class="bulltin-info-content">
                        {{ appletData.bulletinMetadata.signingNonce ? '开启' : '关闭' }}
                      </div>
                    </div>
                  </div>
                  <span v-else>关闭</span>
                </td>
              </tr>
              <tr>
                <td class="admin-flat-table__cell header w-120px">数据加密</td>
                <td class="admin-flat-table__cell">
                  <div v-if="appletData.bulletinMetadata.encryptEnabled" class="bulltin-info-content">
                    <div class="bulltin-info-line">
                      <div class="bulltin-info-label">加密算法：</div>
                      <div class="bulltin-info-content">{{ appletData.bulletinMetadata.encryptAlgorithm }}</div>
                    </div>
                    <div class="bulltin-info-line">
                      <div class="bulltin-info-label">加密密钥：</div>
                      <div class="bulltin-info-content">{{ appletData.bulletinMetadata.encryptKey }}</div>
                    </div>
                  </div>
                  <span v-else>关闭</span>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr v-else>
        <td class="admin-flat-table__cell header">数据同步</td>
        <td colspan="3" class="admin-flat-table__cell">已关闭</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { toRefs, computed, onMounted, ref } from 'vue';
  import { formatDate } from '@qst-admin/utils';
  import { AppletData } from '../../types';
  import { translateTime } from '../../utils';
  import { useEnumsStore, type EnumList } from '@/store/enums';

  const props = defineProps<{ appletData: AppletData }>();
  const { appletData } = toRefs(props);

  const enumsStore = useEnumsStore();

  const eventTypeList = ref<EnumList>([]);

  const resolveTimeout = (s: number | undefined) => {
    if (s) {
      const obj = translateTime(s);
      return obj.value + obj.unit.title;
    } else {
      return '-';
    }
  };
  const accessTokenTimeoutStr = computed(() => resolveTimeout(appletData.value.accessTokenTimeout));
  const refreshTokenTimeoutStr = computed(() => resolveTimeout(appletData.value.refreshTokenTimeout));

  onMounted(() => {
    enumsStore.getEnums('event_type').then((res) => {
      if (res.data) eventTypeList.value = res.data;
    });
  });

  const eventNameList = computed(() => {
    if (
      eventTypeList.value &&
      eventTypeList.value.length > 0 &&
      appletData.value.bulletinMetadata &&
      appletData.value.bulletinMetadata.events.length > 0
    ) {
      const list: string[] = [];
      appletData.value.bulletinMetadata.events.forEach((item) => {
        const target = eventTypeList.value.find((evt) => evt.name === item);
        if (target) {
          list.push(target.title);
        }
      });
      return list;
    } else {
      return [];
    }
  });
</script>

<style lang="scss">
  .admin-flat-table {
    @apply border-t-1px border-l-1px border-border w-full border-separate color-text-primary;
    td {
      @apply border-r-1px border-b-1px border-border vertical-middle;
      &.admin-flat-table__cell {
        @apply p-spacing-xs;
        &.header {
          @apply bg-bg-page font-semibold;
        }
      }
    }
  }
  .bulltin-info-content {
    @apply w-full flex flex-col -mb-8px;
    .bulltin-info-line {
      @apply w-full flex flex-row items-start mb-8px color-text-primary;
      .bulltin-info-label {
        @apply font-semibold w-90px color-text-regular;
      }
      .bulltin-info-content {
        @apply flex-1 break-all;
      }
    }
  }
</style>
