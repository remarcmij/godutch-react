import { FETCH_ARTICLE } from '../actions/index'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLE:
      return { ...state, ...payload }
    default:
      return state
  }
}
