import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import ArticleContent from '../components/ArticleContent'
import { fetchArticle } from '../actions/index'

class Article extends Component {

  constructor(props) {
    super(props)
    const { publication, article } = this.props.match.params
    this.topic = this.props.article[publication + '.' + article]
    this.onBack = this.onBack.bind(this)
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
        <ArticleContent topic={this.topic} />
      </div>
    )
  }

  onBack() {
    this.props.history.push(`/articles/${this.props.match.params.publication}`)
  }

}

Article.propTypes = {
  article: PropTypes.object.isRequired,
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
