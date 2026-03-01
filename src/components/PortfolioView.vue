<script setup>
import { computed } from 'vue'
import { resumeStore } from '@/composables/resumeStore'

const props = defineProps(['theme'])
const emit = defineEmits(['back'])

const data = computed(() => resumeStore.data)

const themeClass = computed(() => {
    switch(props.theme) {
        case 'minimalist': return 'theme-minimalist'
        case 'creative': return 'theme-creative'
        case 'corporate': return 'theme-corporate'
        default: return 'theme-minimalist'
    }
})
</script>

<template>
  <div class="portfolio-container" :class="themeClass">
    <!-- Toolbar -->
    <div class="portfolio-toolbar">
        <v-btn size="small" variant="text" color="white" @click="$emit('back')">
            <v-icon start>mdi-arrow-left</v-icon> Back to Editor
        </v-btn>
        <span class="text-white text-caption">Previewing: {{ theme }}</span>
        <v-btn size="small" color="primary" class="text-black font-weight-bold">
            Publish Website <v-icon end>mdi-rocket</v-icon>
        </v-btn>
    </div>

    <!-- Website Content -->
    <div class="site-wrapper">
        <!-- Header / Hero -->
        <header class="site-header">
            <h1 class="name">{{ data.personalInfo.name || 'Your Name' }}</h1>
            <h2 class="role">{{ data.personalInfo.role || 'Professional Role' }}</h2>
            <div class="contact-info">
                <span>{{ data.personalInfo.email }}</span>
                <span v-if="data.personalInfo.location">• {{ data.personalInfo.location }}</span>
            </div>
            <p class="summary">{{ data.personalInfo.summary }}</p>
        </header>

        <!-- Experience -->
        <section class="section experience" v-if="data.experience.length">
            <h3 class="section-title">Experience</h3>
            <div class="timeline">
                <div v-for="(exp, i) in data.experience" :key="i" class="timeline-item">
                    <div class="timeline-header">
                        <h4>{{ exp.role }}</h4>
                        <span class="date">{{ exp.duration }}</span>
                    </div>
                    <div class="company">{{ exp.company }}</div>
                    <p class="desc">{{ exp.description }}</p>
                </div>
            </div>
        </section>

        <!-- Education -->
        <section class="section education" v-if="data.education.length">
             <h3 class="section-title">Education</h3>
             <div v-for="(edu, i) in data.education" :key="i" class="edu-item">
                <h4>{{ edu.institution }}</h4>
                <p>{{ edu.degree }}, {{ edu.year }}</p>
             </div>
        </section>

        <!-- Skills -->
         <section class="section skills" v-if="data.skills.length">
            <h3 class="section-title">Skills</h3>
            <div class="skill-tags">
                <span v-for="skill in data.skills" :key="skill" class="skill-tag">{{ skill }}</span>
            </div>
         </section>
    </div>
  </div>
</template>

<style scoped>
.portfolio-container {
    background: #fff;
    min-height: 100vh;
    color: #333;
    padding-top: 60px; /* Space for toolbar */
    font-family: 'Inter', sans-serif;
}

.portfolio-toolbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #111;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 1000;
    border-bottom: 1px solid #333;
}

.site-wrapper {
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 20px;
}

.section { margin-bottom: 50px; }
.section-title { font-size: 24px; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1px; }

/* Minimalist Theme */
.theme-minimalist .site-header { text-align: left; margin-bottom: 60px; border-bottom: 1px solid #eee; padding-bottom: 40px; }
.theme-minimalist .name { font-size: 48px; font-weight: 800; letter-spacing: -1px; margin-bottom: 8px; }
.theme-minimalist .role { font-size: 20px; color: #666; font-weight: 400; margin-bottom: 24px; }
.theme-minimalist .summary { color: #444; line-height: 1.8; max-width: 600px; }
.theme-minimalist .section-title { border-bottom: 2px solid #000; display: inline-block; padding-bottom: 4px; font-size: 14px; font-weight: 700; }
.theme-minimalist .skill-tag { background: #f5f5f5; padding: 6px 16px; border-radius: 4px; display: inline-block; margin: 0 8px 8px 0; font-size: 14px; }

/* Creative Theme */
.theme-creative { background: #f0f4f8; }
.theme-creative .site-wrapper { background: #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.05); padding: 60px; border-radius: 12px; margin-top: 40px; }
.theme-creative .site-header { text-align: center; margin-bottom: 60px; }
.theme-creative .name { font-size: 56px; background: linear-gradient(135deg, #6c5ce7, #a29bfe); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 12px; }
.theme-creative .role { font-size: 24px; color: #6c5ce7; font-weight: 600; }
.theme-creative .skill-tag { background: #a29bfe; color: white; padding: 6px 16px; border-radius: 20px; display: inline-block; margin: 4px; }
.theme-creative .section-title { color: #6c5ce7; font-weight: 800; text-align: center; }

/* Corporate Theme */
.theme-corporate { background: #fff; font-family: 'Georgia', serif; }
.theme-corporate .site-header { background: #2c3e50; color: white; padding: 80px 0; margin-bottom: 60px; text-align: center; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; }
.theme-corporate .name { font-size: 42px; margin-bottom: 10px; }
.theme-corporate .role { font-size: 18px; opacity: 0.8; font-family: sans-serif; letter-spacing: 2px; text-transform: uppercase; }
.theme-corporate .contact-info { color: #bdc3c7; }
.theme-corporate .section-title { color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 10px; }
.theme-corporate .company { font-weight: bold; color: #2c3e50; }
.theme-corporate .skill-tag { border: 1px solid #2c3e50; color: #2c3e50; padding: 4px 12px; display: inline-block; margin: 4px; }

</style>
