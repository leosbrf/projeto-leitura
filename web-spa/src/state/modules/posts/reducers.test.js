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
})