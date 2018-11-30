import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePostRequested, getPostRequested } from '../../../store/modules/posts/actions'
import PostForm from '../Widgets/PostForm'

class NewPost extends Component {

    componentDidMount() {
        const { match: { params }, onGetPost } = this.props

        if (params.id) {
            onGetPost(params.id)
        }
    }

    handleSubmit = (formData) => {
        const { onUpdatePost, history, post } = this.props

        if (post) {
            onUpdatePost({
                ...post,
                title: formData.title,
                body: formData.body,
                author: formData.author,
                category: formData.category
            })
        }

        history.push('/')
    }

    handleBack = (e) => {
        e.preventDefault()

        this.props.history.goBack()
    }

    render() {
        const { post } = this.props

        return (
            <PostForm post={post} handleBack={this.handleBack} handleSubmit={this.handleSubmit} />
        )
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.post
})

const mapDispatchToProps = dispatch => (
    {
        onUpdatePost: (post) => dispatch(updatePostRequested(post)),
        onGetPost: (id) => dispatch(getPostRequested(id))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(NewPost)