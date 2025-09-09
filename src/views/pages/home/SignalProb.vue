<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/page/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Signaler un problème</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding content-with-footer">

      <!-- Sélection des contacts -->
      <ion-card class="form-card">
        <ion-card-header>
          <ion-card-title>👥 Selectionner les contacts</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="contacts-grid">
            <div 
              v-for="(contact, index) in contacts" 
              :key="index" 
              class="contact-card"
              @click="toggleContact(contact)"
            >
              <div class="avatar-wrapper" :class="{ active: contact.selected }">
                <img :src="contact.avatar" class="avatar" />
                <div class="select-icon" :class="{ selected: contact.selected }">
                  <ion-icon :icon="contact.selected ? 'checkmark' : 'add'"></ion-icon>
                </div>
              </div>
              <p class="contact-name">{{ contact.name }}</p>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Localisation -->
      <ion-card class="form-card">
        <ion-card-header>
          <ion-card-title>📍 Localisation</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p v-if="location" class="location-text">
            Position : {{ location.lat }}, {{ location.lng }}
          </p>
          <div id="map" v-show="location"></div>
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
            :rows="1"
            class="limited-textarea"
          ></ion-textarea>
        </ion-card-content>
      </ion-card>

    </ion-content>

    <!-- Bouton fixe en bas -->
    <div class="fixed-footer">
      <ion-button expand="block" class="send-btn" @click="submitReport">
        🚀 Signaler maintenant
      </ion-button>
    </div>

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonBackButton, IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonButton, IonTextarea, IonIcon
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { Geolocation } from '@capacitor/geolocation'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const contacts = ref([
  { avatar: '/assets/avatar/avatar2.png', name: 'Divine Kangala', phone: '+243 811 721 417', selected: false },
  { avatar: '/assets/avatar/avatar5.png', name: 'Maman', phone: '+243 895 402 223', selected: false },
  { avatar: '/assets/avatar/avatar4.png', name: 'John Malumba', phone: '+243 822 999 000', selected: false },
  { avatar: '/assets/avatar/avatar1.png', name: 'Puissance Kisoka', phone: '+243 822 999 000', selected: false },
  { avatar: '/assets/avatar/avatar3.png', name: 'Merdi Mfutu', phone: '+243 822 999 000', selected: false },
])

function toggleContact(contact: any) {
  contact.selected = !contact.selected
}

const location = ref<{ lat: number; lng: number } | null>(null)
const reason = ref<string>('')

let map: L.Map | null = null
let marker: L.Marker | null = null

const loadLocation = async () => {
  try {
    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
    location.value = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    }

    setTimeout(() => {
      if (!map) {
        map = L.map('map').setView([location.value!.lat, location.value!.lng], 15)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)
        marker = L.marker([location.value!.lat, location.value!.lng]).addTo(map)
      } else {
        if (location.value) {
          marker!.setLatLng([location.value.lat, location.value.lng])
          map.setView([location.value.lat, location.value.lng], 15)
        }
      }
    }, 200)
  } catch (err) {
    console.error('Erreur localisation :', err)
    alert('Impossible de récupérer la position GPS.')
  }
}

onMounted(() => {
  loadLocation()
})

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
/* Cartes du formulaire */
.form-card {
  margin-bottom: 0.5rem;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* Texte localisation */
.location-text {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--ion-color-medium);
}

/* Carte */
#map {
  height: 250px;
  width: 100%;
  margin-top: 1rem;
  border-radius: 10px;
  overflow: hidden;
}

/* Bouton envoyer */
.send-btn {
  --background: linear-gradient(135deg, #667eea, #764ba2);
  --color: #fff;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

/* Footer fixe */
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 16px;
  background: var(--ion-background-color);
  box-shadow: 0 -2px 6px rgba(0,0,0,0.1);
  z-index: 999;
}

/* Padding bottom du content pour ne pas cacher le dernier champ */
.content-with-footer {
  padding-bottom: 80px;
}

/* Carrousel horizontal contacts */
.contacts-grid {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
.contacts-grid::-webkit-scrollbar {
  display: none;
}
.contact-card {
  flex: 0 0 auto;
  text-align: center;
  cursor: pointer;
  position: relative;
}
.avatar-wrapper {
  position: relative;
  display: inline-block;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.avatar-wrapper.active {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 150, 0, 0.25);
  border-radius: 50%;
}
.avatar {
  margin-top: 0.1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--ion-color-primary);
}
.select-icon {
  position: absolute;
  bottom: -0.03rem;
  left: 80%;
  transform: translateX(-50%);
  background: var(--ion-color-light);
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--ion-color-primary);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  transition: background 0.3s ease, color 0.3s ease;
}
.select-icon.selected {
  background: var(--ion-color-success);
  color: #fff;
}
.contact-name {
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.3rem;
}

/* Limite textarea à 3 lignes max avec scroll */
.limited-textarea {
  resize: none;
  max-height: 4.5rem; /* 3 lignes approximatives */
  overflow-y: auto;
}
</style>
