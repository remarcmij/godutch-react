import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'

import { fetchArticle } from '../actions/index'
import speechService from '../services/speechService'

const style = {
  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
  fontSize: '1rem',
  lineHeight: '1.5',
  color: '#373a3c',
  padding: '16px'
}

class Article extends Component {

  constructor(props) {
    super(props)
    const { publication, article } = this.props.match.params
    this.topic = this.props.article[publication + '.' + article]
    this.onBack = this.onBack.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  componentWillMount() {
    if (!this.topic) {
      this.props.fetchArticle(this.props.match.params)
    }
  }

  render() {
    const { publication, article } = this.props.match.params
    this.topic = this.props.article[publication + '.' + article]
    if (!this.topic) {
      return (
        <div></div>
      )
    }
    return (
      <div>
        <AppBar
          className="AppBar"
          title={<span>Article</span>}
          iconElementLeft={
            <IconButton onTouchTap={this.onBack}>
              <FontIcon className="material-icons">arrow_back</FontIcon>
            </IconButton>
          }
        />
        <Paper style={style} zDepth={1}>
          <article
            dir={this.getDir(this.topic)}
            onClick={this.onClick}
            dangerouslySetInnerHTML={{ __html: this.topic.html }}
          />
        </Paper>
      </div>
    )
  }

  getDir(topic) {
    return topic.baseLang.startsWith('ar') || topic.targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  onBack() {
    this.props.history.push(`/articles/${this.props.match.params.publication}`)
  }

  onClick(ev) {
    console.log(ev)
    if (speechService.isSpeechSynthesisSupported) {
      const target = ev.target
      if (target.tagName === 'SPAN') {
        ev.preventDefault()
        ev.stopPropagation()
        const text = target.innerText.trim()
        speechService.speak(text, this.topic.targetLang)
      }
    }
  }

}

Article.propTypes = {
  article: PropTypes.object,
  fetchArticle: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object
}

function mapStateToProps(state) {
  return {
    article: state.article
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArticle }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
