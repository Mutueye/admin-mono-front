<template>
  <div class="flex flex-row bg-bg-page p-spacing">{{ data.name }}</div>
</template>

<script lang="ts" setup>
  import { Applet } from '../../types';

  defineProps<{ data: Applet }>();
</script>
