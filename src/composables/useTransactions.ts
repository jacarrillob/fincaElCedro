import { ref, onMounted, computed, watch, reactive } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Transaction, MonthInfo } from '@/models/Transaction'
import people from '../data/people.json'

export default function useTransactions() { 

    const transactionsCollection = ref<Transaction[]>([])
    const loading = ref(true)
    const getYears =ref<number[]>([])
    const months =ref<MonthInfo[]>([])
    const filter = reactive({
      responsibleId: 0,
      year: 0,
      month: 0
    })
    const groupTotalByResponsible = ref()

    onMounted(async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'transactions'))
          transactionsCollection.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Transaction[]
          transactionsCollection.value.sort((a, b) => b.transactionDate.localeCompare(a.transactionDate))
          getYears.value = extractYears(transactionsCollection.value)
          months.value = extractMonthsWithNames(transactionsCollection.value)
        } catch (error) {
          console.error('Error fetching posts:', error)
        } finally {
          loading.value = false
        }
      })


      const filteredTransactions = computed(() => {
        if (filter.responsibleId === 0 && filter.year === 0 && filter.month === 0) return transactionsCollection.value

        if (filter.responsibleId !== 0 && filter.year === 0 && filter.month === 0) return transactionsCollection.value.filter(transaction => transaction.responsibleId === filter.responsibleId)
        if (filter.responsibleId === 0 && filter.year !== 0 && filter.month === 0) return transactionsCollection.value.filter(transaction => transaction.transactionDate.split("-")[0] === filter.year.toString())
        if (filter.responsibleId === 0 && filter.year === 0 && filter.month !== 0) return transactionsCollection.value.filter(transaction => transaction.transactionDate.split("-")[1] === filter.month.toString())
        
        if (filter.responsibleId !== 0 && filter.year !== 0 && filter.month === 0) return transactionsCollection.value.filter(transaction => transaction.responsibleId === filter.responsibleId && transaction.transactionDate.split("-")[0] === filter.year.toString())
        if (filter.responsibleId !== 0 && filter.year === 0 && filter.month !== 0) return transactionsCollection.value.filter(transaction => transaction.responsibleId === filter.responsibleId && transaction.transactionDate.split("-")[1] === filter.month.toString())
        if(filter.responsibleId === 0 && filter.year !== 0 && filter.month !== 0) return transactionsCollection.value.filter(transaction => transaction.transactionDate.split("-")[0] === filter.year.toString() && transaction.transactionDate.split("-")[1] === filter.month.toString())
        return transactionsCollection.value.filter(transaction => transaction.responsibleId === filter.responsibleId && transaction.transactionDate.split("-")[0] === filter.year.toString() && transaction.transactionDate.split("-")[1] === filter.month.toString())
      })

      const total = computed(() => {
        const total = filteredTransactions.value.reduce((acc, transaction) => {
          return acc + transaction.amount
        }, 0)
        return {
          total
        }
      })

      function extractYears(transactions: Transaction[]): number[] {
        const years = new Set<number>(
          transactions
            .map(transaction => {
              const [year] = transaction.transactionDate.split("-")
              const parsed = parseInt(year, 10)
              return isNaN(parsed) ? null : parsed
            })
            .filter((year): year is number => year !== null)
        )
      
        return Array.from(years).sort((a, b) => b - a)
      }

      function extractMonthsWithNames(transactions: Transaction[]): MonthInfo[] {
        const monthNames: Record<string, string> = {
          "01": "Enero",
          "02": "Febrero",
          "03": "Marzo",
          "04": "Abril",
          "05": "Mayo",
          "06": "Junio",
          "07": "Julio",
          "08": "Agosto",
          "09": "Septiembre",
          "10": "Octubre",
          "11": "Noviembre",
          "12": "Diciembre",
        }
      
        const monthSet = new Set<string>(
          transactions
            .map(transaction => transaction.transactionDate.split("-")[1])
            .filter((month): month is string => !!month && month in monthNames)
        )
      
        return Array.from(monthSet)
          .sort()
          .map(month => ({
            number: month,
            name: monthNames[month]
          }))
      }
      
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
        groupTotalByResponsible,
        getYears,
        months
    }
}