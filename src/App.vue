<script setup>
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import Features from './components/Features.vue'
import ThemePreview from './components/ThemePreview.vue'
import FooterUtils from './components/FooterUtils.vue'
import PortfolioView from './components/PortfolioView.vue'

const currentView = ref('landing')
const selectedTheme = ref('')

onMounted(() => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
})
</script>

<template>
  <v-app>
    <NavBar />
    <v-main>
      <HeroSection />
      <div id="features">
        <Features />
      </div>
      <!-- <ThemePreview /> -->
    </v-main>
    <FooterUtils />
  </v-app>
</template>

<style>
/* App-specific global styles */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.v-main {
  flex: 1;
}

/* Smooth scrolling enhancement */
html {
  scroll-padding-top: 80px; /* Account for fixed navbar */
}

/* Ensure responsiveness */
@media (max-width: 960px) {
  html {
    scroll-padding-top: 60px;
  }
}
</style>
