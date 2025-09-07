<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Signaler un problème</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding">

      <!-- Intro -->
      <div class="intro">
        <h2>🚨 Décrivez votre problème</h2>
        <p>Sélectionnez les destinataires, ajoutez votre localisation et précisez le motif.</p>
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

      <!-- Motif du problème -->
      <ion-card class="form-card">
        <ion-card-header>
          <ion-card-title>📝 Motif</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-textarea
            placeholder="Décrivez le problème..."
            v-model="reason"
            auto-grow
          ></ion-textarea>
        </ion-card-content>
      </ion-card>

      <!-- Bouton Envoyer -->
      <div class="actions">
        <ion-button expand="block" class="send-btn" @click="submitReport">
          🚀 Signaler maintenant
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
  IonCheckbox, IonButton, IonIcon, IonTextarea
} from '@ionic/vue'
import { ref } from 'vue'

const contacts = ref([
  { avatar: '/assets/avatar/avatar2.png', name: 'Divine Kangala', phone: '+243 811 721 417', selected: false },
  { avatar: '/assets/avatar/avatar5.png', name: 'Maman', phone: '+243 895 402 223', selected: false },
  { avatar: '/assets/avatar/avatar4.png', name: 'John Malumba', phone: '+243 822 999 000', selected: false },
])

const location = ref<string | null>(null)
const reason = ref<string>('')

const insertLocation = () => {
  // Exemple fictif (à remplacer par plugin géolocalisation Capacitor)
  location.value = 'Kinshasa, RD Congo'
}

const submitReport = () => {
  const selectedContacts = contacts.value.filter(c => c.selected)
  console.log('Signalement envoyé :', {
    contacts: selectedContacts,
    location: location.value,
    reason: reason.value,
  })
  alert('✅ Signalement envoyé avec succès !')
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

/* Cartes du formulaire */
.form-card {
  margin-bottom: 1.2rem;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* Texte localisation */
.location-text {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--ion-color-medium);
}

/* Bouton envoyer */
.actions {
  margin-top: 2rem;
}
.send-btn {
  --background: linear-gradient(135deg, #667eea, #764ba2);
  --color: #fff;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}
</style>
