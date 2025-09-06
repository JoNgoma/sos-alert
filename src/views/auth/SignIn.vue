<template>
  <ion-page>
    <ion-content class="ion-padding ion-text-center">

      <!-- Illustration -->
      <div class="hero">
        <img src="/assets/illustration.svg" alt="Login Illustration" />
      </div>

      <!-- Titre -->
      <h1 class="title">Se connecter</h1>
      <p class="subtitle">Accédez à votre compte SOS-ALERTE</p>

      <!-- Formulaire -->
      <form @submit.prevent="login" class="form">

        <ion-input
          v-model="form.email"
          type="email"
          placeholder="Email"
          fill="outline"
          required
        ></ion-input>

        <!-- Mot de passe -->
        <div class="password-wrapper">
          <ion-input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Mot de passe"
            fill="outline"
            required
          ></ion-input>
          <ion-button
            fill="clear"
            size="small"
            class="toggle"
            @click="showPassword = !showPassword"
          >
            <ion-icon :icon="showPassword ? eyeOff : eye"></ion-icon>
          </ion-button>
        </div>

        <ion-button expand="block" type="submit" class="mt-4">
          Connexion
        </ion-button>
      </form>

      <!-- Pas encore de compte ? -->
      <p class="switch">
        Pas encore de compte ?
        <a @click.prevent="goTo('signUp')">Créer un compte</a>
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
  email: '',
  password: ''
})

const showPassword = ref(false)

const login = () => {
  if (!form.value.email || !form.value.password) {
    alert("Veuillez entrer vos identifiants ⚠️")
    return
  }
  console.log('Connexion en cours...', form.value)
}

const goTo = (routeName: string) => {
  router.push({ name: routeName })
}
</script>

<style scoped>
ion-content {
  /* Utiliser les variables d'Ionic pour s'adapter au thème */
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
  color: var(--ion-color-primary); /* couleur primaire du thème */
}

.subtitle {
  font-size: .95rem;
  color: var(--ion-text-color-secondary); /* couleur secondaire adaptée au thème */
  margin-bottom: 1.5rem;
}

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
