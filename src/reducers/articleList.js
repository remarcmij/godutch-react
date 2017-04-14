import { ARTICLE_LIST_FETCHED } from '../actions/index'

export default function (state = null, { type, payload }) {
  switch (type) {
    case ARTICLE_LIST_FETCHED: return payload
    default: return state
  }
}
