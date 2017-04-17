import { FETCH_PUBLICATION_LIST } from '../actions/index'

export default (state = null, { type, payload }) => {
  console.log(state)
  switch (type) {
    case FETCH_PUBLICATION_LIST:
      return payload
    default:
      return state
  }
}
