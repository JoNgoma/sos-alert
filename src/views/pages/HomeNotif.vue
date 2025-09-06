<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Notifications</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Vos notifications apparaîtront ici 📩</h2>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent } from '@ionic/vue'
</script>
