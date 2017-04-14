import { PUBLICATION_LIST_FETCHED } from '../actions/index'

export default function (state = null, { type, payload }) {
  switch (type) {
    case PUBLICATION_LIST_FETCHED: return payload
    default: return state
  }
}
