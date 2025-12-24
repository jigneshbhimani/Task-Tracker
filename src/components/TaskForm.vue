<template>
  <q-form ref="formRef" @submit.prevent="handleSubmit" class="q-mb-lg">
    <div class="row q-gutter-sm">
      <div class="col-grow">
        <q-input
          ref="inputRef"
          v-model="newTask"
          label="Add new task"
          placeholder="What needs to be done?"
          outlined
          dense
          :rules="[(val) => !!val.trim() || 'Task name is required']"
          class="full-width"
        />
      </div>
      <div class="col-auto">
        <q-btn
          style="height: 65%;"
          type="submit"
          @click="handleSubmit"
          color="primary"
          label="Add Task"
          :disable="!newTask.trim()"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useTaskStore } from 'src/stores/task-store';

const taskStore = useTaskStore();
const newTask = ref('');
const formRef = ref<any>(null);
const inputRef = ref<any>(null);
const handleSubmit = async (e?: Event) => {
  e?.preventDefault?.();
  const added = taskStore.addTask(newTask.value);
  if (added) {
    newTask.value = '';
    formRef.value?.resetValidation?.();
    await nextTick();
    inputRef.value?.focus?.();
  }
};
</script>
