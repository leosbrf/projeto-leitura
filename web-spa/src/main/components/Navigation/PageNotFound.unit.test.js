import React from 'react'
import ReactDOM from 'react-dom'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PageNotFound from './PageNotFound'


configure({ adapter: new Adapter() })

const setup = () => {
    const props = {
        classes: {},
    }

    const enzymeWrapper = mount(<PageNotFound {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('<PageNotFound />', () => {
    it('should render without crash', () => {
        const { enzymeWrapper } = setup()

        const div = document.createElement('div')
        ReactDOM.render(enzymeWrapper, div)
    })
})