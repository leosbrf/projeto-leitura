import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined'
import { withStyles } from '@material-ui/core'
import VoteScore from '../Widgets/VoteScore'

const styles = theme => {
    return {
        card: {
            width: 370,
            height: 290,
            margin: theme.spacing.unit
        },
        cardHeader: {
            paddingBottom: 0
        },
        cardActions: {
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            bottomMargin: 'auto'
        },
        voteActions: {
            textAlign: 'center'
        }
    }
}

const PostSummary = (props) => {

    const { classes, post, handleVotePost } = props

    return (
        <Card className={classes.card}>
            <CardHeader
                className={classes.cardHeader}
                component="div"
                title={
                    <Typography variant="overline" noWrap>
                        {post.title}
                    </Typography>
                } />
            <CardContent>
                <Typography variant="caption" color="textSecondary">
                    on {new Date(post.timestamp).toLocaleDateString()}
                </Typography>
                <Typography variant="caption" color="textSecondary" gutterBottom paragraph>
                    {post.author}
                </Typography>
                <Typography variant="body2" gutterBottom paragraph noWrap>
                    {post.body}
                </Typography>
                <Chip label={`#${post.category}`}
                    color="secondary"
                    variant="outlined" />
            </CardContent>
            <CardActions className={classnames(classes.cardActions)}>
                <Button size="small" component={Link} to={{ pathname: `/${post.category}/${post.id}` }}>Read More</Button>
                <div className={classes.voteActions}>
                    <VoteScore
                        id={post.id}
                        voteScore={post.voteScore}
                        handleVote={handleVotePost} />
                </div>
                <Badge
                    color="secondary"
                    badgeContent={post.commentCount}
                    title="Comments"
                    aria-label="Comments">
                    <CommentOutlinedIcon />
                </Badge>
            </CardActions>
        </Card>

    )
}

export default withStyles(styles)(PostSummary)