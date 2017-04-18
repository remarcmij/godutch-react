import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import { List } from 'material-ui/List'

import TopicListItem from '../components/TopicListItem'
import { fetchPublicationList } from '../actions/index'

class PublicationList extends React.Component {

  constructor(props) {
    super(props)
    this.onTouchTap = this.onTouchTap.bind(this)
  }

  componentDidMount() {
    if (!this.props.publicationList) {
      this.props.fetchPublicationList()
    }
  }

  renderList() {
    const { publicationList } = this.props
    if (!publicationList) {
      return (
        <div></div>
      )
    }
    return publicationList.data.map(topic => (
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
  publicationList: PropTypes.object,
  fetchPublicationList: PropTypes.func,
  history: PropTypes.object
}

function mapStateToProps(state) {
  return {
    publicationList: state.publicationList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPublicationList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationList)
