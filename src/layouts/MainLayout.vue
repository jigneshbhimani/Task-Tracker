<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title > Task Tracker </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm">
          <q-btn flat round dense icon="home" :to="{ name: 'home' }" />
          <q-btn flat round dense icon="info" @click="showAbout = true" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showAbout">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">About Task Tracker</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>A simple task management application built with:</p>
          <ul>
            <li>Vue 3 + Composition API</li>
            <li>TypeScript</li>
            <li>Quasar Framework</li>
            <li>Pinia State Management</li>
          </ul>
          <p>Features: Add, complete, delete, and filter tasks with localStorage persistence.</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showAbout = ref(false);
</script>
