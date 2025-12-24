<template>
  <div class="task-filter q-mb-lg">
    <div class="row items-center q-gutter-md">
      <div class="col-auto">
        <q-select
          v-model="selectedFilter"
          :options="filterOptions"
          label="Filter tasks"
          outlined
          dense
          emit-value
          map-options
          option-label="label"
          option-value="value"
          class="filter-dropdown"
          style="min-width: 200px"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="scope.opt.badge">
                <q-badge :color="scope.opt.badgeColor">
                  {{ scope.opt.badge }}
                </q-badge>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useTaskStore } from 'src/stores/task-store';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const taskStore = useTaskStore();

const filterOptions = ref([
  {
    label: 'All Tasks',
    value: 'all',
    badge: taskStore.allTasksCount,
    badgeColor: 'grey',
  },
  {
    label: 'Pending Tasks',
    value: 'pending',
    badge: taskStore.pendingTasksCount,
    badgeColor: 'warning',
  },
  {
    label: 'Completed Tasks',
    value: 'completed',
    badge: taskStore.completedTasksCount,
    badgeColor: 'positive',
  },
]);

const selectedFilter = ref('all');

onMounted(() => {
  const path = route.path;
  if (path.includes('/pending')) {
    selectedFilter.value = 'pending';
  } else if (path.includes('/completed')) {
    selectedFilter.value = 'completed';
  } else {
    selectedFilter.value = 'all';
  }
});

watch(
  () => route.path,
  (newPath) => {
    if (newPath.includes('/pending')) {
      selectedFilter.value = 'pending';
    } else if (newPath.includes('/completed')) {
      selectedFilter.value = 'completed';
    } else {
      selectedFilter.value = 'all';
    }
  },
);

watch(
  () => [taskStore.allTasksCount, taskStore.pendingTasksCount, taskStore.completedTasksCount],
  () => {
    if (filterOptions.value[0]) {
      filterOptions.value[0].badge = taskStore.allTasksCount;
    }
    if (filterOptions.value[1]) {
      filterOptions.value[1].badge = taskStore.pendingTasksCount;
    }
    if (filterOptions.value[2]) {
      filterOptions.value[2].badge = taskStore.completedTasksCount;
    }
  },
);

watch(selectedFilter, async (newFilter) => {
  const target = newFilter === 'all' ? '/all' : `/${newFilter}`;
  if (route.path !== target) {
    await router.push(target);
  }
});
</script>

<style scoped lang="scss">
.task-filter {
  .filter-dropdown {
    .q-field__control {
      border-radius: 8px;
    }
  }
  .q-badge {
    font-size: 0.9em;
    padding: 4px 8px;
  }
}
</style>
