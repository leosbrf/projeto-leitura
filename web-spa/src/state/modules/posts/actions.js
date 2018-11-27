import * as types from './actionTypes'

export const fetchAllPostsRequested = (categoryName, sortOptions) => ({ type: types.FETCH_ALL_POSTS_REQUESTED, categoryName: categoryName, sortOptions: sortOptions })
export const fetchAllPostsStart = () => ({ type: types.FETCH_ALL_POSTS_START })
export const fetchAllPostsSuccess = (posts, sortOptions) => ({ type: types.FETCH_ALL_POSTS_SUCCESS, posts: posts, sortOptions: sortOptions })
export const fetchAllPostsFailed = (error) => ({ type: types.FETCH_ALL_POSTS_FAILED, error: error })

export const addPostRequested = (post) => ({ type: types.ADD_POST_REQUESTED, post: post })
export const addPostStart = () => ({ type: types.ADD_POST_START })
export const addPostSuccess = () => ({ type: types.ADD_POST_SUCCESS })
export const addPostFailed = (error) => ({ type: types.ADD_POST_FAILED, error: error })

export const updatePostRequested = (post) => ({ type: types.UPDATE_POST_REQUESTED, post: post })
export const updatePostStart = () => ({ type: types.UPDATE_POST_START })
export const updatePostSuccess = () => ({ type: types.UPDATE_POST_SUCCESS })
export const updatePostFailed = (error) => ({ type: types.UPDATE_POST_FAILED, error: error })

export const getPostRequested = (id) => ({ type: types.GET_POST_REQUESTED, id: id })
export const getPostStart = () => ({ type: types.GET_POST_START })
export const getPostSuccess = (post, comments) => ({ type: types.GET_POST_SUCCESS, post: post, comments: comments })
export const getPostFailed = (error) => ({ type: types.GET_POST_FAILED, error: error })

export const votePostRequested = (id, vote) => ({ type: types.VOTE_POST_REQUESTED, id: id, vote: vote })
export const votePostStart = () => ({ type: types.VOTE_POST_START })
export const votePostSuccess = (post) => ({ type: types.VOTE_POST_SUCCESS, post: post })
export const votePostFailed = (error) => ({ type: types.VOTE_POST_FAILED, error: error })

export const deletePostRequested = (id) => ({ type: types.DELETE_POST_REQUESTED, id: id })
export const deletePostStart = () => ({ type: types.DELETE_POST_START })
export const deletePostSuccess = () => ({ type: types.DELETE_POST_SUCCESS })
export const deletePostFailed = (error) => ({ type: types.DELETE_POST_FAILED, error: error })

export const addPostCommentRequested = (comment) => ({ type: types.ADD_POSTCOMMENT_REQUESTED, comment: comment })
export const addPostCommentStart = () => ({ type: types.ADD_POSTCOMMENT_START })
export const addPostCommentSuccess = (comment) => ({ type: types.ADD_POSTCOMMENT_SUCCESS, comment: comment })
export const addPostCommentFailed = (error) => ({ type: types.ADD_POSTCOMMENT_FAILED, error: error })

export const updatePostCommentRequested = (comment) => ({ type: types.UPDATE_POSTCOMMENT_REQUESTED, comment: comment })
export const updatePostCommentStart = () => ({ type: types.UPDATE_POSTCOMMENT_START })
export const updatePostCommentSuccess = (comment) => ({ type: types.UPDATE_POSTCOMMENT_SUCCESS, comment: comment })
export const updatePostCommentFailed = (error) => ({ type: types.UPDATE_POSTCOMMENT_FAILED, error: error })

export const deletePostCommentRequested = (id) => ({ type: types.DELETE_POSTCOMMENT_REQUESTED, id: id })
export const deletePostCommentStart = () => ({ type: types.DELETE_POSTCOMMENT_START })
export const deletePostCommentSuccess = (id) => ({ type: types.DELETE_POSTCOMMENT_SUCCESS, id: id })
export const deletePostCommentFailed = (error) => ({ type: types.DELETE_POSTCOMMENT_FAILED, error: error })

export const votePostCommentRequested = (id, vote) => ({ type: types.VOTE_POSTCOMMENT_REQUESTED, id: id, vote: vote })
export const votePostCommentStart = () => ({ type: types.VOTE_POSTCOMMENT_START })
export const votePostCommentSuccess = (comment) => ({ type: types.VOTE_POSTCOMMENT_SUCCESS, comment: comment })
export const votePostCommentFailed = (error) => ({ type: types.VOTE_POSTCOMMENT_FAILED, error: error })