import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

import speechService from '../services/speechService'
import './ArticleContent.css'

const ArticleContent = props => {

  function getDir() {
    return props.topic.baseLang.startsWith('ar') || props.topic.targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  function onClick(ev) {
    if (speechService.isSpeechSynthesisSupported) {
      if (ev.target.tagName === 'SPAN') {
        ev.preventDefault()
        ev.stopPropagation()
        const text = ev.target.innerText.trim()
        speechService.speak(text, props.topic.targetLang)
      }
    }
  }

  return (
    <div className="Article">
      <Paper zDepth={2}>
        <article
          dir={getDir()}
          onClick={onClick}
          dangerouslySetInnerHTML={{ __html: props.topic.html }}
        />
      </Paper>

    </div>
  )
}

ArticleContent.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

export default ArticleContent
