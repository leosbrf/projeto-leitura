import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter as Router } from 'react-router-dom'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createShallow } from '@material-ui/core/test-utils'
import PostSummary from './PostSummary'

configure({ adapter: new Adapter() })

const setup = () => {
    const props = {
        post: {
            id: 0,
            title: 'dummy',
            category: 'dummy',
            voteScore: 0,
            commentCount: 0
        }
    }

    const wrapper = createShallow()(<Router><PostSummary {...props} /></Router>)

    return {
        props,
        wrapper
    }
}

describe('<PostSummary />', () => {
    let setupProps;
    let shallowWrapper;


    beforeEach(() => {
        const { wrapper, props } = setup()
        shallowWrapper = wrapper
        setupProps = props
    });

    it('should render', () => {
        const div = document.createElement('div')
        ReactDOM.render(shallowWrapper, div)
    });
});