import { ARTICLE_FETCHED } from '../actions/index'

export default function (state = null, { type, payload }) {
  switch (type) {
    case ARTICLE_FETCHED: return payload
    default: return state
  }
}
