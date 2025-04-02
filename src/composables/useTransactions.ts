import { ref, onMounted, computed, watch } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Transaction } from '@/models/Transaction'
import people from '../documents/people.json'

export default function useTransactions() { 

    const transactionsCollection = ref<Transaction[]>([])
    const loading = ref(true)
    const filter = ref(0)
    const groupTotalByResponsible = ref()

    onMounted(async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'transactions'))
          transactionsCollection.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Transaction[]
        } catch (error) {
          console.error('Error fetching posts:', error)
        } finally {
          loading.value = false
        }
      })


      const filteredTransactions = computed(() => {
        if (filter.value === 0) return transactionsCollection.value
        return transactionsCollection.value.filter(transaction => transaction.responsibleId === filter.value)
      })


      const total = computed(() => {
        const total = filteredTransactions.value.reduce((acc, transaction) => {
          return acc + transaction.amount
        }, 0)
        return {
          total
        }
      })
      
      watch(filteredTransactions, () => {
        groupTotalByResponsible.value = people.map(person => { 
            const total = filteredTransactions.value.filter(transaction => transaction.responsibleId === person.id).reduce((acc, transaction) => {
              return acc + transaction.amount
            }, 0)
            return {
              id: person.id,
              name: person.firstName,
              total
            }
        });
      })

    return {
        loading,
        transactionsCollection,
        filteredTransactions,
        filter,
        total,
        groupTotalByResponsible
    }
}