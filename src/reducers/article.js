import { FETCH_ARTICLE } from '../actions/index'

export default (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLE:
      return payload
    default:
      return state
  }
}
