import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter as Router } from 'react-router-dom';
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { PostDetails } from './PostDetails'

configure({ adapter: new Adapter() })

const setup = () => {
    const props = {
        classes: {},
        post: {
            comments: []
        },
        match: {
            params: {}
        },
        onGetPost: jest.fn()
    }

    const enzymeWrapper = mount(<Router><PostDetails {...props} /></Router>)

    return {
        props,
        enzymeWrapper
    }
}

describe('<PostForm />', () => {

    it('renders without crashing', () => {
        const { enzymeWrapper } = setup()

        const div = document.createElement('div')
        ReactDOM.render(enzymeWrapper, div)
    })

    it('can handle get acronym', () => {
        const { enzymeWrapper } = setup()
        const instance = enzymeWrapper.find(PostDetails).instance();
        expect(instance.getAcronym('John Snow')).toEqual('JS')
    })
})
