import * as types from './actionTypes'
import createReducer from '../../utils/createReducer'
import { sortility } from "../../../shared/util/sortilities";

const initialState = {
    posts: [],
    post: null,
    isLoading: false,
    postNotFound: false
}

/*
* When necessary, extracts some utility functions to keep code readable and reusable (i.e: "handleSavePostCommentSuccess")
* is being used two times for two different actions.
*/
const postsReducer = createReducer(initialState)({
    [types.FETCH_ALL_POSTS_REQUESTED]: (state, action) => ({ ...state, post: null, isLoading: true }),
    [types.FETCH_ALL_POSTS_SUCCESS]: (state, action) => (handleFetchAllPostsSuccess(state, action)),
    [types.FETCH_ALL_POSTS_FAILED]: (state, action) => ({ ...state, post: null, isLoading: false }),
    [types.GET_POST_REQUESTED]: (state, action) => ({ ...state, post: null, isLoading: true }),
    [types.GET_POST_SUCCESS]: (state, action) => (handleGetPostSuccess(state, action)),
    [types.GET_POST_FAILED]: (state, action) => (handleGetPostFailed(state, action)),
    [types.VOTE_POST_SUCCESS]: (state, action) => (handleVotePostSuccess(state, action)),
    [types.ADD_POSTCOMMENT_SUCCESS]: (state, action) => (handleSavePostCommentSuccess(state, action)),
    [types.UPDATE_POSTCOMMENT_SUCCESS]: (state, action) => (handleSavePostCommentSuccess(state, action)),
    [types.DELETE_POSTCOMMENT_SUCCESS]: (state, action) => (handleDeletePostCommentSuccess(state, action)),
    [types.VOTE_POSTCOMMENT_SUCCESS]: (state, action) => (handleSavePostCommentSuccess(state, action))
})

const handleFetchAllPostsSuccess = (state, action) => {

    const { sortOptions: { sortingAttribute, sortingOrder } } = action

    const sortedPosts = sortility(action.posts, sortingAttribute, sortingOrder)

    return {
        ...state,
        posts: sortedPosts,
        isLoading: false
    }
}

const handleGetPostSuccess = (state, action) => {

    //we use a map for the comments on our store, 
    //because operations turns to be easier and readable
    const commentsHashMap =
        sortility(action.comments, 'voteScore', 'desc')
            .reduce((map, comment) => {
                map[comment.id] = comment
                return map
            }, {})

    return {
        ...state,
        post: {
            ...action.post,
            comments: commentsHashMap
        },
        postNotFound: action.post ? false : true,
        isLoading: false
    }
}

const handleGetPostFailed = (state, action) => {
    return {
        ...state,
        post: null,
        postNotFound: true,
        isLoading: false
    }
}

const handleVotePostSuccess = (state, action) => {

    const { post } = action
    let posts = [...state.posts]

    let updatedPost = { ...posts.find(p => p.id === post.id) }

    //if the updated post is not found in the posts array, do nothing! 
    if (updatedPost) {
        updatedPost.voteScore = post.voteScore
        posts[posts.findIndex(p => p.id === updatedPost.id)] = updatedPost
    }

    return {
        ...state,
        posts: posts,
        post: updatedPost
    }
}

const handleSavePostCommentSuccess = (state, action) => {

    let comments = null

    //adds or update the post in the state collection of the post comments.
    if (state.post) {
        comments = { ...state.post.comments }

        comments[action.comment.id] = action.comment

    }

    return {
        ...state,
        post: {
            ...state.post,
            commentCount: comments ? Object.keys(comments).length : 0,
            comments
        }
    }
}

const handleDeletePostCommentSuccess = (state, action) => {

    if (!action.id)
        return { ...state }

    const comments = { ...state.post.comments }

    delete comments[action.id]

    return {
        ...state,
        post: {
            ...state.post,
            commentCount: comments ? Object.keys(comments).length : 0,
            comments
        }
    }
}

export default postsReducer