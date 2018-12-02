import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter as Router } from 'react-router-dom'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Posts } from './Posts'

configure({ adapter: new Adapter() })

const setup = () => {
    const props = {
        posts: [{ id: 1, commentCount: 1 }, { id: 2, commentCount: 1 }],
        isLoading: false,
        classes: {},
        location: {
            search: ''
        },
        onFetchPosts: jest.fn(),
        onVotePost: jest.fn()
    }

    const enzymeWrapper = mount(<Router><Posts {...props} /></Router>)

    return {
        props,
        enzymeWrapper
    }
}

describe('<Posts />', () => {
    it('should render without crash', () => {
        const { enzymeWrapper } = setup()

        const div = document.createElement('div')
        ReactDOM.render(enzymeWrapper, div)
    })

    it('should render loading without crash', () => {
        const { enzymeWrapper } = setup()
        enzymeWrapper.setProps({ isLoading: true })
        const div = document.createElement('div')
        ReactDOM.render(enzymeWrapper, div)
    })

    it('should handle sorting order', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(Posts).instance().handleSortingOrderChanged (evt, 'asc')
    })

    it('should handle vote post', () => {
        const evt = {
            preventDefault: jest.fn()
        }
        const { enzymeWrapper } = setup()
        enzymeWrapper.find(Posts).instance().handleVotePost(evt, 1, 'upVote')
    })
})