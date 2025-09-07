<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/page/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Partager ma localisation</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding">

      <!-- Intro -->
      <div class="intro">
        <h2>📍 Partage rapide</h2>
        <p>Sélectionnez un ou plusieurs proches et envoyez directement votre position.</p>
      </div>

      <!-- Sélection des contacts -->
      <ion-card class="form-card">
        <ion-card-header>
          <ion-card-title>👥 Choisir les contacts</ion-card-title>
        </ion-card-header>
        <ion-list>
          <ion-item v-for="contact in contacts" :key="contact.phone">
            <ion-avatar slot="start">
              <img :src="contact.avatar" :alt="contact.name" />
            </ion-avatar>
            <ion-label>
              <h2>{{ contact.name }}</h2>
              <p>{{ contact.phone }}</p>
            </ion-label>
            <ion-checkbox slot="end" v-model="contact.selected"></ion-checkbox>
          </ion-item>
        </ion-list>
      </ion-card>

      <!-- Localisation -->
      <ion-card class="form-card">
        <ion-card-header>
          <ion-card-title>📍 Localisation</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button expand="block" color="secondary" @click="insertLocation">
            <ion-icon name="location-outline" slot="start"></ion-icon>
            Ajouter ma position
          </ion-button>
          <p v-if="location" class="location-text">Position : {{ location }}</p>
        </ion-card-content>
      </ion-card>

      <!-- Bouton Envoyer -->
      <div class="actions">
        <ion-button expand="block" class="send-btn" @click="shareLocation">
          🚀 Envoyer ma localisation
        </ion-button>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonBackButton, IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonList, IonItem, IonAvatar, IonLabel,
  IonCheckbox, IonButton, IonIcon
} from '@ionic/vue'
import { ref } from 'vue'

const contacts = ref([
  { avatar: '/assets/avatar/avatar2.png', name: 'Divine Kangala', phone: '+243 811 721 417', selected: false },
  { avatar: '/assets/avatar/avatar5.png', name: 'Maman', phone: '+243 895 402 223', selected: false },
  { avatar: '/assets/avatar/avatar4.png', name: 'John Malumba', phone: '+243 822 999 000', selected: false },
])

const location = ref<string | null>(null)

const insertLocation = () => {
  // Exemple fictif (plugin Capacitor conseillé)
  location.value = 'Kinshasa, RD Congo'
}

const shareLocation = () => {
  const selectedContacts = contacts.value.filter(c => c.selected)
  console.log('Localisation partagée :', {
    contacts: selectedContacts,
    location: location.value,
  })
  alert('✅ Localisation envoyée avec succès !')
}
</script>

<style scoped>
.intro {
  text-align: center;
  margin-bottom: 1.5rem;
}
.intro h2 {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--ion-color-primary);
}
.intro p {
  font-size: 0.95rem;
  color: var(--ion-color-medium);
}

/* Cartes */
.form-card {
  margin-bottom: 1.2rem;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* Localisation */
.location-text {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--ion-color-medium);
}

/* Bouton */
.actions {
  margin-top: 2rem;
}
.send-btn {
  --background: linear-gradient(135deg, #36d1dc, #5b86e5);
  --color: #fff;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}
</style>
