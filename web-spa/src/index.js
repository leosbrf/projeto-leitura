import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSagaWatcher from './state/modules'
import categoriesReducer from './state/modules/categories/reducers'
import postsReducer from './state/modules/posts/reducers'
import { readableDataService } from './shared/services/data.service'
import Root from './main/Root'
import * as serviceWorker from './serviceWorker'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

const rootReducer = combineReducers({
    categories: categoriesReducer,
    posts: postsReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
))

sagaMiddleware.run(rootSagaWatcher)

readableDataService.interceptors.request.use(req => {
    req.headers = { 'Authorization': '"Bearer 12345667fgd5ge5ggdgdrkkl"' }
    return req
})

readableDataService.interceptors.response.use(
    res => {
        return res.data
    },
    (error) => {
        console.log(error);
    }
)

const app = (
    <BrowserRouter>
        <Root />
    </BrowserRouter>
)

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()