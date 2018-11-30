import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EditPost } from './EditPost'
import store from '../../../store'

configure({ adapter: new Adapter() })

const setup = () => {
    const props = {
        post: {},
        match: {
            params: {}
        },
        onGetPost: jest.fn()
    }

    const enzymeWrapper = mount(<Provider store={store}><EditPost {...props} /></Provider>)

    return {
        props,
        enzymeWrapper
    }
}

describe('<EditPost />', () => {

    it('renders component', () => {
        const { enzymeWrapper } = setup()

        const div = document.createElement('div')
        ReactDOM.render(enzymeWrapper, div)
    })
})
