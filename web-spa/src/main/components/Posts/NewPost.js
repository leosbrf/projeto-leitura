import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPostRequested } from '../../../store/modules/posts/actions'
import generateId from '../../../shared/util/generateId'
import PostForm from '../Widgets/PostForm'

class NewPost extends Component {

    handleSubmit = (formData) => {
        const { onAddPost, history } = this.props

        const newPost = {
            id: generateId(),
            timestamp: Date.now(),
            title: formData.title,
            body: formData.body,
            author: formData.author,
            category: formData.category
        }
        onAddPost(newPost)

        history.push('/')
    }

    handleBack = (e) => {
        e.preventDefault()

        this.props.history.goBack()
    }

    render() {
        return (
            <PostForm handleBack={this.handleBack} handleSubmit={this.handleSubmit} />
        )
    }
}

const mapDispatchToProps = dispatch => (
    {
        onAddPost: (post) => dispatch(addPostRequested(post))
    }
)


export default connect(null, mapDispatchToProps)(NewPost)