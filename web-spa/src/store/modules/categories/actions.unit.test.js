import * as actions from './actions'
import * as actionTypes from './actionTypes'

describe('Categories action creators', () => {
    it('can dispatch FETCH_ALL_CATEGORIES_REQUESTED', () => {
        expect(actions.fetchAllCategoriesRequested()).toEqual({
            type: actionTypes.FETCH_ALL_CATEGORIES_REQUESTED
        })
    })

    it('can dispatch FETCH_ALL_CATEGORIES_START', () => {
        expect(actions.fetchAllCategoriesStart()).toEqual({
            type: actionTypes.FETCH_ALL_CATEGORIES_START
        })
    })

    it('can dispatch FETCH_ALL_CATEGORIES_SUCCESS', () => {
        expect(actions.fetchAllCategoriesSuccess()).toEqual({
            type: actionTypes.FETCH_ALL_CATEGORIES_SUCCESS
        })
    })

    it('can dispatch FETCH_ALL_CATEGORIES_FAILED', () => {
        expect(actions.fetchAllCategoriesFailed()).toEqual({
            type: actionTypes.FETCH_ALL_CATEGORIES_FAILED
        })
    })


})