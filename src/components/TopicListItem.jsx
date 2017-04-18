import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'

const TopicListItem = ({ topic, onTouchTap }) => (
  <ListItem
    onTouchTap={() => onTouchTap(topic)}
    primaryText={topic.title}
    secondaryText={
      <p>{topic.subtitle}</p>
    }
    secondaryTextLines={2}
  />
)

TopicListItem.propTypes = {
  topic: PropTypes.object,
  onTouchTap: PropTypes.func
}

export default TopicListItem
