import * as types from './actionTypes'

export const fetchAllCategoriesRequested = () => ({ type: types.FETCH_ALL_CATEGORIES_REQUESTED})
export const fetchAllCategoriesStart = () => ({ type: types.FETCH_ALL_CATEGORIES_START })
export const fetchAllCategoriesSuccess = (categories) => ({ type: types.FETCH_ALL_CATEGORIES_SUCCESS, categories: categories })
export const fetchAllCategoriesFailed = (error) => ({ type: types.FETCH_ALL_CATEGORIES_FAILED, error: error })