import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clearStories, fetchStories, search} from '../actions/index'
import PostItem from './post-item'
import StoryPlaceholder from '../components/story-placeholder'
import AlgoliaPost from '../components/algolia-post'
import autobind from 'autobind-decorator'

class AskStories extends Component {
  constructor (props) {
    super(props)

    this.state = {
      limit: 20
    }
  }
  componentWillMount () {
    this.props.fetchStories('askstories')
  }

  componentWillUnmount () {
    this.props.clearStories()
  }

  @autobind
  onMoreClick () {
    this.setState({
      limit: Math.min(this.state.limit + 20, this.props.items.length - 1)
    })
  }

  renderPlaceholders () {
    const storyPlaceholders = []
    for (var i = 1; i < 21; i++) {
      storyPlaceholders.push(<StoryPlaceholder key={i} />)
    }
    return storyPlaceholders.map(story => {
      return story
    })
  }

  renderPosts () {
    return this.props.items.slice(0, this.state.limit + 1).map(id => {
      return <PostItem id={id} key={id} />
    })
  }

  render () {
    if (!this.props.items) return <div className='new-stories'><div className='posts-list'>{this.renderPlaceholders()}</div></div>
    return (
      <div className='new-stories'>
        <div className='posts-list'>
          {this.renderPosts()}
        </div>
        <button onClick={this.onMoreClick} className='pagination-button'>More</button>
      </div>
    )
  }
}

function mapStateToProps ({items}) {
  return {items: items.items}
}

export default connect(mapStateToProps, {fetchStories, clearStories, search})(AskStories)
