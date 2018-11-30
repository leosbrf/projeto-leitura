import categoriesReducer from './reducers'
import * as types from './actionTypes'

describe('Categories reducer', () => {
    const initialState = {
        categories: []
    }

    it('has a default state', () => {
        expect(categoriesReducer(undefined, { type: 'unexpected' }))
            .toEqual(initialState)
    })

    it('can handle FETCH_ALL_CATEGORIES_START', () => {
        expect(categoriesReducer(undefined, {
            type: types.FETCH_ALL_CATEGORIES_START
        }))
            .toEqual({
                ...initialState
            })
    })

    it('can handle FETCH_ALL_CATEGORIES_SUCCESS', () => {
        expect(categoriesReducer(undefined, {
            type: types.FETCH_ALL_CATEGORIES_SUCCESS,
            categories: [{
                name: 'dummy',
                path: 'dummy'
            }]
        }))
            .toEqual({
                ...initialState,
                categories: [{
                    name: 'dummy',
                    path: 'dummy'
                }]
            })
    })

    it('can handle FETCH_ALL_CATEGORIES_FAILED', () => {
        expect(categoriesReducer(undefined, {
            type: types.FETCH_ALL_CATEGORIES_FAILED,
            error: {
                message: 'dummy error'
            }
        }))
            .toEqual({
                ...initialState,
                error: {
                    message: 'dummy error'
                }
            })
    })
})