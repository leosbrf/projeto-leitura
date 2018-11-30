import { call, put } from 'redux-saga/effects'
import readableDataService from '../../../shared/services/data.service'
import {
    fetchAllPostsStart, fetchAllPostsSuccess, fetchAllPostsFailed,
    addPostStart, addPostSuccess, addPostFailed,
    updatePostStart, updatePostSuccess, updatePostFailed,
    getPostStart, getPostSuccess, getPostFailed,
    votePostStart, votePostSuccess, votePostFailed,
    deletePostStart, deletePostSuccess, deletePostFailed,
    addPostCommentStart, addPostCommentSuccess, addPostCommentFailed,
    updatePostCommentStart, updatePostCommentSuccess, updatePostCommentFailed,
    deletePostCommentStart, deletePostCommentSuccess, deletePostCommentFailed,
    votePostCommentStart, votePostCommentSuccess, votePostCommentFailed,
} from './actions'

/*
* Sagas that triggers other default events. This approach is flexible 
* and at the same time gives me more control on the flow.
*/

export function* fetchAllPostsSaga(action) {
    try {
        yield put(fetchAllPostsStart())

        let posts = null

        if (action.categoryName) {
            posts = yield call(readableDataService.get, `/${action.categoryName}/posts`)
        } else {
            posts = yield call(readableDataService.get, '/posts')
        }
        yield put(fetchAllPostsSuccess(posts, action.sortOptions))

    } catch (error) {
        yield put(fetchAllPostsFailed(error))
    }
}

export function* addPostSaga(action) {
    try {
        yield put(addPostStart())
        yield call(readableDataService.post, '/posts', action.post)
        yield put(addPostSuccess())
    } catch (error) {
        yield put(addPostFailed())
    }
}

export function* updatePostSaga(action) {
    try {
        yield put(updatePostStart())
        yield call(readableDataService.put, `/posts/${action.post.id}`, action.post)
        yield put(updatePostSuccess())
    } catch (error) {
        yield put(updatePostFailed())
    }
}

export function* getPostSaga(action) {
    try {
        yield put(getPostStart())
        const post = yield call(readableDataService.get, `/posts/${action.id}`)
        const comments = yield call(readableDataService.get, `/posts/${action.id}/comments`)
        yield put(getPostSuccess(post, comments))
    } catch (error) {
        yield put(getPostFailed())
    }
}

export function* votePostSaga(action) {
    try {       
        yield put(votePostStart())
        yield call(readableDataService.post, `/posts/${action.id}`, { option: action.vote })
        const post = yield call(readableDataService.get, `/posts/${action.id}`)
        yield put(votePostSuccess(post))
    } catch (error) {
        yield put(votePostFailed())
    }
}

export function* deletePostSaga(action) {
    try {
        yield put(deletePostStart())
        yield call(readableDataService.delete, `/posts/${action.id}`)
        yield put(deletePostSuccess())
    } catch (error) {
        yield put(deletePostFailed())
    }
}

export function* addPostCommentSaga(action) {
    try {        
        yield put(addPostCommentStart())
        yield call(readableDataService.post, '/comments', action.comment)
        yield put(addPostCommentSuccess(action.comment))
    } catch (error) {
        yield put(addPostCommentFailed())
    }
}

export function* updatePostCommentSaga(action) {
    try {
        yield put(updatePostCommentStart())
        yield call(readableDataService.put, `/comments/${action.comment.id}`, { timestamp: action.comment.timestamp, body: action.comment.body })
        yield put(updatePostCommentSuccess(action.comment))
    } catch (error) {
        yield put(updatePostCommentFailed())
    }
}

export function* deletePostCommentSaga(action) {
    try {
        yield put(deletePostCommentStart())
        yield call(readableDataService.delete, `/comments/${action.id}`)
        yield put(deletePostCommentSuccess(action.id))
    } catch (error) {
        yield put(deletePostCommentFailed())
    }
}

export function* votePostCommentSaga(action) {
    try {       
        yield put(votePostCommentStart())
        yield call(readableDataService.post, `/comments/${action.id}`, { option: action.vote })
        const comment = yield call(readableDataService.get, `/comments/${action.id}`)
        yield put(votePostCommentSuccess(comment))
    } catch (error) {
        yield put(votePostCommentFailed())
    }
}