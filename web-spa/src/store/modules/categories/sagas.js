
import { call, put } from 'redux-saga/effects'
import readableDataService from '../../../shared/services/data.service'
import { fetchAllCategoriesStart, fetchAllCategoriesSuccess, fetchAllCategoriesFailed } from './actions'

export function* fetchAllCategoriesSaga() {
    try {
        yield put(fetchAllCategoriesStart())
        const { categories } = yield call(readableDataService.get, '/categories')
        yield put(fetchAllCategoriesSuccess(categories))

    } catch (error) {
        yield put(fetchAllCategoriesFailed(error))
    }
}
