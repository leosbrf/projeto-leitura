import React from 'react'
import ReactDOM from 'react-dom'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { PostForm } from './PostForm'

configure({ adapter: new Adapter() })

const setup = () => {
    const props = {
        post: {
            id: 1
        },
        classes: {},
        categories: [],
        handleBack: jest.fn(),
        handleSubmit: jest.fn(),
        onPresentSnackbar: jest.fn()
    }

    const enzymeWrapper = mount(<PostForm {...props} />)

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

    it('should render title textfield element', () => {
        const { enzymeWrapper } = setup()
        const components = enzymeWrapper.findWhere(n => {
            return n.props().label === 'Title'
        })

        expect(components).toHaveLength(1)
    })

    it('should render body textfield element', () => {
        const { enzymeWrapper } = setup()
        const components = enzymeWrapper.findWhere(n => {
            return n.props().label === 'Body'
        })

        expect(components).toHaveLength(1)
    })

    it('should render author textfield element', () => {
        const { enzymeWrapper } = setup()
        const components = enzymeWrapper.findWhere(n => {
            return n.props().label === 'Author'
        })

        expect(components).toHaveLength(1)
    })

    it('can handle form validation', () => {
        const { enzymeWrapper } = setup()
        const instance = enzymeWrapper.instance();
        const errors = instance.validate()

        expect(Object.keys(errors)).toHaveLength(4)
    })

    it('should handle submit', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(PostForm).instance().handleSubmit(evt)
    })
})
