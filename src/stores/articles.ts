import { defineStore } from "pinia"
import { ref } from "vue"
import { BlogPost } from "@/models/BlogPost"
import { useRouter } from "vue-router"



export const useArticleStore = defineStore('articles', () => {
    const router = useRouter()
  const articleSelected = ref<BlogPost>()

  const getArticle = (selected: BlogPost) => {
    articleSelected.value = selected

    goToArticle(articleSelected.value?.id || '')
  }

  const goToArticle = (id: string) => {
    router.push(`/article/${id}`)
  }

  const goBack = () => {
    router.push('/articles')
  }

  return {
    articleSelected,
    getArticle,
    goBack
  }
})
