<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/page/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Alerte encours</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="notifications">
      <div class="notif-list">
        <div v-for="(notif, index) in notifications" :key="index" class="notif-card">
          <div class="notif-header">
            <span :class="['notif-status', notif.status === 'Danger' ? 'danger' : 'safe']">
              {{ notif.status }}
            </span>
            <span class="notif-date">{{ notif.date }}</span>
          </div>

          <h3 class="notif-name">{{ notif.name }}</h3>

          <div v-if="notif.type === 'text'" class="notif-message">
            {{ truncateMessage(notif.message) }}
          </div>

          <div v-else-if="notif.type === 'audio'" class="notif-audio">
            <button @click="toggleAudio(index)" class="audio-btn">
              <ion-icon :icon="notif.playing ? 'pause' : 'play'"></ion-icon>
            </button>
            <div class="audio-track">
              <div class="audio-progress" :style="{ width: notif.progress + '%' }"></div>
            </div>
            <span class="audio-time">{{ notif.time }}</span>
          </div>

          <div class="notif-actions">
            <ion-button 
              expand="block" 
              fill="clear" 
              class="see-more"
              @click="toggleStatus(index)"
            >
              {{ notif.status === 'Danger' ? 'Suspendre l\'alerte' : 'Réactiver l\'alerte' }}
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,  
  IonContent,
  IonIcon
} from '@ionic/vue'

interface Notification {
  id: number;
  status: "Danger" | "Épargné";
  name: string;
  type: "text" | "audio";
  message?: string;
  audioUrl?: string;
  time?: string;
  progress?: number;
  playing?: boolean;
  date: string;
  lat: string;
  lng: string;
}

// ✅ Mettre notifications dans un ref()
const notifications = ref<Notification[]>([
  { id:1, status: "Danger", name: "Divine Kangala", type: "text", message: "Je suis en danger...", date: "07/09/2025 14:32", lat: "-4.4113206", lng: "15.3014224" },
  { id:2, status: "Épargné", name: "Grady Mbele", type: "text", message: "Je suis en sécurité.", date: "07/09/2025 12:15", lat: "-4.4153206", lng: "15.9062939" },
  { id:3, status: "Danger", name: "John Malumba", type: "audio", audioUrl: "audio1.mp3", time: "00:45", progress: 40, playing: false, date: "06/09/2025 19:22", lat: "-4.4113206", lng: "15.2682939" },
  { id:4, status: "Épargné", name: "Merdi Mfutu", type: "text", message: "Tout va bien.", date: "06/09/2025 09:10", lat: "-4.4113206", lng: "15.2662939" },
])

// ✅ Toggle devient réactif
function toggleStatus(index: number) {
  const notif = notifications.value[index]
  notif.status = notif.status === "Danger" ? "Épargné" : "Danger"
}

function truncateMessage(msg?: string): string {
  if (!msg) return "";
  return msg.length > 85 ? msg.substring(0, 85) + "..." : msg;
}

function toggleAudio(index: number) {
  const notif = notifications.value[index]
  if (notif.type === "audio") notif.playing = !notif.playing
}
</script>

<style scoped>
/* Greeting */
.greeting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}
.greeting h2 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ion-text-color); /* adapte au thème clair/sombre */
}
.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--ion-color-primary); /* adapte au thème */
}

/* Content */
.notifications {
  background: var(--ion-background-color); /* adapte au thème */
}
.notif-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 16px;
  margin-top: 1rem;
}

/* Card */
.notif-card {
  background: var(--ion-card-background, white); /* support dark mode */
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.notif-status {
  font-size: 0.8rem;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 12px;
}
.notif-status.danger {
  background: #fee2e2;
  color: #dc2626;
}
.notif-status.safe {
  background: #d1fae5;
  color: #059669;
}
.notif-date {
  font-size: 0.7rem;
  color: #6b7280;
}
.notif-name {
  margin-top: 8px;
  font-size: 1rem;
  font-weight: 600;
}
.notif-message {
  margin-top: 8px;
  font-size: 0.9rem;
  color: var(--ion-text-color-step-400, #374151);
}

/* Audio */
.notif-audio {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.audio-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
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
  position: relative;
}
.audio-progress {
  height: 6px;
  background: #3b82f6;
}
.audio-time {
  font-size: 0.7rem;
  color: #6b7280;
}

/* Action */
.notif-actions {
  margin-top: 12px;
}
.see-more {
  --color: #2563eb;
  font-weight: 600;
}
</style>
