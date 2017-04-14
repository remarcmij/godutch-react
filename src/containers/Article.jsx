import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import uuid from 'uuid/v1'

import { fetchArticle } from '../actions/index'

const style = {
  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
  fontSize: '1rem',
  lineHeight: '1.5',
  color: '#373a3c',
  padding: '16px'
}

class Article extends React.Component {

  constructor(props) {
    super(props)
    this.onBack = this.onBack.bind(this)
    this.state = {
      uuid: uuid()
    }
  }

  componentDidMount() {
    this.props.fetchArticle(this.props.match, this.state.uuid)
  }

  createHtml() {
    return { __html: this.props.article.data.html }
  }

  render() {
    if (!this.props.article || this.props.article.uuid !== this.state.uuid) {
      return (
        <div></div>
      )
    }
    return (
      <div>
        <AppBar
          title={<span>Article</span>}
          iconElementLeft={
            <IconButton onTouchTap={this.onBack}>
              <FontIcon className="material-icons">arrow_back</FontIcon>
            </IconButton>
          }
        />
        <Paper style={style} zDepth={1}>
          <div dangerouslySetInnerHTML={this.createHtml()} />
        </Paper>
      </div>
    )
  }

  onBack() {
    this.props.history.push(`/articles/${this.props.match.params.publication}`)
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
