<template>
  <q-page class="q-pa-lg">
    <div class="container">
      <div class="text-center q-mb-lg">
        <h1 class="text-h4 text-weight-bold text-primary q-mb-sm">Task Tracker</h1>
        <p class="text-grey-7">Keep track of your tasks and stay organized</p>
      </div>

      <TaskForm />

      <div class="row items-center justify-between q-mb-md">
        <div class="col-auto">
          <TaskFilter />
        </div>
      </div>

      <TaskList />

      <q-card class="q-mt-lg bg-blue-1">
        <q-card-section>
          <div class="text-h6 text-center">Task Summary</div>
          <div class="row q-mt-md">
            <div class="col-4 text-center">
              <div class="text-h4 text-primary">{{ taskStore.allTasksCount }}</div>
              <div class="text-caption">Total</div>
            </div>
            <div class="col-4 text-center">
              <div class="text-h4 text-positive">{{ taskStore.completedTasksCount }}</div>
              <div class="text-caption">Done</div>
            </div>
            <div class="col-4 text-center">
              <div class="text-h4 text-warning">{{ taskStore.pendingTasksCount }}</div>
              <div class="text-caption">To Do</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TaskForm from 'src/components/TaskForm.vue';
import TaskList from 'src/components/TaskList.vue';
import TaskFilter from 'src/components/TaskFilter.vue';
import { useTaskStore } from 'src/stores/task-store';
const taskStore = useTaskStore();
</script>

<style scoped lang="scss">
.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
