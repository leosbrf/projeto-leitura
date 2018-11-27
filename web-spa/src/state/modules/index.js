import { all, takeLatest } from 'redux-saga/effects'
import * as categoriesTypes from './categories/actionTypes'
import * as categoriesSaga from './categories/sagas'
import * as postsTypes from './posts/actionTypes'
import * as postsSaga from './posts/sagas'

const categoriesWatchers = [
    takeLatest(categoriesTypes.FETCH_ALL_CATEGORIES_REQUESTED, categoriesSaga.fetchAllCategoriesSaga)
]

const postsWatchers = [
    takeLatest(postsTypes.FETCH_ALL_POSTS_REQUESTED, postsSaga.fetchAllPostsSaga),
    takeLatest(postsTypes.ADD_POST_REQUESTED, postsSaga.addPostSaga),
    takeLatest(postsTypes.UPDATE_POST_REQUESTED, postsSaga.updatePostSaga),
    takeLatest(postsTypes.GET_POST_REQUESTED, postsSaga.getPostSaga),
    takeLatest(postsTypes.VOTE_POST_REQUESTED, postsSaga.votePostSaga),
    takeLatest(postsTypes.DELETE_POST_REQUESTED, postsSaga.deletePostSaga),
    takeLatest(postsTypes.ADD_POSTCOMMENT_REQUESTED, postsSaga.addPostCommentSaga),
    takeLatest(postsTypes.UPDATE_POSTCOMMENT_REQUESTED, postsSaga.updatePostCommentSaga),
    takeLatest(postsTypes.DELETE_POSTCOMMENT_REQUESTED, postsSaga.deletePostCommentSaga),
    takeLatest(postsTypes.VOTE_POSTCOMMENT_REQUESTED, postsSaga.votePostCommentSaga)
]

export default function* rootWatcher() {
    yield all([
        ...categoriesWatchers,
        ...postsWatchers
    ])
}