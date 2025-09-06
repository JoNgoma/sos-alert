<template>
  <ion-page>
    <ion-content class="ion-padding ion-text-center">

      <!-- Illustration -->
      <div class="hero" @click="goTo('homeFirst')" style="cursor: pointer;">
        <img src="/assets/illustration.svg" alt="Signup Illustration" />
      </div>

      <!-- Titre -->
      <h1 class="title">Créer un compte</h1>
      <p class="subtitle">Rejoignez SOS-ALERTE et restez en sécurité</p>

      <!-- Formulaire -->
      <form @submit.prevent="signup" class="form">
        <ion-input v-model="form.name" placeholder="Nom complet" fill="outline" required></ion-input>
        <ion-input v-model="form.email" type="email" placeholder="Email" fill="outline" required></ion-input>

        <!-- Mot de passe -->
        <div class="password-wrapper">
          <ion-input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Mot de passe" fill="outline" required></ion-input>
          <ion-button fill="clear" size="small" class="toggle" @click="showPassword = !showPassword">
            <ion-icon :icon="showPassword ? eyeOff : eye"></ion-icon>
          </ion-button>
        </div>

        <!-- Confirmation mot de passe -->
        <div class="password-wrapper">
          <ion-input v-model="form.confirmPassword" :type="showConfirm ? 'text' : 'password'" placeholder="Confirmer le mot de passe" fill="outline" required></ion-input>
          <ion-button fill="clear" size="small" class="toggle" @click="showConfirm = !showConfirm">
            <ion-icon :icon="showConfirm ? eyeOff : eye"></ion-icon>
          </ion-button>
        </div>

        <ion-button expand="block" type="submit" class="mt-4">S’inscrire</ion-button>
      </form>

      <!-- Déjà un compte ? -->
      <p class="switch">
        Déjà inscrit ? <a @click.prevent="goTo('login')">Se connecter</a>
      </p>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { IonPage, IonContent, IonButton, IonInput, IonIcon } from '@ionic/vue'
import { eye, eyeOff } from 'ionicons/icons'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirm = ref(false)

const signup = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert("Les mots de passe ne correspondent pas ⚠️")
    return
  }
  console.log('Inscription en cours...', form.value)
}

const goTo = (routeName: string) => {
  router.push({ name: routeName })
}
</script>

<style scoped>
ion-content {
  /* Adaptation automatique au thème clair / sombre */
  --background: var(--ion-background-color);
  --color: var(--ion-text-color);
}

ion-input{
    text-align: start;
}
.hero {
  margin: 2rem 0 1rem;
}
.hero img {
  max-width: 200px;
  height: auto;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: .3rem;
  color: var(--ion-color-primary);
}

.subtitle {
  font-size: .95rem;
  color: var(--ion-text-color-secondary);
  margin-bottom: 1.5rem;
}

/* Formulaire identique à login */
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 1.5rem;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper ion-input {
  flex: 1;
}

.toggle { 
  position: absolute; 
  right: 1px; 
  background: none; 
  border: none; 
  font-size: 1.2rem; 
  cursor: pointer; 
  z-index: 5; 
}
.toggle:focus { outline: none; }

.switch {
  margin-top: 1rem;
  font-size: .9rem;
  color: var(--ion-text-color);
}
.switch a {
  color: var(--ion-color-primary);
  font-weight: 600;
  cursor: pointer;
}
</style>

