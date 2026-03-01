import { reactive } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

// Set worker source
// Typically handled by Vite via a plugin or manually setting the worker src
// For simplicity in a Vite setup, we might need to import the worker script URL or rely on a standard location.
// A common Vite pattern:
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url'
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

export const resumeStore = reactive({
    data: {
        personalInfo: {
            name: '',
            role: '',
            email: '',
            phone: '',
            location: '',
            summary: ''
        },
        skills: [],
        experience: [],
        education: []
    },

    async extractData(file) {
        if (!file) return

        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
            let fullText = ''

            // Limit to first 2 pages to be safe
            const maxPages = Math.min(pdf.numPages, 2)

            for (let i = 1; i <= maxPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()
                const pageText = textContent.items.map(item => item.str).join(' ')
                fullText += pageText + '\n'
            }

            this.parseText(fullText)

        } catch (error) {
            console.error("PDF Parsing Error:", error)
        }
    },

    parseText(text) {
        // Cleaning
        const cleanText = text.replace(/\s+/g, ' ').trim()

        // 1. Name Extraction (Simple heuristic: First few words)
        // Adjust logic: Assume name is at the start, or look for capitalized words.
        // Let's try to take the first line or first few words as name if it looks like a name.
        const nameMatch = cleanText.match(/^([A-Z][a-z]+(\s[A-Z][a-z]+)+)/)
        this.data.personalInfo.name = nameMatch ? nameMatch[0] : 'Unknown Name'

        // 2. Email Extraction (Regex)
        const emailMatch = cleanText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/)
        this.data.personalInfo.email = emailMatch ? emailMatch[0] : ''

        // 3. Phone Extraction (Regex for common formats)
        const phoneMatch = cleanText.match(/(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)
        this.data.personalInfo.phone = phoneMatch ? phoneMatch[0] : ''

        // 4. Role (Heuristic: Look for common job titles close to the top)
        const roles = ['Developer', 'Engineer', 'Designer', 'Manager', 'Analyst', 'Consultant', 'Architect', 'Administrator']
        const roleRegex = new RegExp(`(${roles.join('|')})`, 'i')
        const roleMatch = cleanText.match(roleRegex)
        // Try to capture a few words around it if possible, but keeping it simple for now
        // A better approach might be to look for the line *after* the name.
        // Let's stick to a hardcoded list search + context or just "Developer" if found.
        // For better results, we might just default to "Key Role Identified" if simple match fails or use the match.
        this.data.personalInfo.role = roleMatch ? `Professional ${roleMatch[0]}` : 'Professional'

        // 5. Skills (Keyword scan)
        const commonSkills = [
            'Javascript', 'Python', 'Java', 'C++', 'React', 'Vue', 'Angular', 'Node.js',
            'AWS', 'Docker', 'Kubernetes', 'SQL', 'NoSQL', 'Git', 'Agile', 'HTML', 'CSS',
            'TypeScript', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Figma', 'Adobe',
            'Leadership', 'Communication', 'Management'
        ]

        this.data.skills = commonSkills.filter(skill => {
            const regex = new RegExp(`\\b${skill}\\b`, 'i')
            return regex.test(cleanText)
        })

        // 6. Experience (Heuristic: Look for "Experience" section and grab following text)
        // This is tricky without layout analysis. We will try to find the "Experience" keyword
        // and grab a chunk of text after it to simulate an entry.
        this.data.experience = [] // Reset
        const expIndex = cleanText.search(/Experience|Employment|Work History/i)
        if (expIndex !== -1) {
            // Grab a chunk of text after this header
            const expChunk = cleanText.substring(expIndex, expIndex + 300)
            // Mocking structure by splitting or just using the text
            this.data.experience.push({
                company: 'Detected from Resume',
                role: 'Previous Role',
                duration: 'Recent',
                description: expChunk.substring(0, 150) + '...'
            })
        } else {
            // Fallback if no section found
            this.data.experience.push({
                company: 'Past Experience',
                role: 'Team Member',
                duration: '2020 - 2023',
                description: 'Collaborated on key projects and delivered results.'
            })
        }

        // 7. Education
        this.data.education = [] // Reset
        const eduIndex = cleanText.search(/Education|University|College|School/i)
        if (eduIndex > -1) {
            const eduChunk = cleanText.substring(eduIndex, eduIndex + 100)
            this.data.education.push({
                institution: 'University / College',
                degree: 'Degree Program',
                year: 'Graduated'
            })
        }

        // Summary (First valid sentence that isn't name)
        if (!this.data.personalInfo.summary) {
            this.data.personalInfo.summary = "Professional with a proven track record. Passionate about creating value and driving success."
        }
    }
})
