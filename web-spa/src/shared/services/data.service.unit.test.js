import readableDataService from './data.service'

describe('readable data service response', () => {
    it('should handle axios success response', () => {
        const expected = 'foo'
        const result = readableDataService.interceptors.response.handlers[0].fulfilled({ data: 'foo' })
        expect(result).toBe(expected)
    })

    it('should handle axios rejected response', () => {
        const result = readableDataService.interceptors.response.handlers[0].rejected({
            response: {
                statusText: 'NotFound',
                status: 404,
                data: { message: 'Page not found' }
            }
        })

        expect(result).rejects.toMatchObject({
            message: 'NotFound',
            statusCode: 404,
            data: { message: 'Page not found' }
        })
    })
})