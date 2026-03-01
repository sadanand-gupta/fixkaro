import { ref } from 'vue'
import { auth, googleProvider, db } from '../firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'

// Random username adjectives and nouns (game-style)
const adjectives = ['Swift', 'Bold', 'Sharp', 'Bright', 'Quick', 'Skilled', 'Clever', 'Smart']
const nouns = ['Builder', 'Coder', 'Maker', 'Creator', 'Dev', 'Pro', 'Star', 'Ace']

function generateUsername() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const num = Math.floor(Math.random() * 9000) + 1000
  return `${adj}${noun}_${num}`
}

// Store user data in Firestore
async function saveUserToFirestore(firebaseUser) {
  if (!firebaseUser) return

  const userRef = doc(db, 'users', firebaseUser.uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    // New user - create full profile
    await setDoc(userRef, {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || '',
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    })
  } else {
    // Existing user - update last login
    await setDoc(userRef, {
      lastLoginAt: serverTimestamp(),
    }, { merge: true })
  }
}

// Module-level singleton so auth state is shared across all components
const user = ref(null)
const loading = ref(true)
const displayName = ref('')

onAuthStateChanged(auth, async (firebaseUser) => {
  user.value = firebaseUser
  loading.value = false

  if (firebaseUser) {
    // Save/update user in Firestore
    try {
      await saveUserToFirestore(firebaseUser)
    } catch (error) {
      console.error('Error saving user to Firestore:', error)
    }

    // Check if we already stored a custom username for this user
    const storedName = localStorage.getItem(`fixkaro_username_${firebaseUser.uid}`)
    if (storedName) {
      displayName.value = storedName
    } else {
      // Use Google display name (first name only) or generate random one
      const firstName = firebaseUser.displayName?.split(' ')[0] || generateUsername()
      localStorage.setItem(`fixkaro_username_${firebaseUser.uid}`, firstName)
      displayName.value = firstName
    }
  } else {
    displayName.value = ''
  }
})

export function useAuth() {
  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error('Sign in error:', error.message)
      }
    }
  }

  async function signOutUser() {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Sign out error:', error.message)
    }
  }

  return { user, loading, displayName, signInWithGoogle, signOutUser }
}
