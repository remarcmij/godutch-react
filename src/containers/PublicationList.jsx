import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import { List, ListItem } from 'material-ui/List'

import { fetchPublicationList } from '../actions/index'

class PublicationList extends React.Component {

  componentDidMount() {
    if (!this.props.publicationList) {
      this.props.fetchPublicationList()
    }
  }

  renderList() {
    if (!this.props.publicationList) {
      return (
        <div></div>
      )
    }
    return this.props.publicationList.data.map(topic => {
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
          title="Go Dutch"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <List>
          {this.renderList()}
        </List>
      </div>
    )
  }

  onItemTap(topic) {
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
