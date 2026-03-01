<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <template #activator="{ props }">
      <slot name="activator" :props="props" />
    </template>

    <v-card class="profile-card" rounded="xl">
      <!-- Header with gradient -->
      <div class="profile-header">
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          class="close-btn"
          @click="dialog = false"
        />
        <v-avatar size="100" class="profile-avatar elevation-4">
          <img 
            v-if="userData?.photoURL" 
            :src="userData.photoURL" 
            :alt="userData.displayName"
            referrerpolicy="no-referrer"
            style="width: 100%; height: 100%; object-fit: cover;"
          />
          <span v-else class="text-h4 font-weight-bold text-white">
            {{ userData?.displayName?.charAt(0)?.toUpperCase() || '?' }}
          </span>
        </v-avatar>
        <h2 class="text-h5 font-weight-bold text-white mt-3">{{ userData?.displayName || 'User' }}</h2>
        <p class="text-body-2 text-white-darken-1">{{ userData?.email }}</p>
      </div>

      <!-- Profile Details -->
      <v-card-text class="pa-6">
        <v-skeleton-loader v-if="loading" type="list-item-two-line, list-item-two-line, list-item-two-line" />
        
        <v-list v-else lines="two" class="bg-transparent">
          <v-list-item>
            <template #prepend>
              <v-avatar color="primary" size="40" class="mr-3">
                <v-icon color="white">mdi-identifier</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="text-body-2 text-medium-emphasis">User ID</v-list-item-title>
            <v-list-item-subtitle class="text-body-1 font-weight-medium text-truncate">
              {{ userData?.uid }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-avatar color="secondary" size="40" class="mr-3">
                <v-icon color="white">mdi-email</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="text-body-2 text-medium-emphasis">Email</v-list-item-title>
            <v-list-item-subtitle class="text-body-1 font-weight-medium">
              {{ userData?.email }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-avatar color="success" size="40" class="mr-3">
                <v-icon color="white">mdi-calendar-plus</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="text-body-2 text-medium-emphasis">Account Created</v-list-item-title>
            <v-list-item-subtitle class="text-body-1 font-weight-medium">
              {{ formatDate(userData?.createdAt) }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-avatar color="info" size="40" class="mr-3">
                <v-icon color="white">mdi-clock-outline</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="text-body-2 text-medium-emphasis">Last Login</v-list-item-title>
            <v-list-item-subtitle class="text-body-1 font-weight-medium">
              {{ formatDate(userData?.lastLoginAt) }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions class="pa-4 pt-0">
        <v-btn
          color="error"
          variant="tonal"
          block
          @click="handleSignOut"
        >
          <v-icon start>mdi-logout</v-icon>
          Sign Out
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useAuth } from '../composables/useAuth'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const dialog = ref(false)
const firestoreData = ref(null)
const loading = ref(false)

const { user, signOutUser } = useAuth()

// Combine Firebase Auth data with Firestore data
const userData = computed(() => {
  if (!user.value) return null
  
  // Base data from Firebase Auth
  const authData = {
    uid: user.value.uid,
    email: user.value.email,
    displayName: user.value.displayName || 'User',
    photoURL: user.value.photoURL,
    createdAt: user.value.metadata?.creationTime ? new Date(user.value.metadata.creationTime) : null,
    lastLoginAt: user.value.metadata?.lastSignInTime ? new Date(user.value.metadata.lastSignInTime) : null,
  }
  
  // Merge with Firestore data if available
  if (firestoreData.value) {
    return { ...authData, ...firestoreData.value }
  }
  
  return authData
})

// Fetch additional data from Firestore when dialog opens
watch(dialog, async (isOpen) => {
  if (isOpen && user.value && !firestoreData.value) {
    loading.value = true
    try {
      const userRef = doc(db, 'users', user.value.uid)
      const userSnap = await getDoc(userRef)
      if (userSnap.exists()) {
        firestoreData.value = userSnap.data()
      }
    } catch (error) {
      console.error('Error fetching user data from Firestore:', error)
    } finally {
      loading.value = false
    }
  }
})

function formatDate(timestamp) {
  if (!timestamp) return 'N/A'
  // Firestore Timestamp has toDate() method
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function handleSignOut() {
  await signOutUser()
  dialog.value = false
}
</script>

<style scoped>
.profile-card {
  overflow: hidden;
}

.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 24px 24px;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  color: white;
}

.profile-avatar {
  border: 4px solid white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.text-white-darken-1 {
  color: rgba(255, 255, 255, 0.8);
}
</style>
