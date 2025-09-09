<template>
  <ion-page>
     <!-- Header -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/page/notifications"></ion-back-button>
        </ion-buttons>
        <ion-title>Detail de l'alerte</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card v-if="alert">
        <ion-card-header>
          <ion-card-title>{{ alert.name }}</ion-card-title>
          <p>Status : <strong>{{ alert.status }}</strong></p>
          <p>Date : {{ alert.date }}</p>
        </ion-card-header>

        <ion-card-content>
          <!-- Message texte -->
          <div v-if="alert.type === 'text'">{{ alert.message }}</div>

          <!-- Audio -->
          <div v-else-if="alert.type === 'audio'" class="notif-audio">
            <button @click="toggleAudio" class="audio-btn">
              <ion-icon :icon="alert.playing ? 'pause' : 'play'"></ion-icon>
            </button>
            <div class="audio-track">
              <div class="audio-progress" :style="{ width: alert.progress + '%' }"></div>
            </div>
            <span class="audio-time">{{ alert.time }}</span>
          </div>

          <!-- Localisation -->
          <div class="location-section">
            <p>📍 Localisation : {{ alert.lat }}, {{ alert.lng }}</p>
            <div id="map" v-show="alert.lat && alert.lng"></div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,  
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon
} from '@ionic/vue'

// ✅ on reçoit id en props
const props = defineProps<{ id: string }>()

// Exemple : récupérer les données depuis une liste locale ou API
const allAlerts = [
  { id:1, status: "Danger", name: "Divine Kangala", type: "text", message: "Je suis en danger...", date: "07/09/2025 14:32", lat: "-4.4113206", lng: "15.3014224" },
  { id:2, status: "Épargné", name: "Grady Mbele", type: "text", message: "Je suis en sécurité.", date: "07/09/2025 12:15", lat: "-4.4153206", lng: "15.3062939" },
  { id:3, status: "Danger", name: "John Malumba", type: "audio", audioUrl: "audio1.mp3", time: "00:45", progress: 40, playing: false, date: "06/09/2025 19:22", lat: "-4.113206", lng: "15.2682939" },
  { id:4, status: "Épargné", name: "Merdi Mfutu", type: "text", message: "Tout va bien.", date: "06/09/2025 09:10", lat: "-4.4113206", lng: "15.2662939" },
];

const alert = ref<any>(allAlerts.find(a => a.id === Number(props.id)) || null)

let map: L.Map | null = null
let marker: L.Marker | null = null

// Initialisation carte
const initMap = () => {
  if (alert.value && alert.value.lat && alert.value.lng) {
    const lat = parseFloat(alert.value.lat)
    const lng = parseFloat(alert.value.lng)
    setTimeout(() => {
      if (!map) {
        map = L.map('map').setView([lat, lng], 15)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)
        marker = L.marker([lat, lng]).addTo(map)
      } else {
        marker!.setLatLng([lat, lng])
        map.setView([lat, lng], 15)
      }
    }, 200)
  }
}

function toggleAudio() {
  if (alert.value && alert.value.type === 'audio') {
    alert.value.playing = !alert.value.playing
  }
}

onMounted(() => {
  initMap()
})
</script>


<style scoped>
.audio-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #3b82f6;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
.audio-track {
  flex: 1;
  height: 6px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
}
.audio-progress {
  height: 6px;
  background: #3b82f6;
}
.audio-time {
  font-size: 0.75rem;
  color: var(--ion-text-color-step-400);
}
.location-section {
  margin-top: 16px;
}
#map {
  height: 250px;
  width: 100%;
  margin-top: 8px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
