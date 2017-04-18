import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import { List } from 'material-ui/List'

import TopicListItem from '../components/TopicListItem'
import { fetchIndexTopics } from '../actions/index'

class PublicationList extends Component {

  constructor(props) {
    super(props)
    this.onTouchTap = this.onTouchTap.bind(this)
    this.topics = this.props.indexTopics['index']
  }

  componentWillMount() {
    if (!this.topics) {
      this.props.fetchIndexTopics()
    }
  }

  renderList() {
    if (!this.topics) {
      return (
        <div></div>
      )
    }
    return this.topics.map(topic => (
      <TopicListItem
        key={topic.id}
        topic={topic}
        onTouchTap={this.onTouchTap} />
    ))
  }

  render() {
    this.topics = this.props.indexTopics['index']
    return (
      <div>
        <AppBar
          className="AppBar"
          title="Go Dutch"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <List>
          {this.renderList()}
        </List>
      </div>
    )
  }

  onTouchTap(topic) {
    this.props.history.push(`/articles/${topic.publication}`)
  }
}

PublicationList.propTypes = {
  indexTopics: PropTypes.object,
  fetchIndexTopics: PropTypes.func,
  history: PropTypes.object
}

function mapStateToProps(state) {
  return {
    indexTopics: state.indexTopics
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchIndexTopics }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationList)
