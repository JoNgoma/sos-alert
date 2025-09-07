<template>
  <ion-page>
    <ion-content class="ion-padding ion-text-center">

      <!-- Logo / Titre en haut -->
      <div class="branding">
        <img src="/assets/logo.png" alt="Logo" class="logo"/>
        <h1 class="title">SOS-ALERTE</h1>
      </div>

      <!-- Illustration ou visuel -->
      <div class="hero" @click="goTo('home')" style="cursor: pointer;">
        <img src="/assets/illustration.svg" alt="Visuel accueil" />
      </div>

      <!-- Boutons d'action -->
      <div class="actions">
        <ion-button expand="block" color="primary" @click="goTo('login')">
          Se connecter
        </ion-button>
        <ion-button expand="block" color="secondary" @click="goTo('signUp')">
          Créer un compte
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { IonPage, IonContent, IonButton } from '@ionic/vue'

const router = useRouter()
const goTo = (routeName) => {
  router.push({ name: routeName })
}
</script>

<style scoped>
/* Utilisation des variables de thème Ionic */
ion-content {
  --background: var(--ion-background-color);
  --color: var(--ion-text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Branding */
.branding {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 3rem;
  height: auto;
}
.title {
  font-size: 1.4rem;
  margin-top: 0.2rem;
  color: var(--ion-color-primary);
}

/* Illustration */
.hero {
  margin: 40px 0;
}
.hero img {
  max-width: 100%;
  height: auto;
}

/* Boutons d'action */
.actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
ion-button {
  --color: #fff;
  font-weight: 600;
}
</style>
