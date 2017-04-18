import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { List } from 'material-ui/List'

import TopicListItem from '../components/TopicListItem'
import { fetchArticleList } from '../actions/index'

class ArticleList extends React.Component {

  constructor(props) {
    super(props)
    const { publication } = this.props.match.params
    this.key = publication
    this.onBack = this.onBack.bind(this)
    this.onTouchTap = this.onTouchTap.bind(this)
  }

  componentWillMount() {
    const articleList = this.props.articleList
    if (!articleList || articleList.key !== this.key) {
      this.props.fetchArticleList(this.props.match, this.key)
    }
  }

  renderList() {
    const { articleList } = this.props
    if (!articleList || articleList.key !== this.key) {
      return (
        <div></div>
      )
    }
    return articleList.data.slice(1).map(topic => (
      <TopicListItem
        key={topic.id}
        topic={topic}
        onTouchTap={this.onTouchTap} />
    ))
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

  onTouchTap(topic) {
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
