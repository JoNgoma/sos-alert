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
      <!-- Logo / Titre en haut -->
      <div class="branding">
        <img src="/assets/logo.png" alt="Logo" class="logo"/>
        <h1 class="page-title">SOS-ALERTE</h1>
      </div>
      <p class="page-subtitle">Accédez rapidement à vos actions principales</p>

      <div class="cards-container">
        <ion-card class="action-card gradient-blue" @click="goTo('signalLocation')">
          <img src="/assets/location.svg" class="card-icon" />
          <ion-card-header>
            <ion-card-title>Alerte encours</ion-card-title>
          </ion-card-header>
        </ion-card>

        <ion-card class="action-card gradient-orange" @click="goTo('signalProblem')">
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

.branding {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 3rem;
  height: auto;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--ion-color-primary);
  text-align: center;
}
.page-subtitle {
  font-size: 1rem;
  color: var(--ion-text-color-secondary, #666);
  margin-bottom: 1rem;
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
