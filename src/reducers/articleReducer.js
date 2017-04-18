import { FETCH_ARTICLE } from '../actions/index'

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_ARTICLE:
      return action.payload
    default:
      return state
  }
}
