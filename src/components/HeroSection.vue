<template>
  <section class="hero-section">
    <v-container>
      <v-row align="center" class="min-height-screen">
        <v-col cols="12" md="6" class="text-center text-md-left">
          <v-chip
            color="primary"
            variant="outlined"
            size="small"
            class="mb-4"
            data-aos="fade-down"
          >
            <v-icon start size="small">mdi-lightning-bolt</v-icon>
            500+ Careers Transformed | 95% Success Rate
          </v-chip>

          <h1 
            class="text-h3 text-md-h2 font-weight-bold mb-4"
            data-aos="fade-up"
          >
            Transform Your Resume Into a
            <span class="text-gradient"> Job-Ready Portfolio </span>
            in Minutes
          </h1>

          <p 
            class="text-h6 text-md-h5 mb-6 text-medium-emphasis"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            AI-powered career platform that converts your resume into ATS-optimized resumes, stunning portfolio websites, and compelling LinkedIn/Naukri profiles - all in under 5 minutes.
          </p>

          <div 
            class="d-flex flex-column flex-sm-row ga-4 justify-center justify-md-start mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <v-btn
              color="primary"
              size="x-large"
              elevation="8"
              class="px-8"
              prepend-icon="mdi-rocket-launch"
            >
              Get Started - Upload Resume
            </v-btn>
            <v-btn
              variant="outlined"
              size="x-large"
              class="px-8"
              prepend-icon="mdi-play-circle"
            >
              See How It Works
            </v-btn>
          </div>

          <div 
            class="d-flex flex-wrap ga-6 justify-center justify-md-start"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div class="stat-item">
              <v-icon color="success" size="small">mdi-check-circle</v-icon>
              <span class="ml-2 text-subtitle-2">Under 5 min processing</span>
            </div>
            <div class="stat-item">
              <v-icon color="success" size="small">mdi-check-circle</v-icon>
              <span class="ml-2 text-subtitle-2">PDF & DOC supported</span>
            </div>
            <div class="stat-item">
              <v-icon color="success" size="small">mdi-check-circle</v-icon>
              <span class="ml-2 text-subtitle-2">Free revisions included</span>
            </div>
          </div>
        </v-col>

        <v-col 
          cols="12" 
          md="6" 
          class="d-flex justify-center"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <div class="hero-image-container">
            <v-img
              src="../assets/fixkaro–ai-powered-resume-to-portfolio-platform-template.avif"
              class="hero-image rounded-xl"
              cover
            />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Animated Background -->
    <div class="hero-background"></div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic'
  })
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  padding: 80px 0;
  overflow: hidden;
}

.min-height-screen {
  min-height: 80vh;
}

.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-image-container {
  position: relative;
  max-width: 600px;
  width: 100%;
}

.hero-image {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.hero-image:hover {
  transform: scale(1.02);
}

.stat-item {
  display: flex;
  align-items: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
  z-index: -1;
  pointer-events: none;
}

@media (max-width: 960px) {
  .hero-section {
    padding: 60px 0;
  }
  
  .min-height-screen {
    min-height: auto;
  }
}
</style>