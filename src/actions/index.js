import axios from 'axios'

export const FETCH_INDEX_TOPICS = 'FETCH_INDEX_TOPICS'
export const FETCH_PUBLICATION_TOPICS = 'FETCH_PUBLICATION_TOPICS'
export const FETCH_ARTICLE = 'FETCH_ARTICLE'

const API_URL = 'http://godutch.taalmap.nl/api'

function fetchData(route, key) {
  return axios.get(API_URL + route)
    .then(res => ({ [key]: res.data }))
}

export function fetchIndexTopics() {
  const key = 'index'
  return {
    type: FETCH_INDEX_TOPICS,
    payload: fetchData(`/topic`, key)
  }
}

export function fetchPublicationTopics({ publication }) {
  const key = publication
  return {
    type: FETCH_PUBLICATION_TOPICS,
    payload: fetchData(`/topic/${publication}`, key)
  }
}

export function fetchArticle({ publication, article }) {
  const key = publication + '.' + article
  return {
    type: FETCH_ARTICLE,
    payload: fetchData(`/topic/${publication}/${article}`, key)
  }
}
