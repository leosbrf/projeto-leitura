import React, { Fragment } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUpOutlined'
import ThumbDownIcon from '@material-ui/icons/ThumbDownOutlined'

const VoteScore = (props) => {
    const { id, voteScore, handleVote } = props

    return (
        <Fragment>
            <IconButton
                title="Up vote"
                aria-label="Up vote"
                onClick={(e) => handleVote(e, id, 'upVote')}>
                <ThumbUpIcon />
            </IconButton>
            <IconButton
                title="Down vote"
                aria-label="Down vote"
                onClick={(e) => handleVote(e, id, 'downVote')}>
                <ThumbDownIcon />
            </IconButton>
            <Typography variant="caption" color="textSecondary">
                [score: {voteScore}]
            </Typography>
        </Fragment>
    )
}

export default VoteScore