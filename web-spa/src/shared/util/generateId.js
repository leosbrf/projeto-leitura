/**
 * Generates unique IDs for this application
 */
const generateId = () => ('_' + Math.random().toString(36).substr(2, 9))

export default generateId