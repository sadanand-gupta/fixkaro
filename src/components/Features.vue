<script setup>
import resume from "../assets/fixkaro–ai-powered-resume-to-portfolio-platform-template.jpg";
import resume3 from "../assets/fixkaro–ai-powered-resume-to-portfolio-platform-template.avif";
import why from "../assets/why-choose-fixkaro-ai.png";
import ai from "../assets/ai-resume-optimization.png";
import website from "../assets/live-portfolio-website.jpg"
import shortlist from "../assets/shortlist.jpg";
import { ref, onMounted } from "vue";
import AOS from "aos"
import "aos/dist/aos.css"

const model = ref(0);
const slides = [resume, resume3];

const features = [
  {
    icon: 'mdi-robot',
    title: 'AI-Powered Resume Optimization',
    description: 'Upload your resume and let our advanced AI clean, structure, and enhance your content into an ATS-friendly, recruiter-ready format.',
    color: 'primary'
  },
  {
    icon: 'mdi-web',
    title: 'Responsive Portfolio Website',
    description: 'Automatically generate a modern personal portfolio website with sections like About, Skills, Projects, Education, and Contact - fully responsive across all devices.',
    color: 'success'
  },
  {
    icon: 'mdi-linkedin',
    title: 'LinkedIn & Naukri Profile Generator',
    description: 'Generate compelling headlines, about sections, and professional summaries for LinkedIn, Naukri, and other job platforms - optimized for maximum visibility.',
    color: 'info'
  },
  {
    icon: 'mdi-clock-fast',
    title: 'Under 5 Minutes Processing',
    description: 'Get your ATS-optimized resume, portfolio website, and social profiles in less than 5 minutes. No technical skills required.',
    color: 'warning'
  },
  {
    icon: 'mdi-file-check',
    title: 'ATS-Optimized Templates',
    description: 'Our AI ensures your resume passes Applicant Tracking Systems with optimized keywords, formatting, and structure.',
    color: 'deep-purple'
  },
  {
    icon: 'mdi-whatsapp',
    title: 'Dedicated Support',
    description: 'Get expert assistance via email and WhatsApp during our working hours. We\'re here to help you succeed.',
    color: 'teal'
  }
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '₹1,999',
    popular: false,
    description: 'Perfect for job seekers getting started',
    features: [
      'ATS-Optimized Resume',
      'Basic Portfolio Website',
      'LinkedIn Headline & About',
      '2 Revisions (All Services)',
      'Email Support',
      'PDF + Word Downloads',
      '3 Website Sections',
      '1 Portfolio Theme'
    ]
  },
  {
    name: 'Professional',
    price: '₹3,499',
    popular: true,
    description: 'Most popular - Complete career package',
    features: [
      'ATS-Optimized Resume + Cover Letter',
      'Professional Portfolio Website',
      'LinkedIn + Naukri + Indeed Profiles',
      '5 Revisions (All Services)',
      'WhatsApp Support',
      'All File Formats',
      'Custom Domain Name',
      '8 Website Sections',
      '3 Portfolio Themes'
    ],
    savings: 'Save ₹1,500'
  },
  {
    name: 'Ultimate',
    price: '₹4,999',
    popular: false,
    description: 'Premium package with unlimited support',
    features: [
      'ATS-Optimized Resume + Cover Letter',
      'Premium Portfolio Website',
      'All Job Platforms (LinkedIn, Naukri, Indeed, Monster)',
      'Unlimited Revisions (All Services)',
      'Priority WhatsApp Support',
      'All File Formats',
      'Custom Domain + SEO',
      'All Website Sections',
      'Unlimited Themes',
      'Keywords Optimization'
    ],
    savings: 'Save ₹3,000'
  }
];

// Auto slide every 3 seconds
onMounted(() => {
  setInterval(() => {
    model.value = (model.value + 1) % slides.length;
  }, 3000);
  AOS.init({
    duration: 1000,
    once: true,
  })
});
</script>

