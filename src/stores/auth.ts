import { defineStore } from 'pinia'
import { ref } from 'vue'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth'
import { auth } from '../firebase/config'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)

  const register = async (email: string, password: string) => {
    try {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password)
      user.value = newUser
      error.value = null
    } catch (err: any) {
      error.value = err.message
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { user: loggedUser } = await signInWithEmailAndPassword(auth, email, password)
      user.value = loggedUser
      error.value = null
    } catch (err: any) {
      error.value = err.message
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      error.value = null
    } catch (err: any) {
      error.value = err.message
    }
  }

  return {
    user,
    error,
    register,
    login,
    logout
  }
})