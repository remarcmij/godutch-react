import { FETCH_INDEX_TOPICS } from '../actions/index'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_INDEX_TOPICS:
      return { ...state, ...payload }
    default:
      return state
  }
}
