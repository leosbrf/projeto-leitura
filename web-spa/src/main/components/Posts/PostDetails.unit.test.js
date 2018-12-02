import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter as Router } from 'react-router-dom'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createMount } from '@material-ui/core/test-utils'
import { PostDetails, mapDispatchToProps } from './PostDetails'
import {
    getPostRequested,
    deletePostRequested,
    votePostRequested,
    addPostCommentRequested,
    updatePostCommentRequested,
    deletePostCommentRequested,
    votePostCommentRequested
  } from '../../../store/modules/posts/actions'

configure({ adapter: new Adapter() })

const setup = () => {
    const props = {
        classes: {},
        post: {
            id: 1,
            comments: []
        },
        match: {
            params: {}
        },
        history: {
            push: jest.fn(),
            goBack: jest.fn()
        },
        onGetPost: jest.fn(),
        onUpdatePostComment: jest.fn(),
        onDeletePost: jest.fn(),
        onAddPostComment: jest.fn(),
        onDeletePostComment: jest.fn(),
        onVotePost: jest.fn(),
        onVotePostComment: jest.fn()
    }

    const enzymeWrapper = createMount()(<Router><PostDetails {...props} /></Router>)
    
    return {
        props,
        enzymeWrapper
    }
}

describe('<PostForm />', () => {

    it('renders without crashing', () => {
        const { enzymeWrapper } = setup()

        const div = document.createElement('div')
        ReactDOM.render(enzymeWrapper, div)
    })

    it('can handle get acronym', () => {
        const { enzymeWrapper } = setup()
        const instance = enzymeWrapper.find(PostDetails).instance();
        expect(instance.getAcronym('John Snow')).toEqual('JS')
    })

    it('should handle CloseEditCommentDialog', () => {
        const { enzymeWrapper } = setup()
        enzymeWrapper.setState({ open: true })
        enzymeWrapper.find(PostDetails).instance().handleCloseEditCommentDialog(true)
    })

    it('should handle handle delete post', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(PostDetails).instance().handleDelete(evt)
    })

    it('should handle handle add comment', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(PostDetails).instance().handleAddComment(evt)
    })

    it('should handle go back history', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(PostDetails).instance().handleBack(evt)
    })

    it('should handle cancel comment', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(PostDetails).instance().handleCancelComment(evt)
    })

    it('should handle reply comment', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(PostDetails).instance().handleReplyComment(evt)
    })

    it('should handle open edit comment dialog', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(PostDetails).instance().handleOpenEditCommentDialog(evt, 'dummy comment')
    })

    it('should handle delete comment', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(PostDetails).instance().handleDeleteComment(evt, 1)
    })

    it('should handle vote post', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(PostDetails).instance().handleVotePost(evt, 1, 'upVote')
    })

    it('should handle vote comment', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(PostDetails).instance().handleVoteComment(evt, 1, 'upVote')
    })

    it('should map dispatch to props', () => {

        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).onGetPost();
        expect(dispatch.mock.calls[0][0]).toEqual(getPostRequested());
        
        mapDispatchToProps(dispatch).onVotePost();
        expect(dispatch.mock.calls[1][0]).toEqual(votePostRequested());
        
        mapDispatchToProps(dispatch).onDeletePost();
        expect(dispatch.mock.calls[2][0]).toEqual(deletePostRequested());
        
        mapDispatchToProps(dispatch).onAddPostComment();
        expect(dispatch.mock.calls[3][0]).toEqual(addPostCommentRequested());
        
        mapDispatchToProps(dispatch).onUpdatePostComment();
        expect(dispatch.mock.calls[4][0]).toEqual(updatePostCommentRequested());
        
        mapDispatchToProps(dispatch).onDeletePostComment();
        expect(dispatch.mock.calls[5][0]).toEqual(deletePostCommentRequested());
        
        mapDispatchToProps(dispatch).onVotePostComment();
        expect(dispatch.mock.calls[6][0]).toEqual(votePostCommentRequested());

    })
})
