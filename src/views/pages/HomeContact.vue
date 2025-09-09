<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>Contacts</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding contacts-page">

  <!-- Profil du propriétaire (fixe) -->
  <div class="profile-card sticky-header">
    <img src="/assets/avatar/avatar-owner.png" alt="Josué Ngoma" class="avatar" />
    <div class="profile-info">
      <h2>Josué Ngoma</h2>
      <p class="phone">📞 +243 898 464 570</p>
      <p class="email">✉️ josuengoma26@gmail.com</p>
    </div>
  </div>

  <!-- Liste des contacts (scrollable) -->
  <ion-list class="contacts-list">
    <ion-item 
      v-for="contact in contacts" 
      :key="contact.phone"
      button
      @click="openChat(contact)"
    >
      <ion-avatar slot="start">
        <img :src="contact.avatar" :alt="contact.name" />
      </ion-avatar>
      <ion-label>
        <h2>{{ contact.name }}</h2>
        <p>{{ contact.phone }}</p>
      </ion-label>
    </ion-item>
  </ion-list>

</ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
} from '@ionic/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const contacts = [
  { id:1, avatar: '/assets/avatar/avatar1.png', name: 'Caleb Ngoma', phone: '+243 812 345 678' },
  { id:2, avatar: '/assets/avatar/avatar2.png', name: 'Diva Kangala', phone: '+243 811 721 417' },
  { id:3, avatar: '/assets/avatar/avatar3.png', name: 'Grady Mbele', phone: '+243 991 555 666' },
  { id:4, avatar: '/assets/avatar/avatar4.png', name: 'John Malumba', phone: '+243 822 999 000' },
  { id:5, avatar: '/assets/avatar/avatar5.png', name: 'Maman', phone: '+243 895 402 223' },
  { id:6, avatar: '/assets/avatar/avatar1.png', name: 'Caleb Ngoma', phone: '+243 812 345 678' },
  { id:7, avatar: '/assets/avatar/avatar2.png', name: 'Diva Kangala', phone: '+243 811 721 417' },
  { id:8, avatar: '/assets/avatar/avatar3.png', name: 'Grady Mbele', phone: '+243 991 555 666' },
  { id:9, avatar: '/assets/avatar/avatar4.png', name: 'John Malumba', phone: '+243 822 999 000' },
  { id:10, avatar: '/assets/avatar/avatar5.png', name: 'Maman', phone: '+243 895 402 223' },
]

function openChat(contact: any) {
  router.push({
    name: 'contactChat',
    params: { id: contact.id }
  })
}
</script>

<style scoped>
/* Profil fixe en haut */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--ion-color-light);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

/* Scroll uniquement sur la liste des contacts */
.contacts-list {
  max-height: calc(100vh - 16.5rem); /* hauteur totale moins la carte profil + padding */
  overflow-y: auto;
}

/* Profil et contacts existants */
.profile-card {
  display: flex;
  align-items: center;
}
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}
.profile-info h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}
.profile-info .phone,
.profile-info .email {
  margin: 2px 0;
  font-size: 0.9rem;
  color: var(--ion-color-medium);
}

/* Liste contacts */
ion-item {
  border-radius: 12px;
  margin-bottom: 8px;
  --background: var(--ion-color-light);
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
ion-item h2 {
  font-size: 1rem;
  font-weight: 500;
}
ion-item p {
  font-size: 0.85rem;
  color: var(--ion-color-medium);
}
</style>
