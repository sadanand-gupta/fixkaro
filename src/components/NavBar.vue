<template>
  <!-- APP BAR -->
  <v-app-bar app fixed elevation="1" density="comfortable" color="surface" class="navbar-custom">
    <!-- Mobile Menu Icon -->
    <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" />

    <!-- Logo and Brand -->
    <div class="d-flex align-center ga-2 ml-2 ml-md-4">
      <v-img :src="logo" max-height="50" max-width="50" contain class="logo-img" />
      <div class="brand-text d-none d-sm-flex flex-column">
        <span class="text-h6 font-weight-bold primary--text">Fixkaro.ai</span>
        <span class="text-caption text-medium-emphasis" style="line-height: 1; margin-top: -4px;">AI Career Platform</span>
      </div>
    </div>

    <!-- LEFT MENU (Desktop only) -->
    <div class="d-none d-md-flex align-center ml-8">
      <!-- Features -->
      <v-btn class="text-body-2" variant="text" href="#features">Features</v-btn>

      <!-- Resume Services -->
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="text-body-2"
            variant="text"
            append-icon="mdi-chevron-down"
          >
            Resume
          </v-btn>
        </template>
        <v-list density="compact" class="py-2">
          <v-list-item>
            <v-list-item-title class="text-body-2">
              <v-icon size="small" class="mr-2">mdi-robot</v-icon>
              AI Resume Builder
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-body-2">
              <v-icon size="small" class="mr-2">mdi-check-circle</v-icon>
              ATS Resume Check
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-body-2">
              <v-icon size="small" class="mr-2">mdi-file-document</v-icon>
              Resume Examples
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Portfolio -->
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="text-body-2"
            variant="text"
            append-icon="mdi-chevron-down"
          >
            Portfolio
          </v-btn>
        </template>
        <v-list density="compact" class="py-2">
          <v-list-item>
            <v-list-item-title class="text-body-2">
              <v-icon size="small" class="mr-2">mdi-web</v-icon>
              Website Builder
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-body-2">
              <v-icon size="small" class="mr-2">mdi-palette</v-icon>
              Theme Gallery
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-body-2">
              <v-icon size="small" class="mr-2">mdi-eye</v-icon>
              Portfolio Examples
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Pricing -->
      <v-btn class="text-body-2" variant="text" href="#pricing">Pricing</v-btn>
      
      <!-- Contact -->
      <v-btn class="text-body-2" variant="text" href="/contact.html">Contact</v-btn>
    </div>

    <v-spacer />

    <!-- RIGHT ACTIONS (Desktop only) -->
    <div class="d-none d-md-flex align-center ga-2 mr-4">
      <!-- Logged out: show Sign In button -->
      <template v-if="!user && !loading">
        <v-btn
          variant="outlined"
          class="text-body-2 google-signin-btn"
          @click="signInWithGoogle"
        >
          <v-img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" max-width="18" max-height="18" class="mr-2" />
          Sign in with Google
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          class="text-body-2 px-6"
          elevation="2"
          @click="signInWithGoogle"
        >
          <v-icon start>mdi-rocket-launch</v-icon>
          Get Started
        </v-btn>
      </template>

      <!-- Logged in: show user avatar + name with profile dialog -->
      <template v-if="user">
        <UserProfile>
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="text" class="user-menu-btn pa-1">
              <v-avatar size="32" class="mr-2">
                <v-img v-if="user.photoURL" :src="user.photoURL" :alt="displayName" />
                <span v-else class="text-body-2 font-weight-bold">{{ displayName.charAt(0).toUpperCase() }}</span>
              </v-avatar>
              <span class="text-body-2 font-weight-medium">{{ displayName }}</span>
              <v-icon end size="small">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
        </UserProfile>
      </template>
    </div>
  </v-app-bar>

  <!-- MOBILE DRAWER -->
  <v-navigation-drawer v-model="drawer" temporary location="left" class="mobile-drawer">
    <div class="pa-4">
      <div class="d-flex align-center ga-2 mb-6">
        <v-img :src="logo" max-height="40" max-width="40" contain />
        <div>
          <div class="text-h6 font-weight-bold">Fixkaro.ai</div>
          <div class="text-caption text-medium-emphasis">AI Career Platform</div>
        </div>
      </div>

      <v-divider class="mb-4" />

      <v-list nav density="comfortable">
        <v-list-item 
          title="Features" 
          prepend-icon="mdi-lightning-bolt"
          href="#features"
        />
        
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Resume Services"
              prepend-icon="mdi-file-document"
            />
          </template>
          <v-list-item title="AI Resume Builder" class="pl-8" />
          <v-list-item title="ATS Check" class="pl-8" />
          <v-list-item title="Examples" class="pl-8" />
        </v-list-group>

        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Portfolio"
              prepend-icon="mdi-web"
            />
          </template>
          <v-list-item title="Website Builder" class="pl-8" />
          <v-list-item title="Theme Gallery" class="pl-8" />
          <v-list-item title="Examples" class="pl-8" />
        </v-list-group>

        <v-list-item 
          title="Pricing" 
          prepend-icon="mdi-currency-inr"
          href="#pricing"
        />
        
        <v-list-item 
          title="Contact" 
          prepend-icon="mdi-email"
          href="/contact.html"
        />
      </v-list>

      <v-divider class="my-4" />

      <div class="px-4">
        <!-- Mobile: logged out -->
        <template v-if="!user && !loading">
          <v-btn variant="outlined" block class="mb-3 google-signin-btn" @click="signInWithGoogle">
            <v-img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" max-width="18" max-height="18" class="mr-2" />
            Sign in with Google
          </v-btn>
          <v-btn color="primary" variant="elevated" block @click="signInWithGoogle">
            <v-icon start>mdi-rocket-launch</v-icon>
            Get Started
          </v-btn>
        </template>

        <!-- Mobile: logged in -->
        <template v-if="user">
          <UserProfile>
            <template #activator="{ props }">
              <div v-bind="props" class="d-flex align-center ga-3 mb-4 pa-2 rounded-lg bg-grey-lighten-4 cursor-pointer">
                <v-avatar size="36">
                  <v-img v-if="user.photoURL" :src="user.photoURL" :alt="displayName" />
                  <span v-else class="text-body-2 font-weight-bold">{{ displayName.charAt(0).toUpperCase() }}</span>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-body-2 font-weight-medium">{{ displayName }}</div>
                  <div class="text-caption text-medium-emphasis">{{ user.email }}</div>
                </div>
                <v-icon size="small">mdi-chevron-right</v-icon>
              </div>
            </template>
          </UserProfile>
        </template>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import logo from "../assets/logohai2.png";
import { useAuth } from "../composables/useAuth";
import UserProfile from "./UserProfile.vue";

const drawer = ref(false);
const { user, loading, displayName, signInWithGoogle, signOutUser } = useAuth();
</script>

<style scoped>
.navbar-custom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.logo-img {
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
}

.brand-text {
  user-select: none;
}

.mobile-drawer {
  max-width: 300px;
}

.google-signin-btn {
  border-color: rgba(0, 0, 0, 0.2);
  text-transform: none;
}

.user-menu-btn {
  text-transform: none;
  border-radius: 24px;
}
</style>
