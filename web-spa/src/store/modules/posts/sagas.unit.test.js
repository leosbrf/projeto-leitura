import { call, put } from 'redux-saga/effects'
import * as actions from './actions'
import * as sagas from './sagas'
import readableDataService from '../../../shared/services/data.service'

describe('Posts sagas', () => {

    describe('fetchAllPostsSaga', () => {

        let posts = [{ name: 'dummy', path: 'dummy' }]
        let error = { errorMessage: 'something went wrong' }
        const categoryName = 'dummy'
        const sortOptions = 'dummy'

        let fetchAllPostsSagaGenerator = sagas.fetchAllPostsSaga({ categoryName: categoryName, sortOptions })

        it('should yield action fetchAllPostsStart', () => {
            const expected = put(actions.fetchAllPostsStart())
            const result = fetchAllPostsSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API GET /:category/posts', () => {
            const expected = call(readableDataService.get, `/${categoryName}/posts`)
            const result = fetchAllPostsSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield action fetchAllPostsSuccess', () => {
            const expected = put(actions.fetchAllPostsSuccess(posts, sortOptions))
            const result = fetchAllPostsSagaGenerator.next(posts).value
            expect(result).toEqual(expected);
        })

        it('should have finished the saga', () => {
            const result = fetchAllPostsSagaGenerator.next().done
            expect(result).toBeTruthy
        })

        it('should yield action fetchAllPostsFailed when something fails', () => {
            //the yield inside the catch is an alternative flow and must be tested when expected is an error
            const generator = sagas.fetchAllPostsSaga()
            const expected = put(actions.fetchAllPostsFailed(error))
            generator.next().value //it must go at least one iteration, otherwise throw will not work
            const result = generator.throw(error).value //simulates a fail
            expect(result).toEqual(expected)
            expect(generator.next().done).toBeTruthy
        })
    })

    describe('addPostSaga', () => {

        let error = { errorMessage: 'something went wrong' }
        const post = { id: 'dummy' }

        let addPostSagaGenerator = sagas.addPostSaga({ post })

        it('should yield action addPostStart', () => {
            const expected = put(actions.addPostStart())
            const result = addPostSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API POST /posts', () => {
            const expected = call(readableDataService.post, '/posts', post)
            const result = addPostSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield action addPostSuccess', () => {
            const expected = put(actions.addPostSuccess())
            const result = addPostSagaGenerator.next().value
            expect(result).toEqual(expected);
        })

        it('should have finished the saga', () => {
            const result = addPostSagaGenerator.next().done
            expect(result).toBeTruthy
        })

        it('should yield action addPostFailed when something fails', () => {
            //the yield inside the catch is an alternative flow and must be tested when expected is an error
            const generator = sagas.addPostSaga()
            const expected = put(actions.addPostFailed(error))
            generator.next().value //it must go at least one iteration, otherwise throw will not work
            const result = generator.throw(error).value //simulates a fail
            expect(result).toEqual(expected)
            expect(generator.next().done).toBeTruthy
        })
    })

    describe('updatePostSaga', () => {

        let error = { errorMessage: 'something went wrong' }
        const post = { id: 'dummy' }

        let updatePostSagaGenerator = sagas.updatePostSaga({ post })

        it('should yield action updatePostStart', () => {
            const expected = put(actions.updatePostStart())
            const result = updatePostSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API PUT /posts/:id', () => {
            const expected = call(readableDataService.put, `/posts/${post.id}`, post)
            const result = updatePostSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield action updatePostSuccess', () => {
            const expected = put(actions.updatePostSuccess())
            const result = updatePostSagaGenerator.next().value
            expect(result).toEqual(expected);
        })

        it('should have finished the saga', () => {
            const result = updatePostSagaGenerator.next().done
            expect(result).toBeTruthy
        })

        it('should yield action updatePostFailed when something fails', () => {
            //the yield inside the catch is an alternative flow and must be tested when expected is an error
            const generator = sagas.updatePostSaga()
            const expected = put(actions.updatePostFailed(error))
            generator.next().value //it must go at least one iteration, otherwise throw will not work
            const result = generator.throw(error).value //simulates a fail
            expect(result).toEqual(expected)
            expect(generator.next().done).toBeTruthy
        })
    })

    describe('getPostSaga', () => {

        let error = { errorMessage: 'something went wrong' }
        const post = { id: 'dummy' }
        const comments = [{ id: 'dummy' }]

        let getPostSagaGenerator = sagas.getPostSaga({ id: post.id })

        it('should yield action getPostStart', () => {
            const expected = put(actions.getPostStart())
            const result = getPostSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API GET /posts/:id', () => {
            const expected = call(readableDataService.get, `/posts/${post.id}`)
            const result = getPostSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API GET /posts/:id/comments', () => {
            const expected = call(readableDataService.get, `/posts/${post.id}/comments`)
            const result = getPostSagaGenerator.next(post).value
            expect(result).toEqual(expected)
        })

        it('should yield action getPostSuccess', () => {
            const expected = put(actions.getPostSuccess(post, comments))
            const result = getPostSagaGenerator.next(comments).value
            expect(result).toEqual(expected);
        })

        it('should have finished the saga', () => {
            const result = getPostSagaGenerator.next().done
            expect(result).toBeTruthy
        })

        it('should yield action getPostFailed when something fails', () => {
            //the yield inside the catch is an alternative flow and must be tested when expected is an error
            const generator = sagas.getPostSaga()
            const expected = put(actions.getPostFailed(error))
            generator.next().value //it must go at least one iteration, otherwise throw will not work
            const result = generator.throw(error).value //simulates a fail
            expect(result).toEqual(expected)
            expect(generator.next().done).toBeTruthy
        })
    })

    describe('votePostSaga', () => {

        let error = { errorMessage: 'something went wrong' }
        const post = { id: 'dummy' }
        const comments = [{ id: 'dummy' }]

        let votePostSagaGenerator = sagas.votePostSaga({ id: post.id, vote: 'upVote' })

        it('should yield action votePostStart', () => {
            const expected = put(actions.votePostStart())
            const result = votePostSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API POST /posts/:id', () => {
            const expected = call(readableDataService.post, `/posts/${post.id}`, { option: 'upVote' })
            const result = votePostSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API GET /posts/:id', () => {
            const expected = call(readableDataService.get, `/posts/${post.id}`)
            const result = votePostSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield action votePostSuccess', () => {
            const expected = put(actions.votePostSuccess(post))
            const result = votePostSagaGenerator.next(post).value
            expect(result).toEqual(expected);
        })

        it('should have finished the saga', () => {
            const result = votePostSagaGenerator.next().done
            expect(result).toBeTruthy
        })

        it('should yield action votePostFailed when something fails', () => {
            //the yield inside the catch is an alternative flow and must be tested when expected is an error
            const generator = sagas.votePostSaga()
            const expected = put(actions.votePostFailed(error))
            generator.next().value //it must go at least one iteration, otherwise throw will not work
            const result = generator.throw(error).value //simulates a fail
            expect(result).toEqual(expected)
            expect(generator.next().done).toBeTruthy
        })
    })

    describe('deletePostSaga', () => {

        let error = { errorMessage: 'something went wrong' }
        const post = { id: 'dummy' }

        let deletePostSagaGenerator = sagas.deletePostSaga({ id: post.id })

        it('should yield action deletePostStart', () => {
            const expected = put(actions.deletePostStart())
            const result = deletePostSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API DELETE /posts', () => {
            const expected = call(readableDataService.delete, `/posts/${post.id}`)
            const result = deletePostSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield action deletePostSuccess', () => {
            const expected = put(actions.deletePostSuccess())
            const result = deletePostSagaGenerator.next().value
            expect(result).toEqual(expected);
        })

        it('should have finished the saga', () => {
            const result = deletePostSagaGenerator.next().done
            expect(result).toBeTruthy
        })

        it('should yield action deletePostFailed when something fails', () => {
            //the yield inside the catch is an alternative flow and must be tested when expected is an error
            const generator = sagas.deletePostSaga()
            const expected = put(actions.deletePostFailed(error))
            generator.next().value //it must go at least one iteration, otherwise throw will not work
            const result = generator.throw(error).value //simulates a fail
            expect(result).toEqual(expected)
            expect(generator.next().done).toBeTruthy
        })
    })

    describe('addPostCommentSaga', () => {

        let error = { errorMessage: 'something went wrong' }
        const comment = { id: 'dummy' }

        let addPostCommentSagaGenerator = sagas.addPostCommentSaga({ comment })

        it('should yield action addPostCommentStart', () => {
            const expected = put(actions.addPostCommentStart())
            const result = addPostCommentSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API POST /comments', () => {
            const expected = call(readableDataService.post, `/comments`, comment)
            const result = addPostCommentSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield action addPostCommentSuccess', () => {
            const expected = put(actions.addPostCommentSuccess(comment))
            const result = addPostCommentSagaGenerator.next(comment).value
            expect(result).toEqual(expected);
        })

        it('should have finished the saga', () => {
            const result = addPostCommentSagaGenerator.next().done
            expect(result).toBeTruthy
        })

        it('should yield action addPostCommentFailed when something fails', () => {
            //the yield inside the catch is an alternative flow and must be tested when expected is an error
            const generator = sagas.addPostCommentSaga()
            const expected = put(actions.addPostCommentFailed(error))
            generator.next().value //it must go at least one iteration, otherwise throw will not work
            const result = generator.throw(error).value //simulates a fail
            expect(result).toEqual(expected)
            expect(generator.next().done).toBeTruthy
        })
    })

    describe('updatePostCommentSaga', () => {

        let error = { errorMessage: 'something went wrong' }
        const comment = { id: 'dummy', timestamp: 'timestamp', body: 'body' }

        let updatePostCommentSagaGenerator = sagas.updatePostCommentSaga({ comment })

        it('should yield action updatePostCommentStart', () => {
            const expected = put(actions.updatePostCommentStart())
            const result = updatePostCommentSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API PUT /comments/:id', () => {
            const expected = call(readableDataService.put, `/comments/${comment.id}`, { timestamp: comment.timestamp, body: comment.body })
            const result = updatePostCommentSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield action updatePostCommentSuccess', () => {
            const expected = put(actions.updatePostCommentSuccess(comment))
            const result = updatePostCommentSagaGenerator.next().value
            expect(result).toEqual(expected);
        })

        it('should have finished the saga', () => {
            const result = updatePostCommentSagaGenerator.next().done
            expect(result).toBeTruthy
        })

        it('should yield action updatePostCommentFailed when something fails', () => {
            //the yield inside the catch is an alternative flow and must be tested when expected is an error
            const generator = sagas.updatePostCommentSaga()
            const expected = put(actions.updatePostCommentFailed(error))
            generator.next().value //it must go at least one iteration, otherwise throw will not work
            const result = generator.throw(error).value //simulates a fail
            expect(result).toEqual(expected)
            expect(generator.next().done).toBeTruthy
        })
    })

    describe('deletePostCommentSaga', () => {

        let error = { errorMessage: 'something went wrong' }
        const comment = { id: 'dummy' }

        let deletePostCommentSagaGenerator = sagas.deletePostCommentSaga({ id: comment.id })

        it('should yield action deletePostCommentStart', () => {
            const expected = put(actions.deletePostCommentStart())
            const result = deletePostCommentSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API DELETE /comments', () => {
            const expected = call(readableDataService.delete, `/comments/${comment.id}`)
            const result = deletePostCommentSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield action deletePostCommentSuccess', () => {
            const expected = put(actions.deletePostCommentSuccess(comment.id))
            const result = deletePostCommentSagaGenerator.next().value
            expect(result).toEqual(expected);
        })

        it('should have finished the saga', () => {
            const result = deletePostCommentSagaGenerator.next().done
            expect(result).toBeTruthy
        })

        it('should yield action deletePostCommentFailed when something fails', () => {
            //the yield inside the catch is an alternative flow and must be tested when expected is an error
            const generator = sagas.deletePostCommentSaga()
            const expected = put(actions.deletePostCommentFailed(error))
            generator.next().value //it must go at least one iteration, otherwise throw will not work
            const result = generator.throw(error).value //simulates a fail
            expect(result).toEqual(expected)
            expect(generator.next().done).toBeTruthy
        })
    })

    describe('votePostCommentSaga', () => {

        let error = { errorMessage: 'something went wrong' }
        const comment = { id: 'dummy' }

        let votePostCommentSagaGenerator = sagas.votePostCommentSaga({ id: comment.id, vote: 'upVote' })

        it('should yield action votePostCommentStart', () => {
            const expected = put(actions.votePostCommentStart())
            const result = votePostCommentSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API POST /comments/:id', () => {
            const expected = call(readableDataService.post, `/comments/${comment.id}`, { option: 'upVote' })
            const result = votePostCommentSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield a call to API GET /comments/:id', () => {
            const expected = call(readableDataService.get, `/comments/${comment.id}`)
            const result = votePostCommentSagaGenerator.next().value
            expect(result).toEqual(expected)
        })

        it('should yield action votePostCommentSuccess', () => {
            const expected = put(actions.votePostCommentSuccess(comment))
            const result = votePostCommentSagaGenerator.next(comment).value
            expect(result).toEqual(expected);
        })

        it('should have finished the saga', () => {
            const result = votePostCommentSagaGenerator.next().done
            expect(result).toBeTruthy
        })

        it('should yield action votePostCommentFailed when something fails', () => {
            //the yield inside the catch is an alternative flow and must be tested when expected is an error
            const generator = sagas.votePostCommentSaga()
            const expected = put(actions.votePostCommentFailed(error))
            generator.next().value //it must go at least one iteration, otherwise throw will not work
            const result = generator.throw(error).value //simulates a fail
            expect(result).toEqual(expected)
            expect(generator.next().done).toBeTruthy
        })
    })
})