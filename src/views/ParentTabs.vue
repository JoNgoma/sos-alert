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
        <ion-item button @click="goTo('deconnect')">Déconnexion</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>

  <!-- Tabs -->
  <ion-tabs id="tabs">
    <ion-router-outlet></ion-router-outlet>

    <!-- Barre d’onglets -->
    <ion-tab-bar v-if="showTabs" slot="bottom">
      <ion-tab-button
        tab="home"
        href="/page/home"
        :selected="currentRoute === '/page/home'"
      >
        <ion-icon :icon="home" />
        <ion-label>Accueil</ion-label>
      </ion-tab-button>

      <ion-tab-button
        tab="notifications"
        href="/page/notifications"
        :selected="currentRoute === '/page/notifications'"
      >
        <ion-icon :icon="notifications" />
        <ion-label>Notifications</ion-label>
      </ion-tab-button>

      <ion-tab-button
        tab="contacts"
        href="/page/contacts"
        :selected="currentRoute === '/page/contacts'"
      >
        <ion-icon :icon="call" />
        <ion-label>Contacts</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import {
  IonMenu, IonHeader, IonToolbar, IonTitle, IonItem, IonList,
  IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon, IonRouterOutlet
} from '@ionic/vue'
import { home, notifications, call } from 'ionicons/icons'
import { computed } from 'vue'

const route = useRoute()
const currentRoute = computed(() => route.name ?? '')

// Liste des routes où les tabs doivent être masqués
const hiddenTabRoutes = ['signalProblem', 'signalLocation', 'detailAlert']

// Si la route courante est dans la liste → masquer tabs
const showTabs = computed(() => !hiddenTabRoutes.includes(currentRoute.value as string))

const router = useRouter()
const goTo = (routeName: string) => {
  router.push({ name: routeName })
}
</script>

<style scoped>
/* Met l’onglet actif en bleu */
ion-tab-button.tab-selected {
  --color: #007bff;
  --color-selected: #007bff;
}

ion-tab-button {
  --color: var(--ion-text-color, #666);
}
</style>
