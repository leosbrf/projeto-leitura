import { sortility } from "./sortilities"

describe('Sortilities from utilities', () => {

    const dummyCollection = [
        { name: 'John' },
        { name: 'Abigail' },
        { name: 'Lucy' }
    ]

    it('should sort in ascendent order by field', () => {
        expect(sortility(dummyCollection, 'name', 'asc'))
            .toEqual([
                { name: 'Abigail' },
                { name: 'John' },
                { name: 'Lucy' }
            ])
    })

    it('should sort in descendent order by field', () => {
        expect(sortility(dummyCollection, 'name', 'desc'))
            .toEqual([
                { name: 'Lucy' },
                { name: 'John' },
                { name: 'Abigail' }
            ])
    })
})