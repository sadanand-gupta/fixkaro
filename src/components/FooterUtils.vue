<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <!-- About Section -->
        <div class="footer-section" data-aos="fade-up" data-aos-delay="0">
          <h3>About Fixkaro.ai</h3>
          <p class="text-black">
            AI-powered career platform that instantly converts resumes into beautiful, responsive portfolio websites and ATS-optimized resumes. Helping professionals eliminate job application frustration since day one.
          </p>
          <div class="stats-mini mt-4">
            <div class="stat-mini">
              <strong>500+</strong> Careers Transformed
            </div>
            <div class="stat-mini">
              <strong>95%</strong> Success Rate
            </div>
          </div>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Twitter">
              <v-img :src="x" alt="Twitter"></v-img>
            </a>
            <a href="https://in.linkedin.com/in/sadanandgupta" class="social-link" aria-label="LinkedIn">
              <v-img :src="linkedin" alt="LinkedIn"></v-img>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <v-img :src="instagram" alt="Instagram"></v-img>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section text-black" data-aos="fade-up" data-aos-delay="100">
          <h3>Quick Links</h3>
          <a href="#">Home</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#how-it-works">How It Works</a>
          <a href="/contact.html">Contact Us</a>
          <a href="#">Privacy Policy</a>
        </div>

        <!-- Services -->
        <div class="footer-section text-black" data-aos="fade-up" data-aos-delay="200">
          <h3>Our Services</h3>
          <a href="#">ATS Resume Builder</a>
          <a href="#">Portfolio Website</a>
          <a href="#">Combo Packages</a>
          <a href="#">Resume Review</a>
          <a href="#">Career Consultation</a>
        </div>

        <!-- Contact & Support -->
        <div class="footer-section" data-aos="fade-up" data-aos-delay="300">
          <h3>Contact & Support</h3>
          <div class="contact-item">
            <v-img :src="envelope" style="width: 20px; display: inline-block; vertical-align: middle;"></v-img>
            <a href="mailto:support@fixkaro.ai" class="contact-link">support@fixkaro.ai</a>
          </div>
          <div class="contact-item">
            <v-img :src="location" style="width: 20px; display: inline-block; vertical-align: middle;"></v-img>
            <span class="contact-text">Bangalore, India</span>
          </div>
          <div class="contact-item mt-3">
            <strong class="text-black">Working Hours:</strong>
            <p class="text-caption text-black mb-1">Sunday: 10:00 AM - 6:00 PM IST</p>
            <p class="text-caption text-black mb-1">Monday: 10:00 AM - 6:00 PM IST</p>
            <p class="text-caption text-black">Wednesday: 10:00 AM - 6:00 PM IST</p>
          </div>
          <div class="support-badge mt-3">
            <v-chip size="small" color="success" variant="elevated">
              <v-icon start size="small">mdi-check-circle</v-icon>
              WhatsApp Support Available
            </v-chip>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2025 Fixkaro.ai. All rights reserved. | Making career success accessible to everyone</p>
      </div>
    </div>
  </footer>

  <!-- WhatsApp Floating Button -->
  <a 
    href="https://wa.me/7824051456?text=Hi%20Fixkaro.ai%2C%20I%20need%20help%20with%20my%20resume%20and%20portfolio..." 
    class="whatsapp-float"
    target="_blank" 
    title="Chat on WhatsApp - Available Sun, Mon, Wed (10 AM - 6 PM IST)"
  >
    <v-icon size="32" color="white">mdi-whatsapp</v-icon>
  </a>
</template>

<script setup>
import x from "../assets/x-logo.svg"
import linkedin from "../assets/linkedin-logo.svg"
import instagram from "../assets/instagram-logo.svg"
import envelope from "../assets/envelope-simple.svg"
import location from "../assets/map-pin.svg"
import info from "../assets/info.svg"
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true
  })
})
</script>

<style scoped>
footer {
  padding: 80px 0 40px;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-top: 1px solid #dee2e6;
  color: #212529;
  font-size: 14px;
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
  text-align: left;
  color: #212529;
}

.footer-section h3 {
  color: #212529;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 700;
  position: relative;
  padding-bottom: 10px;
}

.footer-section h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.footer-section p, 
.footer-section a {
  color: #495057;
  font-size: 14px;
  line-height: 1.8;
  text-decoration: none;
  display: block;
  transition: all 0.3s ease;
  margin-bottom: 8px;
}

.footer-section a:hover {
  color: #667eea;
  transform: translateX(5px);
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #dee2e6;
  color: #6c757d;
  font-size: 14px;
}

.stats-mini {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.stat-mini {
  font-size: 12px;
  color: #495057;
}

.stat-mini strong {
  color: #667eea;
  font-size: 18px;
  display: block;
}

.social-links {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: white;
  border: 2px solid #dee2e6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
  padding: 8px;
}

.social-link:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.contact-link {
  color: #495057;
  font-weight: 500;
  display: inline;
}

.contact-link:hover {
  color: #667eea;
  transform: none;
}

.contact-text {
  color: #495057;
  font-size: 14px;
}

.support-badge {
  display: inline-block;
}

/* WhatsApp Float */
.whatsapp-float {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  text-decoration: none;
  animation: pulse-whatsapp 2s infinite;
}

.whatsapp-float:hover {
  transform: scale(1.15);
  box-shadow: 0 6px 30px rgba(37, 211, 102, 0.7);
  animation-play-state: paused;
}

@keyframes pulse-whatsapp {
  0%, 100% {
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
  }
  50% {
    box-shadow: 0 4px 30px rgba(37, 211, 102, 0.8);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  footer {
    padding: 60px 0 30px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .stats-mini {
    flex-direction: column;
    gap: 10px;
  }

  .whatsapp-float {
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
  }
}

@media (max-width: 480px) {
  .footer-section h3 {
    font-size: 16px;
  }

  .social-links {
    justify-content: flex-start;
  }

  .whatsapp-float {
    width: 50px;
    height: 50px;
  }
}
</style>
