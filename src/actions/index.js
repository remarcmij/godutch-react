import axios from 'axios'
import LRU from 'lru-cache'

export const PUBLICATION_LIST_FETCHED = 'PUBLICATION_LIST_FETCHED'
export const ARTICLE_LIST_FETCHED = 'ARTICLE_LIST_FETCHED'
export const ARTICLE_FETCHED = 'ARTICLE_FETCHED'

const API_URL = 'http://godutch.taalmap.nl/api'

const ONE_DAY_IN_MSECS = 24 * 60 * 60 * 1000

const cache = LRU({
  max: 100,
  maxAge: ONE_DAY_IN_MSECS
})

function fetchData(route, key = null) {
  const url = API_URL + route
  const data = cache.get(API_URL + route)
  if (data) {
    console.log(`cache hit for: ${route}`)
    return Promise.resolve({ data, key })
  }

  console.log(`cache miss for: ${route}`)
  return axios.get(url)
    .then(res => {
      const data = res.data
      cache.set(url, data)
      return { data, key }
    })
}

export function fetchPublicationList() {
  return {
    type: PUBLICATION_LIST_FETCHED,
    payload: fetchData(`/topic`)
  }
}

export function fetchArticleList({ params }, key) {
  return {
    type: ARTICLE_LIST_FETCHED,
    payload: fetchData(`/topic/${params.publication}`, key)
  }
}

export function fetchArticle({ params }, key) {
  return {
    type: ARTICLE_FETCHED,
    payload: fetchData(`/topic/${params.publication}/${params.article}`, key)
  }
}
