import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import VoteScore from './VoteScore'
import { Typography } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUpOutlined'
import ThumbDownIcon from '@material-ui/icons/ThumbDownOutlined'

configure({ adapter: new Adapter() })

describe('<VoteScore />', () => {

    let wrapper
    beforeEach(() => {
        wrapper = shallow(<VoteScore />)
    })

    it('should render ThumbUpIcon element for up vote', () => {
        expect(wrapper.find(ThumbUpIcon)).toHaveLength(1)
    })

    it('should render ThumbDownIcon element for down vote', () => {
        expect(wrapper.find(ThumbDownIcon)).toHaveLength(1)
    })

    it('should render the vote score', () => {
        const voteScore = 2

        wrapper.setProps({ voteScore: voteScore })

        expect(wrapper.contains(
            <Typography variant="caption" color="textSecondary">
                [score: {voteScore}]
            </Typography>
        )).toEqual(true)
        
    })
})

