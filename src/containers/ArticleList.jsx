import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { List } from 'material-ui/List'

import TopicListItem from '../components/TopicListItem'
import { fetchPublicationTopics } from '../actions/index'

class ArticleList extends Component {

  constructor(props) {
    super(props)
    this.onBack = this.onBack.bind(this)
    this.onTouchTap = this.onTouchTap.bind(this)
    this.topics = this.props.publicationTopics[this.publication]
  }

  componentWillMount() {
    if (!this.topics) {
      this.props.fetchPublicationTopics(this.props.match.params)
    }
  }

  renderList() {
    if (!this.topics) {
      return (
        <div></div>
      )
    }
    return this.topics.slice(1).map(topic => (
      <TopicListItem
        key={topic.id}
        topic={topic}
        onTouchTap={this.onTouchTap} />
    ))
  }

  render() {
    const { publication } = this.props.match.params
    this.topics = this.props.publicationTopics[publication]
    return (
      <div>
        <AppBar
          className="AppBar"
          title={<span>Articles</span>}
          iconElementLeft={
            <IconButton onTouchTap={this.onBack}>
              <FontIcon className="material-icons">arrow_back</FontIcon>
            </IconButton>
          }
        />
        <List dir={this.getDir()}>
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

  getDir() {
    if (!this.topics) {
      return 'ltr'
    }
    const firstTopic = this.topics[0]
    return firstTopic.baseLang.startsWith('ar') || firstTopic.targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }
}

ArticleList.propTypes = {
  publicationTopics: PropTypes.object,
  fetchPublicationTopics: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object
}

function mapStateToProps(state) {
  return {
    publicationTopics: state.publicationTopics,
    fetchPublicationTopics: state.fetchPublicationTopics
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPublicationTopics }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
