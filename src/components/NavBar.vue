<template>
  <!-- APP BAR -->
  <v-app-bar app fixed elevation="1" density="comfortable" color="surface" class="navbar-custom">
    <!-- Mobile Menu Icon -->
    <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" />

    <!-- Logo and Brand -->
    <div class="d-flex align-center ga-2 ml-2 ml-md-4 cursor-pointer" @click="scrollToTop">
      <v-img :src="logo" max-height="50" max-width="50" contain class="logo-img" />
      <div class="brand-text d-none d-sm-flex flex-column">
        <span class="text-h6 font-weight-bold primary--text">Fixkaro.ai</span>
        <span class="text-caption text-medium-emphasis" style="line-height: 1; margin-top: -4px;">AI Career Platform</span>
      </div>
    </div>

    <!-- LEFT MENU (Desktop only) -->
    <div class="d-none d-md-flex align-center ml-8">
      <!-- Home -->
      <v-btn class="text-body-2" variant="text" @click="scrollToTop">Home</v-btn>
      
      <!-- Features -->
      <v-btn class="text-body-2" variant="text" @click="scrollToSection('features')">Features</v-btn>

      <!-- Services -->
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="text-body-2"
            variant="text"
            append-icon="mdi-chevron-down"
          >
            Services
          </v-btn>
        </template>
        <v-list density="compact" class="py-2">
          <v-list-item @click="scrollToSection('features')">
            <v-list-item-title class="text-body-2">
              <v-icon size="small" class="mr-2">mdi-robot</v-icon>
              AI Resume Builder
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="scrollToSection('features')">
            <v-list-item-title class="text-body-2">
              <v-icon size="small" class="mr-2">mdi-web</v-icon>
              Portfolio Website
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="scrollToSection('features')">
            <v-list-item-title class="text-body-2">
              <v-icon size="small" class="mr-2">mdi-linkedin</v-icon>
              LinkedIn & Naukri Profiles
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- How It Works -->
      <v-btn class="text-body-2" variant="text" @click="scrollToSection('how-it-works')">How It Works</v-btn>

      <!-- Pricing -->
      <v-btn class="text-body-2" variant="text" @click="scrollToSection('pricing')">Pricing</v-btn>
      
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
          title="Home" 
          prepend-icon="mdi-home"
          @click="scrollToTop(); drawer = false"
        />
        
        <v-list-item 
          title="Features" 
          prepend-icon="mdi-lightning-bolt"
          @click="scrollToSection('features'); drawer = false"
        />
        
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Services"
              prepend-icon="mdi-briefcase"
            />
          </template>
          <v-list-item 
            title="AI Resume Builder" 
            class="pl-8" 
            @click="scrollToSection('features'); drawer = false"
          />
          <v-list-item 
            title="Portfolio Website" 
            class="pl-8" 
            @click="scrollToSection('features'); drawer = false"
          />
          <v-list-item 
            title="Social Profiles" 
            class="pl-8" 
            @click="scrollToSection('features'); drawer = false"
          />
        </v-list-group>

        <v-list-item 
          title="How It Works" 
          prepend-icon="mdi-help-circle"
          @click="scrollToSection('how-it-works'); drawer = false"
        />

        <v-list-item 
          title="Pricing" 
          prepend-icon="mdi-currency-inr"
          @click="scrollToSection('pricing'); drawer = false"
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

// Scroll functions
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Account for fixed navbar
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
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

.cursor-pointer {
  cursor: pointer;
}
</style>
