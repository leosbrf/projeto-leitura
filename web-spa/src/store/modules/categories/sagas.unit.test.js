import { call, put } from 'redux-saga/effects'
import * as actions from './actions'
import * as sagas from './sagas'
import readableDataService from '../../../shared/services/data.service'

describe('Categories sagas', () => {

    let fetchAllCategoriesGenerator = sagas.fetchAllCategoriesSaga()
    let categories = [{ name: 'dummy', path: 'dummy' }]
    let error = { errorMessage: 'something went wrong' }

    it('should yield action fetchAllCategoriesStart', () => {
        const expected = put(actions.fetchAllCategoriesStart())
        const result = fetchAllCategoriesGenerator.next().value
        expect(result).toEqual(expected)
    })

    it('should yield a call to API GET /categories', () => {
        const expected = call(readableDataService.get, '/categories')
        const result = fetchAllCategoriesGenerator.next().value
        expect(result).toEqual(expected)
    })

    it('should yield action fetchAllCategoriesSuccess', () => {
        const expected = put(actions.fetchAllCategoriesSuccess(categories))
        const result = fetchAllCategoriesGenerator.next({ categories }).value
        expect(result).toEqual(expected);
    })

    it('should have finished the saga', () => {
        const result = fetchAllCategoriesGenerator.next().done
        expect(result).toBeTruthy
    })

    it('should yield action fetchAllCategoriesFailed when something fails', () => {
        //the yield inside the catch is an alternative flow and must be tested when expected is an error
        const generator = sagas.fetchAllCategoriesSaga()
        const expected = put(actions.fetchAllCategoriesFailed(error))
        generator.next().value //it must go at least one iteration, otherwise throw will not work
        const result = generator.throw(error).value //simulates a fail
        expect(result).toEqual(expected)
        expect(generator.next().done).toBeTruthy
    })

})