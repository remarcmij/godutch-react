import { FETCH_ARTICLE_LIST } from '../actions/index'

export default (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLE_LIST:
      return payload
    default:
      return state
  }
}
