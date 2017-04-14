import { combineReducers } from 'redux'
import PublicationListReducer from './publicationList'
import ArticleListReducer from './articleList'
import ArticleReducer from './article'

const rootReducer = combineReducers({
    publicationList: PublicationListReducer,
    articleList: ArticleListReducer,
    article: ArticleReducer
})

export default rootReducer