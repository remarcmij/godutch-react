import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'

const PublicationListItem = ({ topic, onTap }) => (
  <ListItem
    onTouchTap={() => onTap(topic)}
    primaryText={topic.title}
    secondaryText={
      <p>{topic.subtitle}</p>
    }
    secondaryTextLines={2}
  />
)

PublicationListItem.propTypes = {
  topic: PropTypes.object,
  onItemTap: PropTypes.func
}

export default PublicationListItem
