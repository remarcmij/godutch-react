import React from 'react'
import PublicationList from '../containers/PublicationList'
import ArticleList from '../containers/ArticleList'


export default class App extends React.Component {
  render() {
    return (
      <div>
        <PublicationList />
        <ArticleList />
      </div>
    )
  }
}
