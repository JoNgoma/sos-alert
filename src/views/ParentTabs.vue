<template>
  <!-- Menu -->
  <ion-menu side="end" content-id="tabs">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu SOS-Alerte</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button @click="goTo('profil')">Profil</ion-item>
        <ion-item button @click="goTo('settings')">Paramètres</ion-item>
        <ion-item button @click="goTo('about')">À propos</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>

  <!-- Tabs -->
  <ion-tabs id="tabs">
    <ion-router-outlet></ion-router-outlet>

    <!-- Barre d’onglets -->
    <ion-tab-bar slot="bottom">
      <ion-tab-button
        tab="home"
        href="/home"
        :selected="currentRoute === '/home'"
      >
        <ion-icon :icon="home" />
        <ion-label>Accueil</ion-label>
      </ion-tab-button>

      <ion-tab-button
        tab="notifications"
        href="/home/notifications"
        :selected="currentRoute === '/home/notifications'"
      >
        <ion-icon :icon="notifications" />
        <ion-label>Notifications</ion-label>
      </ion-tab-button>

      <ion-tab-button
        tab="contact"
        href="/home/contact"
        :selected="currentRoute === '/home/contact'"
      >
        <ion-icon :icon="call" />
        <ion-label>Contact</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  IonMenu, IonHeader, IonToolbar, IonTitle, IonItem, IonList,
  IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon, IonRouterOutlet
} from '@ionic/vue'
import { home, notifications, call } from 'ionicons/icons'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.path)
const router = useRouter()
const goTo = (routeName: string) => {
  router.push({ name: routeName })
}
</script>

<style scoped>
/* Met l’onglet actif en bleu */
ion-tab-button.tab-selected {
  --color: #007bff;   /* texte et icône actifs */
  --color-selected: #007bff;
}

ion-tab-button {
  --color: var(--ion-text-color, #666); /* couleur par défaut */
}
</style>
