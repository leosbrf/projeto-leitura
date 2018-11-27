import * as types from './actionTypes'
import createReducer from '../../utils/createReducer'

const initialState = {
    categories: []
}

const categoriesReducer = createReducer(initialState)({
    [types.FETCH_ALL_CATEGORIES_START]: (state, action) => ({ ...state }),
    [types.FETCH_ALL_CATEGORIES_SUCCESS]: (state, action) => ({ ...state, categories: action.categories }),
    [types.FETCH_ALL_CATEGORIES_FAILED]: (state, action) => ({ ...state })
})

export default categoriesReducer