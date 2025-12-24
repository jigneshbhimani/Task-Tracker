<template>
  <div class="task-list">
    <div v-if="filteredTasks?.length === 0" class="text-center q-pa-xl">
      <q-icon :name="emptyStateIcon" size="xl" color="grey" class="q-mb-sm" />
      <div class="text-grey">{{ emptyStateMessage }}</div>
    </div>

    <q-list bordered separator class="rounded-borders" v-else>
      <q-item
        v-for="task in filteredTasks"
        :key="task.id"
        :class="{ 'task-completed': task.completed }"
        class="q-my-xs"
      >
        <q-item-section avatar>
          <q-checkbox
            :model-value="task.completed"
            @update:model-value="() => taskStore.toggleTask(task.id)"
            color="primary"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{ 'text-strike text-grey': task.completed }">
            {{ task.name }}
          </q-item-label>
          <q-item-label caption>
            Added: {{ formatDate(task.createdAt) }}
            <q-badge
              v-if="showStatusBadge"
              :color="task.completed ? 'positive' : 'warning'"
              class="q-ml-sm"
              style="font-size: 0.7em"
            >
              {{ task.completed ? 'Completed' : 'Pending' }}
            </q-badge>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            flat
            round
            dense
            icon="delete"
            color="negative"
            @click="() => taskStore.deleteTask(task.id)"
            size="sm"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="row justify-end q-mt-md" v-if="taskStore.completedTasksCount > 0">
      <q-btn
        flat
        color="grey"
        label="Clear Completed"
        icon="delete_sweep"
        @click="taskStore.clearCompleted"
        size="sm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTaskStore } from 'src/stores/task-store';
import { formatDate } from 'src/utils/dateFormatter';
import { useRoute } from 'vue-router';

const taskStore = useTaskStore();
const route = useRoute();

const filteredTasks = computed(() => {
  const path = route.path;

  if (path.includes('/pending')) {
    return taskStore.tasks.filter((task: any) => !task.completed);
  } else if (path.includes('/completed')) {
    return taskStore.tasks.filter((task: any) => task.completed);
  }
  return taskStore.tasks;
});

const emptyStateMessage = computed(() => {
  const path = route.path;

  if (path.includes('/pending')) {
    return 'No pending tasks';
  } else if (path.includes('/completed')) {
    return 'No completed tasks';
  }
  return 'No tasks yet. Add your first task above!';
});

const emptyStateIcon = computed(() => {
  const path = route.path;

  if (path.includes('/pending')) {
    return 'pending_actions';
  } else if (path.includes('/completed')) {
    return 'check_circle';
  }
  return 'checklist';
});

const showStatusBadge = computed(() => {
  return route.path === '/' || route.path === '/all';
});
</script>

<style scoped lang="scss">
.task-list {
  .task-completed {
    background-color: rgba($positive, 0.05);
    border-radius: 4px;
  }
  .text-strike {
    text-decoration: line-through;
  }
  .q-item {
    border-radius: 8px;
    transition: all 0.3s ease;
    &:hover {
      background-color: rgba($primary, 0.1);
    }
  }
}
</style>
