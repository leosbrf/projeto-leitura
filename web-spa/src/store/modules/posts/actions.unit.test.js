import * as actions from './actions'
import * as actionTypes from './actionTypes'

describe('Posts action creators', () => {
    it('can dispatch FETCH_ALL_POSTS_REQUESTED', () => {
        expect(actions.fetchAllPostsRequested()).toEqual({
            type: actionTypes.FETCH_ALL_POSTS_REQUESTED
        })
    })

    it('can dispatch FETCH_ALL_POSTS_START', () => {
        expect(actions.fetchAllPostsStart()).toEqual({
            type: actionTypes.FETCH_ALL_POSTS_START
        })
    })

    it('can dispatch FETCH_ALL_POSTS_SUCCESS', () => {
        expect(actions.fetchAllPostsSuccess()).toEqual({
            type: actionTypes.FETCH_ALL_POSTS_SUCCESS
        })
    })

    it('can dispatch FETCH_ALL_POSTS_FAILED', () => {
        expect(actions.fetchAllPostsFailed()).toEqual({
            type: actionTypes.FETCH_ALL_POSTS_FAILED
        })
    })

    /********** */
    /********** */

    it('can dispatch ADD_POST_REQUESTED', () => {
        expect(actions.addPostRequested()).toEqual({
            type: actionTypes.ADD_POST_REQUESTED
        })
    })

    it('can dispatch ADD_POST_START', () => {
        expect(actions.addPostStart()).toEqual({
            type: actionTypes.ADD_POST_START
        })
    })

    it('can dispatch ADD_POST_SUCCESS', () => {
        expect(actions.addPostSuccess()).toEqual({
            type: actionTypes.ADD_POST_SUCCESS
        })
    })

    it('can dispatch ADD_POST_FAILED', () => {
        expect(actions.addPostFailed()).toEqual({
            type: actionTypes.ADD_POST_FAILED
        })
    })

    it('can dispatch UPDATE_POST_REQUESTED', () => {
        expect(actions.updatePostRequested()).toEqual({
            type: actionTypes.UPDATE_POST_REQUESTED
        })
    })

    it('can dispatch UPDATE_POST_START', () => {
        expect(actions.updatePostStart()).toEqual({
            type: actionTypes.UPDATE_POST_START
        })
    })

    it('can dispatch UPDATE_POST_SUCCESS', () => {
        expect(actions.updatePostSuccess()).toEqual({
            type: actionTypes.UPDATE_POST_SUCCESS
        })
    })

    it('can dispatch UPDATE_POST_FAILED', () => {
        expect(actions.updatePostFailed()).toEqual({
            type: actionTypes.UPDATE_POST_FAILED
        })
    })

    it('can dispatch GET_POST_REQUESTED', () => {
        expect(actions.getPostRequested()).toEqual({
            type: actionTypes.GET_POST_REQUESTED
        })
    })

    it('can dispatch GET_POST_START', () => {
        expect(actions.getPostStart()).toEqual({
            type: actionTypes.GET_POST_START
        })
    })

    it('can dispatch GET_POST_SUCCESS', () => {
        expect(actions.getPostSuccess()).toEqual({
            type: actionTypes.GET_POST_SUCCESS
        })
    })

    it('can dispatch GET_POST_FAILED', () => {
        expect(actions.getPostFailed()).toEqual({
            type: actionTypes.GET_POST_FAILED
        })
    })

    it('can dispatch VOTE_POST_REQUESTED', () => {
        expect(actions.votePostRequested()).toEqual({
            type: actionTypes.VOTE_POST_REQUESTED
        })
    })

    it('can dispatch VOTE_POST_START', () => {
        expect(actions.votePostStart()).toEqual({
            type: actionTypes.VOTE_POST_START
        })
    })

    it('can dispatch VOTE_POST_SUCCESS', () => {
        expect(actions.votePostSuccess()).toEqual({
            type: actionTypes.VOTE_POST_SUCCESS
        })
    })

    it('can dispatch VOTE_POST_FAILED', () => {
        expect(actions.votePostFailed()).toEqual({
            type: actionTypes.VOTE_POST_FAILED
        })
    })

    it('can dispatch DELETE_POST_REQUESTED', () => {
        expect(actions.deletePostRequested()).toEqual({
            type: actionTypes.DELETE_POST_REQUESTED
        })
    })

    it('can dispatch DELETE_POST_START', () => {
        expect(actions.deletePostStart()).toEqual({
            type: actionTypes.DELETE_POST_START
        })
    })

    it('can dispatch DELETE_POST_SUCCESS', () => {
        expect(actions.deletePostSuccess()).toEqual({
            type: actionTypes.DELETE_POST_SUCCESS
        })
    })

    it('can dispatch DELETE_POST_FAILED', () => {
        expect(actions.deletePostFailed()).toEqual({
            type: actionTypes.DELETE_POST_FAILED
        })
    })

    it('can dispatch ADD_POSTCOMMENT_REQUESTED', () => {
        expect(actions.addPostCommentRequested()).toEqual({
            type: actionTypes.ADD_POSTCOMMENT_REQUESTED
        })
    })

    it('can dispatch ADD_POSTCOMMENT_START', () => {
        expect(actions.addPostCommentStart()).toEqual({
            type: actionTypes.ADD_POSTCOMMENT_START
        })
    })

    it('can dispatch ADD_POSTCOMMENT_SUCCESS', () => {
        expect(actions.addPostCommentSuccess()).toEqual({
            type: actionTypes.ADD_POSTCOMMENT_SUCCESS
        })
    })

    it('can dispatch ADD_POSTCOMMENT_FAILED', () => {
        expect(actions.addPostCommentFailed()).toEqual({
            type: actionTypes.ADD_POSTCOMMENT_FAILED
        })
    })

    it('can dispatch UPDATE_POSTCOMMENT_REQUESTED', () => {
        expect(actions.updatePostCommentRequested()).toEqual({
            type: actionTypes.UPDATE_POSTCOMMENT_REQUESTED
        })
    })

    it('can dispatch UPDATE_POSTCOMMENT_START', () => {
        expect(actions.updatePostCommentStart()).toEqual({
            type: actionTypes.UPDATE_POSTCOMMENT_START
        })
    })

    it('can dispatch UPDATE_POSTCOMMENT_SUCCESS', () => {
        expect(actions.updatePostCommentSuccess()).toEqual({
            type: actionTypes.UPDATE_POSTCOMMENT_SUCCESS
        })
    })

    it('can dispatch UPDATE_POSTCOMMENT_FAILED', () => {
        expect(actions.updatePostCommentFailed()).toEqual({
            type: actionTypes.UPDATE_POSTCOMMENT_FAILED
        })
    })

    it('can dispatch DELETE_POSTCOMMENT_REQUESTED', () => {
        expect(actions.deletePostCommentRequested()).toEqual({
            type: actionTypes.DELETE_POSTCOMMENT_REQUESTED
        })
    })

    it('can dispatch DELETE_POSTCOMMENT_START', () => {
        expect(actions.deletePostCommentStart()).toEqual({
            type: actionTypes.DELETE_POSTCOMMENT_START
        })
    })

    it('can dispatch DELETE_POSTCOMMENT_SUCCESS', () => {
        expect(actions.deletePostCommentSuccess()).toEqual({
            type: actionTypes.DELETE_POSTCOMMENT_SUCCESS
        })
    })

    it('can dispatch DELETE_POSTCOMMENT_FAILED', () => {
        expect(actions.deletePostCommentFailed()).toEqual({
            type: actionTypes.DELETE_POSTCOMMENT_FAILED
        })
    })

    it('can dispatch VOTE_POSTCOMMENT_REQUESTED', () => {
        expect(actions.votePostCommentRequested()).toEqual({
            type: actionTypes.VOTE_POSTCOMMENT_REQUESTED
        })
    })

    it('can dispatch VOTE_POSTCOMMENT_START', () => {
        expect(actions.votePostCommentStart()).toEqual({
            type: actionTypes.VOTE_POSTCOMMENT_START
        })
    })

    it('can dispatch VOTE_POSTCOMMENT_SUCCESS', () => {
        expect(actions.votePostCommentSuccess()).toEqual({
            type: actionTypes.VOTE_POSTCOMMENT_SUCCESS
        })
    })

    it('can dispatch VOTE_POSTCOMMENT_FAILED', () => {
        expect(actions.votePostCommentFailed()).toEqual({
            type: actionTypes.VOTE_POSTCOMMENT_FAILED
        })
    })


})