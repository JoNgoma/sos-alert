<!-- src/components/SosTracker.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { Geolocation } from "@capacitor/geolocation";

// --- Variables ---
let watchId: string | number | null = null;
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

// Secousse
let lastX = 0, lastY = 0, lastZ = 0;
const threshold = 15; // sensibilité secousse
let shakeStartTime: number | null = null; // timestamp début secousse
const shakeDurationRequired = 3000; // 3 secondes

// --- Permissions ---
async function requestPermissions() {
  // Vérifie et demande les permissions GPS foreground
  const status = await Geolocation.requestPermissions({
    permissions: ['location']
  });
  console.log("Permissions GPS:", status);

  // Microphone
  if (!navigator.mediaDevices?.getUserMedia) {
    console.warn("getUserMedia non dispo sur ce device");
    return;
  }

  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log("Permission micro accordée");
  } catch (err) {
    console.error("Permission micro refusée:", err);
  }
}

// --- Foreground service Android ---
function startForegroundService() {
  const win: any = window;
  if (win.Capacitor && win.Capacitor.isNative) {
    if (win.cordova?.plugins?.backgroundMode) {
      win.cordova.plugins.backgroundMode.setDefaults({
        title: 'SOS Alert',
        text: 'Suivi GPS actif en arrière-plan',
        silent: false
      });
      win.cordova.plugins.backgroundMode.enable();
      console.log("Foreground service activé !");
    } else {
      console.warn("Foreground service non disponible");
    }
  }
}

// --- Fonctions ---

function handleAcceleration(acceleration: DeviceMotionEventAcceleration | null) {
  if (!acceleration) return;

  const deltaX = Math.abs((acceleration.x ?? 0) - lastX);
  const deltaY = Math.abs((acceleration.y ?? 0) - lastY);
  const deltaZ = Math.abs((acceleration.z ?? 0) - lastZ);

  const delta = deltaX + deltaY + deltaZ;

  const now = Date.now();

  if (delta > threshold) {
    // Début de la secousse
    if (!shakeStartTime) {
      shakeStartTime = now;
    } else {
      // Vérifie si secousse >= 3s
      if (now - shakeStartTime >= shakeDurationRequired) {
        console.log("Secousse continue ≥ 3s → déclenche SOS");
        sendSOS();
        shakeStartTime = null; // reset pour éviter multi-trigger
      }
    }
  } else {
    // Secousse interrompue
    shakeStartTime = null;
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
      if (err || !position) return;
      console.log("GPS:", position.coords.latitude, position.coords.longitude);
      // TODO : envoyer au backend
    }
  );

  // --- Secousse ---
  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", (event: DeviceMotionEvent) => {
      handleAcceleration(event.accelerationIncludingGravity ?? null);
    });
  }
}

function sendSOS() {
  console.log("SOS déclenché !");
  alert("SOS déclenché !");
  startAudioRecording(5000);
}

async function startAudioRecording(duration: number) {
  if (!navigator.mediaDevices?.getUserMedia) {
    console.warn("getUserMedia non disponible");
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

// --- Lifecycle ---
onMounted(async () => {
  await requestPermissions();
  startForegroundService();  // IMPORTANT : Android 10+ foreground service
  startTracking();
});

onBeforeUnmount(() => {
  if (watchId) Geolocation.clearWatch({ id: watchId as string });
  if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
});
</script>

<template>
  <div style="display:none;"></div>
</template>
