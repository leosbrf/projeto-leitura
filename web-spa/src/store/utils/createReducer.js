/*
Cria o reducer como um objeto chave/valor. Abordagem para deixar o código mais limpo e evitar o switch case.
*/
export default (initialState) => (reducerMap) => (state = initialState, action) => {
    const reducer = reducerMap[action.type]
    return reducer ? reducer(state, action) : state
}