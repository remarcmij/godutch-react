import { combineReducers } from 'redux'
import publicationList from './publicationListReducer'
import articleList from './articleListReducer'
import article from './articleReducer'

const rootReducer = combineReducers({
    publicationList,
    articleList,
    article
})

export default rootReducer
