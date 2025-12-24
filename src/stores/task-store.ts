import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  createdAt: Date;
}

export const useTaskStore = defineStore('task', () => {
  const $q = useQuasar();
  const tasks = ref<Task[]>([]);

  // load tasks from localStorage
  const loadTasks = () => {
    const savedTasks = $q.localStorage.getItem('tasks');
    if (savedTasks) {
      tasks.value = JSON.parse(savedTasks as any).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
    }
  };

  // save tasks to localStorage
  const saveTasks = () => {
    $q.localStorage.set('tasks', JSON.stringify(tasks.value));
  };

  // add a new task
  const addTask = (name: string) => {
    if (!name.trim()) {
      return false;
    }

    const newTask: Task = {
      id: Date.now(),
      name: name.trim(),
      completed: false,
      createdAt: new Date()
    };

    tasks.value.push(newTask);
    saveTasks();
    return true;
  };

  // toggle task completion status
  const toggleTask = (id: number) => {
    const task = tasks.value.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
    }
  };

  // delete a task
  const deleteTask = (id: number) => {
    const index = tasks.value.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks.value.splice(index, 1);
      saveTasks();
      $q.notify({
        type: 'info',
        message: 'Task deleted',
        position: 'top'
      });
    }
  };

  // pending tasks count
  const pendingTasksCount = computed(() => {
    return tasks.value.filter(task => !task.completed).length;
  });

  // all tasks count
  const allTasksCount = computed(() => {
    return tasks.value.length;
  });

  // completed tasks count
  const completedTasksCount = computed(() => {
    return tasks.value.filter(task => task.completed).length;
  });

  // clear all completed tasks
  const clearCompleted = () => {
    const initialLength = tasks.value.length;
    tasks.value = tasks.value.filter(task => !task.completed);
    if (tasks.value.length < initialLength) {
      saveTasks();
      $q.notify({
        type: 'positive',
        message: 'Completed tasks cleared',
        position: 'top'
      });
    }
  };

  // initialize by loading tasks
  loadTasks();

  return {
    tasks,
    pendingTasksCount,
    allTasksCount,
    completedTasksCount,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    saveTasks,
    loadTasks
  };
});