import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import Root from './Root'
import store from '../store/index'

describe('Root container', () => {

    const app = (
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    )

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Provider store={store}>{app}</Provider>, div)
    })
})
