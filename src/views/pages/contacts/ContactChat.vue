<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/page/notifications"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ alert?.name }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Chat Content -->
    <ion-content class="chat-content">
      <div class="messages-container">
        <div 
          v-for="(msg, index) in messages" 
          :key="index" 
          :class="['message-bubble', msg.from === 'me' ? 'me' : 'other']"
        >
          <p>{{ msg.text }}</p>
          <span class="msg-time">{{ msg.time }}</span>
        </div>
      </div>
    </ion-content>

    <!-- Input fixe en bas -->
    <div class="chat-footer">
      <ion-textarea
        placeholder="Écrire un message..."
        v-model="newMessage"
        :rows="1"
        class="chat-input"
        auto-grow
      ></ion-textarea>
      <ion-button class="send-btn" @click="sendMessage">
        <ion-icon name="send-outline"></ion-icon>
      </ion-button>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonTextarea, IonButton, IonIcon
} from '@ionic/vue'

const props = defineProps<{ id: string }>()
const allAlerts = [
  {
    id:1,
    avatar: '/assets/avatar/avatar1.png',
    name: 'Caleb Ngoma',
    phone: '+243 812 345 678',
    status: 'Danger',
  },
  {
    id:2,
    avatar: '/assets/avatar/avatar2.png',
    name: 'Diva Kangala',
    phone: '+243 811 721 417',
    status: 'Épargné',
  },
  {
    id:2,
    avatar: '/assets/avatar/avatar3.png',
    name: 'Grady Mbele',
    phone: '+243 991 555 666',
    status: 'Danger',
  },
  {
    id:3,
    avatar: '/assets/avatar/avatar4.png',
    name: 'John Malumba',
    phone: '+243 822 999 000',
    status: 'Épargné',
  },
  {
    id:4,
    avatar: '/assets/avatar/avatar5.png',
    name: 'Maman',
    phone: '+243 895 402 223',
    status: 'Danger',
  },
  {
    id:6,
    avatar: '/assets/avatar/avatar1.png',
    name: 'Caleb Ngoma',
    phone: '+243 812 345 678',
    status: 'Danger',
  },
  {
    id:7,
    avatar: '/assets/avatar/avatar2.png',
    name: 'Diva Kangala',
    phone: '+243 811 721 417',
    status: 'Épargné',
  },
  {
    id:8,
    avatar: '/assets/avatar/avatar3.png',
    name: 'Grady Mbele',
    phone: '+243 991 555 666',
    status: 'Danger',
  },
  {
    id:9,
    avatar: '/assets/avatar/avatar4.png',
    name: 'John Malumba',
    phone: '+243 822 999 000',
    status: 'Épargné',
  },
  {
    id:10,
    avatar: '/assets/avatar/avatar5.png',
    name: 'Maman',
    phone: '+243 895 402 223',
    status: 'Danger',
  },
]
const alert = ref(allAlerts.find(a => a.id === Number(props.id)) || null)

// Messages simulés
const messages = ref([
  { from: 'other', text: 'Salut ! As-tu reçu l’alerte ?', time: '14:30' },
  { from: 'me', text: 'Oui, je suis en route.', time: '14:32' },
  { from: 'other', text: 'Fais attention !', time: '14:33' },
])

const newMessage = ref('')

const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  messages.value.push({ from: 'me', text: newMessage.value, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) })
  newMessage.value = ''
  await nextTick()
  scrollToBottom()
}

// Scroll automatique vers le bas
const scrollToBottom = () => {
  const container = document.querySelector('.messages-container')
  if (container) container.scrollTop = container.scrollHeight
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-content {
  --padding-bottom: 70px; /* espace pour input fixe */
  padding: 0 16px;
}

.messages-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 16px;
  margin: 0 1rem;
}

.message-bubble {
  max-width: 75%;
  padding: .1rem 1rem;
  border-radius: 20px;
  position: relative;
  word-break: break-word;
  font-size: 0.9rem;
  line-height: 1.2rem;
}

/* Messages de l’utilisateur */
.message-bubble.me {
  background: #3b82f6;
  color: #fff;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

/* Messages de l’autre personne */
.message-bubble.other {
  background: #e5e7eb;
  color: #111;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.msg-time {
  display: block;
  font-size: 0.7rem;
  color: #292f3c;
  margin-top: 4px;
  text-align: right;
}

/* Footer fixe avec textarea */
.chat-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  gap: 8px;
  padding: 8px 16px;
  background: var(--ion-background-color);
  align-items: flex-end;
  box-shadow: 0 -2px 6px rgba(0,0,0,0.1);
  z-index: 999;
}

.chat-input {
  flex: 1;
  border-radius: 20px;
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  max-height: 80px;
  overflow-y: auto;
  resize: none;

  /* Couleur de fond adaptée au thème */
  background: var(--ion-background-color);
  color: var(--ion-text-color-step-500, #111);
}

/* Placeholder visible en sombre */
.chat-input::placeholder {
  color: var(--ion-color-medium);
}


.send-btn {
  --background: #3b82f6;
  --color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
