import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

describe('Root container', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Root />, div)
    })
})
