import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { NewPost, mapDispatchToProps } from './NewPost'
import store from '../../../store'
import { addPostRequested } from '../../../store/modules/posts/actions'

configure({ adapter: new Adapter() })

const setup = () => {
    const props = {
        onAddPost: jest.fn(),
        history: {
            push: jest.fn(),
            goBack: jest.fn()
        }
    }

    const enzymeWrapper = mount(<Provider store={store}><NewPost {...props} /></Provider>)

    return {
        props,
        enzymeWrapper
    }
}

describe('<NewPost />', () => {

    it('renders component', () => {
        const { enzymeWrapper } = setup()

        const div = document.createElement('div')
        ReactDOM.render(enzymeWrapper, div)
    })

    it('should handle submit', () => {

        const formData = {
            title: 'title',
            body: 'body',
            author: 'author',
            category: 'category'
        }

        const { enzymeWrapper } = setup()
        enzymeWrapper.find(NewPost).instance().handleSubmit(formData)
    })

    it('should handle go back history', () => {

        const evt = {
            preventDefault: jest.fn()
        }

        const { enzymeWrapper } = setup()
        enzymeWrapper.find(NewPost).instance().handleBack(evt)
    })

    it('should map dispatch to props', () => {

        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).onAddPost();
        expect(dispatch.mock.calls[0][0]).toEqual(addPostRequested());
    })
})
