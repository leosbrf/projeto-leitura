import postsReducer from './reducers'
import * as types from './actionTypes'

describe('Posts Reducer', () => {

    const initialState = {
        posts: [],
        post: null,
        isLoading: false,
        postNotFound: false
    }

    it('has a default state', () => {
        expect(postsReducer(undefined, { type: 'unexpected' }))
            .toEqual(initialState)
    })

    it('can handle FETCH_ALL_POSTS_REQUESTED', () => {
        expect(postsReducer(undefined, { type: types.FETCH_ALL_POSTS_REQUESTED }))
            .toEqual({
                ...initialState,
                isLoading: true,
            })
    })

    it('can handle FETCH_ALL_POSTS_SUCCESS', () => {
        expect(postsReducer(undefined, {
            type: types.FETCH_ALL_POSTS_SUCCESS,
            posts: ['dummy'],
            sortOptions: {
                sortingAttribute: null,
                sortingOrder: null
            }
        }))
            .toEqual({
                ...initialState,
                posts: ['dummy'],
                isLoading: false,
            })
    })

    it('can handle FETCH_ALL_POSTS_FAILED', () => {
        expect(postsReducer(undefined, { type: types.FETCH_ALL_POSTS_FAILED }))
            .toEqual({
                ...initialState,
                post: null,
                isLoading: false,
            })
    })

    it('can handle GET_POST_REQUESTED', () => {
        expect(postsReducer(undefined, { type: types.GET_POST_REQUESTED }))
            .toEqual({
                ...initialState,
                post: null,
                isLoading: true,
            })
    })

    it('can handle GET_POST_SUCCESS', () => {
        expect(postsReducer(undefined, {
            type: types.GET_POST_SUCCESS,
            post: { foo: 'bar' },
            comments: [{ id: 1, data: 'dummy' }]
        }))
            .toEqual({
                ...initialState,
                post: {
                    foo: 'bar',
                    comments: { 1: { id: 1, data: 'dummy' } }
                },
                isLoading: false,
            })
    })

    it('can handle GET_POST_FAILED', () => {
        expect(postsReducer(undefined, { type: types.GET_POST_FAILED }))
            .toEqual({
                ...initialState,
                post: null,
                isLoading: false,
            })
    })

    it('can handle VOTE_POST_SUCCESS', () => {
        expect(postsReducer({
            ...initialState,
            posts: [{ id: 1, voteScore: 1 }],
            post: { id: 1, voteScore: 1 }
        }, { type: types.VOTE_POST_SUCCESS, post: { id: 1, voteScore: 1 } }))
            .toEqual({
                ...initialState,
                posts: [{ id: 1, voteScore: 1 }],
                post: { id: 1, voteScore: 1 },
                isLoading: false,
            })
    })

    it('can handle ADD_POSTCOMMENT_SUCCESS', () => {
        expect(postsReducer({
            ...initialState,
            post: {
                comments: {}
            }
        }, { type: types.ADD_POSTCOMMENT_SUCCESS, comment: { id: 1, data: 'dummy' } }))
            .toEqual({
                ...initialState,
                post: {
                    comments: { 1: { id: 1, data: 'dummy' } }
                }
            })
    })

    it('can handle UPDATE_POSTCOMMENT_SUCCESS', () => {
        expect(postsReducer({
            ...initialState,
            post: {
                comments: {}
            }
        }, { type: types.UPDATE_POSTCOMMENT_SUCCESS, comment: { id: 1, data: 'dummy1' } }))
            .toEqual({
                ...initialState,
                post: {
                    comments: { 1: { id: 1, data: 'dummy1' } }
                }
            })
    })

    it('can handle DELETE_POSTCOMMENT_SUCCESS', () => {
        expect(postsReducer({
            ...initialState,
            post: {
                comments: { 1: { id: 1, data: 'dummy' } }
            }
        }, { type: types.DELETE_POSTCOMMENT_SUCCESS, id: 1 }))
            .toEqual({
                ...initialState,
                post: {
                    comments: {}
                }
            })
    })

    it('can handle action without id on DELETE_POSTCOMMENT_SUCCESS', () => {
        expect(postsReducer({
            ...initialState,
            post: {
                comments: { 1: { id: 1, data: 'dummy' } }
            }
        }, { type: types.DELETE_POSTCOMMENT_SUCCESS, id: 0 }))
            .toEqual({
                ...initialState,
                post: {
                    comments: { 1: { id: 1, data: 'dummy' } }
                }
            })
    })

    it('can handle VOTE_POSTCOMMENT_SUCCESS', () => {
        expect(postsReducer({
            ...initialState,
            post: {
                comments: {}
            }
        }, { type: types.VOTE_POSTCOMMENT_SUCCESS, comment: { id: 1, data: 'dummy1', voteScore: 1 } }))
            .toEqual({
                ...initialState,
                post: {
                    comments: { 1: { id: 1, data: 'dummy1', voteScore: 1 } }
                }
            })
    })

})