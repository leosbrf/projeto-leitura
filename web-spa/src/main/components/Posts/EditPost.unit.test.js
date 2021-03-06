import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EditPost, mapDispatchToProps, mapStateToProps } from './EditPost'
import store from '../../../store'
import { updatePostRequested, getPostRequested } from '../../../store/modules/posts/actions'

configure({ adapter: new Adapter() })

const setup = () => {
    const props = {
        post: {},
        match: {
            params: { id: 1 }
        },
        onGetPost: jest.fn(),
        onUpdatePost: jest.fn(),
        history: {
            push: jest.fn(),
            goBack: jest.fn()
        }
    }

    const enzymeWrapper = mount(<Provider store={store}><EditPost {...props} /></Provider>)

    return {
        props,
        enzymeWrapper
    }
}

describe('<EditPost />', () => {

    it('should render component', () => {
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
        enzymeWrapper.find(EditPost).instance().handleSubmit(formData)
    })

    it('should handle go back history', () => {

        const evt = {
            preventDefault: jest.fn()
        }

        const { enzymeWrapper } = setup()
        enzymeWrapper.find(EditPost).instance().handleBack(evt)
    })

    it('should map dispatch to props', () => {

        const dispatch = jest.fn();

        mapDispatchToProps(dispatch).onUpdatePost();
        expect(dispatch.mock.calls[0][0]).toEqual(updatePostRequested());
        
        mapDispatchToProps(dispatch).onGetPost();
        expect(dispatch.mock.calls[1][0]).toEqual(getPostRequested());

    })

})
