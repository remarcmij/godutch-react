import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { List, ListItem } from 'material-ui/List'
import uuid from 'uuid/v1'

import { fetchArticleList } from '../actions/index'

class ArticleList extends React.Component {

  constructor(props) {
    super(props)
    this.onBack = this.onBack.bind(this)
    this.state = {
      uuid: uuid()
    }
  }

  componentWillMount() {
    this.props.fetchArticleList(this.props.match, this.state.uuid)
  }

  renderList() {
    const articleList = this.props.articleList
    if (!articleList || articleList.uuid !== this.state.uuid) {
      return (
        <div></div>
      )
    }
    const items = articleList.data.slice(1)
    return items.map(topic => {
      return (
        <ListItem
          key={topic.id}
          onTouchTap={() => this.onItemTap(topic)}
          primaryText={topic.title}
          secondaryText={
            <p>{topic.subtitle}</p>
          }
          secondaryTextLines={2}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span>Articles</span>}
          iconElementLeft={
            <IconButton onTouchTap={this.onBack}>
              <FontIcon className="material-icons">arrow_back</FontIcon>
            </IconButton>
          }
        />
        <List>
          {this.renderList()}
        </List>
      </div>
    )
  }

  onBack() {
    this.props.history.push('/')
  }

  onItemTap(topic) {
    this.props.history.push(`/articles/${topic.publication}/${topic.article}`)
  }
}

ArticleList.propTypes = {
  articleList: PropTypes.object,
  fetchArticleList: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object
}

function mapStateToProps(state) {
  return {
    articleList: state.articleList,
    fetchArticleList: state.fetchArticleList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArticleList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)