<template>
  <v-container fluid class="py-16">
    <!-- Main Feature Showcase -->
    <v-row class="align-center mb-16">
      <!-- Left Side: Animated Resume -->
      <v-col cols="12" md="5" class="d-flex justify-center align-center pa-4" data-aos="fade-right">
        <div class="resume-animation-container">
          <v-card class="resume-card" elevation="8">
            <v-window v-model="model" class="h-100" transition="fade-transition">
              <v-window-item v-for="(item, index) in slides" :key="index" :value="index">
                <v-img :src="item" height="100%" cover />
              </v-window-item>
            </v-window>
          </v-card>
        </div>
      </v-col>

      <!-- Right Side: Content -->
      <v-col cols="12" md="7" class="pa-4 pa-md-12" data-aos="fade-left">
        <v-chip color="primary" variant="outlined" size="small" class="mb-4">
          <v-icon start size="small">mdi-star</v-icon>
          Trusted by 500+ Professionals
        </v-chip>

        <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">
          Transform Your Career with
          <span class="text-primary">Fixkaro AI - All-in-One Platform</span>
        </h2>

        <p class="text-h6 mb-6 text-medium-emphasis">
          ATS Resumes, Portfolio Websites, and LinkedIn/Naukri Profiles - All generated from your uploaded resume in minutes.
        </p>

        <!-- Feature List -->
        <v-list class="bg-transparent mb-6" density="comfortable">
          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="success">mdi-check-circle</v-icon>
            </template>
            <v-list-item-title class="font-weight-medium">ATS-Optimized Resumes</v-list-item-title>
            <v-list-item-subtitle>Beat applicant tracking systems with smart formatting</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="success">mdi-check-circle</v-icon>
            </template>
            <v-list-item-title class="font-weight-medium">Portfolio Website Generation</v-list-item-title>
            <v-list-item-subtitle>Beautiful responsive websites in minutes</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="success">mdi-check-circle</v-icon>
            </template>
            <v-list-item-title class="font-weight-medium">LinkedIn & Naukri Profiles</v-list-item-title>
            <v-list-item-subtitle>Compelling headlines and about sections for job platforms</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <!-- Buttons -->
        <div class="d-flex flex-column flex-sm-row ga-3">
          <v-btn color="primary" size="large" variant="flat" prepend-icon="mdi-file-document-edit">
            Build Your Resume
          </v-btn>
          <v-btn variant="outlined" size="large" prepend-icon="mdi-chart-line">
            Get Your Resume Score
          </v-btn>
        </div>

        <!-- Trust Indicators -->
        <div class="d-flex align-center mt-6 ga-4 flex-wrap">
          <v-chip variant="text" size="small">
            <v-icon start>mdi-account-multiple</v-icon>
            500+ Users
          </v-chip>
          <v-chip variant="text" size="small">
            <v-icon start>mdi-star</v-icon>
            95% Success Rate
          </v-chip>
          <v-chip variant="text" size="small">
            <v-icon start>mdi-clock-fast</v-icon>
            Under 5 Min
          </v-chip>
        </div>
      </v-col>
    </v-row>

    <v-divider class="my-16" thickness="2" />

    <!-- Features Grid -->
    <div class="text-center mb-12" data-aos="fade-up">
      <h2 class="text-h3 font-weight-bold mb-4">
        Why Choose <span class="text-primary">Fixkaro.ai</span>
      </h2>
      <p class="text-h6 text-medium-emphasis">
        AI-powered career platform designed for students, professionals, and job seekers
      </p>
    </div>

    <v-row class="mb-16">
      <v-col 
        v-for="(feature, index) in features" 
        :key="index" 
        cols="12" 
        sm="6" 
        md="4"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <v-card class="h-100 pa-6" elevation="2" hover>
          <div class="d-flex flex-column align-center text-center">
            <v-avatar :color="feature.color" size="64" class="mb-4">
              <v-icon size="32" color="white">{{ feature.icon }}</v-icon>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-3">{{ feature.title }}</h3>
            <p class="text-body-2 text-medium-emphasis">{{ feature.description }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-16" thickness="2" />

    <!-- Pricing Section -->
    <div id="pricing" class="text-center mb-12" data-aos="fade-up">
      <h2 class="text-h3 font-weight-bold mb-4">
        Simple & Transparent <span class="text-primary">Pricing</span>
      </h2>
      <p class="text-h6 text-medium-emphasis">
        All-inclusive packages with Resume, Portfolio & Social Profiles - Choose what fits your needs
      </p>
    </div>

    <v-row class="justify-center mb-16">
      <v-col 
        v-for="(plan, index) in pricingPlans" 
        :key="index" 
        cols="12" 
        sm="6" 
        md="4"
        data-aos="zoom-in"
        :data-aos-delay="index * 100"
      >
        <v-card 
          class="h-100 pa-6 position-relative" 
          :elevation="plan.popular ? 16 : 4"
          :color="plan.popular ? 'primary' : 'surface'"
          :class="{ 'featured-plan': plan.popular }"
        >
          <div v-if="plan.popular" class="popular-badge">
            <v-chip color="white" size="small" class="font-weight-bold">
              <v-icon start size="small">mdi-star</v-icon>
              MOST POPULAR
            </v-chip>
          </div>

          <div v-if="plan.savings" class="text-center mb-3">
            <v-chip color="success" size="small">{{ plan.savings }}</v-chip>
          </div>

          <h3 class="text-h5 font-weight-bold text-center mb-2">{{ plan.name }}</h3>
          <p class="text-center text-body-2 text-medium-emphasis mb-3">{{ plan.description }}</p>
          <div class="text-center mb-4">
            <span class="text-h3 font-weight-bold">{{ plan.price }}</span>
            <span class="text-body-2 text-medium-emphasis">/one-time</span>
          </div>

          <v-divider class="my-4" />

          <v-list class="bg-transparent" density="compact">
            <v-list-item v-for="(feature, fIndex) in plan.features" :key="fIndex" class="px-0">
              <template v-slot:prepend>
                <v-icon :color="plan.popular ? 'white' : 'success'" size="small">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title :class="plan.popular ? 'text-white' : ''" class="text-body-2">{{ feature }}</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-btn 
            block 
            size="large" 
            :color="plan.popular ? 'white' : 'primary'"
            :variant="plan.popular ? 'elevated' : 'flat'"
            class="mt-4"
          >
            Get Started
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-16" thickness="2" />

    <!-- How It Works -->
    <div id="how-it-works" class="text-center mb-12" data-aos="fade-up">
      <h2 class="text-h3 font-weight-bold mb-4">
        How It <span class="text-primary">Works</span>
      </h2>
      <p class="text-h6 text-medium-emphasis">
        Transform your resume in 3 simple steps
      </p>
    </div>

    <v-row class="mb-16">
      <v-col cols="12" md="4" data-aos="fade-up" data-aos-delay="0">
        <v-card class="pa-8 text-center h-100" elevation="2">
          <v-avatar color="primary" size="80" class="mb-4">
            <span class="text-h4 font-weight-bold">1</span>
          </v-avatar>
          <h3 class="text-h5 font-weight-bold mb-3">Upload Resume</h3>
          <p class="text-body-1 text-medium-emphasis">
            Simply upload your resume in PDF or DOC format
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" data-aos="fade-up" data-aos-delay="100">
        <v-card class="pa-8 text-center h-100" elevation="2">
          <v-avatar color="success" size="80" class="mb-4">
            <span class="text-h4 font-weight-bold">2</span>
          </v-avatar>
          <h3 class="text-h5 font-weight-bold mb-3">AI Processing</h3>
          <p class="text-body-1 text-medium-emphasis">
            Our AI extracts, enhances, and optimizes your content in under 5 minutes
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" data-aos="fade-up" data-aos-delay="200">
        <v-card class="pa-8 text-center h-100" elevation="2">
          <v-avatar color="warning" size="80" class="mb-4">
            <span class="text-h4 font-weight-bold">3</span>
          </v-avatar>
          <h3 class="text-h5 font-weight-bold mb-3">Get Results</h3>
          <p class="text-body-1 text-medium-emphasis">
            Receive your ATS-ready resume and responsive portfolio website
          </p>
        </v-card>
      </v-col>
    </v-row>

    <!-- CTA Section -->
    <v-card color="primary" class="pa-12 text-center" elevation="8" data-aos="zoom-in">
      <h2 class="text-h3 font-weight-bold mb-4">
        Ready to Transform Your Career?
      </h2>
      <p class="text-h6 mb-6">
        Join 500+ professionals who have successfully landed their dream jobs
      </p>
      <v-btn size="x-large" color="white" variant="elevated" class="px-8">
        Get Started Now
      </v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>
.resume-animation-container {
  perspective: 1000px;
  width: 100%;
  max-width: 450px;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.resume-card {
  width: 100%;
  height: 100%;
  animation: floatResume 6s ease-in-out infinite;
  transform-style: preserve-3d;
  position: relative;
  transition: transform 0.3s ease;
}

@keyframes floatResume {
  0%, 100% {
    transform: translateY(0px) rotateY(0deg);
  }
  50% {
    transform: translateY(-20px) rotateY(5deg);
  }
}

.resume-card:hover {
  animation-play-state: paused;
  transform: scale(1.05) !important;
}

.featured-plan {
  transform: scale(1.05);
  border: 2px solid rgb(var(--v-theme-primary));
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

/* Responsive Adjustments */
@media (max-width: 960px) {
  .resume-animation-container {
    height: 400px;
    max-width: 300px;
    margin-bottom: 20px;
  }
}

@media (max-width: 600px) {
  .resume-animation-container {
    height: 350px;
    max-width: 280px;
  }
}
</style>
