/**
 * 
 * @param {collection that is going to be ordered} collection 
 * @param {field or attribute used for ordering} field 
 * @param {ordering criteria} order 
 */
export const sortility = (collection, field, order) => {
    let sortedCollection = [...collection]
    if (order === 'asc') {
        sortedCollection = sortedCollection.sort((a, b) => {
            return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        });
    } else {
        sortedCollection = sortedCollection.sort((a, b) => {
            return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
        });
    }

    return sortedCollection
}