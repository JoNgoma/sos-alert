<!-- src/components/SosTracker.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { Geolocation } from "@capacitor/geolocation";

// --- Variables ---
let watchId: string | number = null;
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

// Secousse
let lastX = 0, lastY = 0, lastZ = 0;
const threshold = 15; // sensibilité secousse

// --- Fonctions ---
function handleAcceleration(acceleration: DeviceMotionEventAcceleration) {
  if (!acceleration) return;

  const deltaX = Math.abs(acceleration.x - lastX);
  const deltaY = Math.abs(acceleration.y - lastY);
  const deltaZ = Math.abs(acceleration.z - lastZ);

  if (deltaX + deltaY + deltaZ > threshold) {
    console.log("Secousse détectée → déclenche SOS");
    sendSOS();
  }

  lastX = acceleration.x ?? 0;
  lastY = acceleration.y ?? 0;
  lastZ = acceleration.z ?? 0;
}

async function startTracking() {
  // --- GPS ---
  watchId = await Geolocation.watchPosition(
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    (position, err) => {
      if (err) return;
      console.log("GPS:", position.coords.latitude, position.coords.longitude);
      // TODO : envoyer au backend en temps réel
    }
  );

  // --- Secousse ---
  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", (event: DeviceMotionEvent) => {
      handleAcceleration(event.accelerationIncludingGravity!);
    });
  }

  // --- Audio (navigateur) ---
  startAudioRecording(5000); // 5 secondes
}

function sendSOS() {
  console.log("SOS déclenché !");
  alert("SOS déclenché !"); // test temporaire

  // --- Audio ---
  startAudioRecording(5000);
  // TODO : envoyer coords + audio au backend
}

async function startAudioRecording(duration: number) {
  if (!navigator.mediaDevices?.getUserMedia) {
    console.warn("getUserMedia non disponible sur ce device");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      console.log("Audio enregistré:", blob);
      // TODO : uploader blob au backend
    };

    mediaRecorder.start();
    setTimeout(() => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
    }, duration);
  } catch (err) {
    console.error("Impossible d'enregistrer l'audio:", err);
  }
}

// --- Background Mode ---
function enableBackgroundMode() {
  if (
    window.cordova?.plugins?.backgroundMode
  ) {
    window.cordova.plugins.backgroundMode.enable();
    console.log("Background Mode activé !");
  } else {
    console.warn("Background Mode non disponible (PWA ou navigateur)");
  }
}

// --- Lifecycle ---
onMounted(() => {
  enableBackgroundMode(); // Active le mode background si possible
  startTracking();        // Démarre GPS + secousse + audio
});

onBeforeUnmount(() => {
  if (watchId) Geolocation.clearWatch({ id: watchId as string });
  if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
});
</script>

<template>
  <!-- Invisible, tracker actif en arrière-plan -->
  <div style="display: none;"></div>
</template>
