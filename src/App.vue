<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

// light theme / dark theme toggle
$q.dark.set(false);
</script>
