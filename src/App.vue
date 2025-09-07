<template>
  <ion-app>
    <!-- Tracker actif dès le lancement de l'app -->
    <SosTracker />

    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import SosTracker from '@/components/SosTracker.vue'; // import du tracker
</script>
