import { combineReducers } from 'redux'
import indexTopics from './indexTopicsReducer'
import publicationTopics from './publicationTopicsReducer'
import article from './articleReducer'

const rootReducer = combineReducers({
    indexTopics,
    publicationTopics,
    article
})

export default rootReducer
