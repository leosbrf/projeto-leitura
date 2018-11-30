import generateId from "./generateId"

describe('GenerateId from utilities', () => {

    it('should generate unique ids each 10.000 tries', () => {
        const ids = []
        for (let index = 0; index < 10000; index++) {
            let id = generateId()

            if (ids.indexOf(id) === -1)
                ids.push(id)
        }
        expect(ids)
            .toHaveLength(10000)
    })
})