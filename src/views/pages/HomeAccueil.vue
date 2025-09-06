<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Accueil</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1 class="page-title">SOS-ALERTE</h1>
      <p class="page-subtitle">Accédez rapidement à vos actions principales</p>

      <div class="cards-container">
        <ion-card class="action-card gradient-blue" @click="goTo('location')">
          <img src="/assets/location.svg" class="card-icon" />
          <ion-card-header>
            <ion-card-title>Partager ma localisation</ion-card-title>
          </ion-card-header>
        </ion-card>

        <ion-card class="action-card gradient-orange" @click="goTo('report')">
          <img src="/assets/problem.svg" class="card-icon" />
          <ion-card-header>
            <ion-card-title>Signaler un problème</ion-card-title>
          </ion-card-header>
        </ion-card>

        <ion-card class="action-card gradient-red" @click="goTo('sos')">
          <img src="/assets/sos.svg" class="card-icon" />
          <ion-card-header>
            <ion-card-title>SOS urgence</ion-card-title>
          </ion-card-header>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonMenuButton, IonContent, IonCard, IonCardHeader, IonCardTitle
} from '@ionic/vue'

const router = useRouter()
const goTo = (routeName: string) => {
  router.push({ name: routeName })
}
</script>

<style scoped>
/* mêmes styles que tu avais déjà pour les cards */
.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 1rem;
  color: var(--ion-color-primary);
  text-align: center;
}
.page-subtitle {
  font-size: 1rem;
  color: var(--ion-text-color-secondary, #666);
  margin-bottom: 2rem;
  text-align: center;
}
.cards-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  margin: auto;
}
.action-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card-icon {
  width: 60px;
  height: 60px;
  margin-right: 16px;
}
.gradient-blue { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
.gradient-orange { background: linear-gradient(135deg, #f6d365, #fda085); color: white; }
.gradient-red { background: linear-gradient(135deg, #f85032, #e73827); color: white; }
</style>
