import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Slide from '@material-ui/core/Slide'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline'
import { withStyles, CardHeader } from '@material-ui/core'
import {
  getPostRequested,
  deletePostRequested,
  votePostRequested,
  addPostCommentRequested,
  updatePostCommentRequested,
  deletePostCommentRequested,
  votePostCommentRequested
} from '../../../store/modules/posts/actions'
import generateId from '../../../shared/util/generateId'
import VoteScore from '../Widgets/VoteScore'

const styles = theme => {
  return {
    container: {
      top: 64,
      position: 'relative'
    },
    margin: {
      margin: theme.spacing.unit * 2
    },
    mainContent: {
      width: '50%',
      maxWidth: 768,
      textAlign: 'center',
      margin: '0 auto 0 auto',
      [theme.breakpoints.down('sm')]: {
        width: '80%'
      }
    },
    card: {
      width: '50%',
      textAlign: 'center',
      margin: 'auto',
      marginBottom: theme.spacing.unit,
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        width: '80%'
      }
    },
    commentHeader: {
      textAlign: 'left'
    },
    content: {
      textAlign: 'left'
    },
    fab: {
      position: 'sticky',
      left: '100%',
      bottom: theme.spacing.unit * 8,
      marginBottom: theme.spacing.unit * 8,
      right: theme.spacing.unit * 2
    },
    fabDelete: {
      position: 'sticky',
      left: '100%',
      bottom: theme.spacing.unit * 16,
      marginBottom: theme.spacing.unit * 24,
      right: theme.spacing.unit * 2
    },
    fabBack: {
      position: 'sticky',
      left: '100%',
      bottom: theme.spacing.unit * 24,
      marginBottom: theme.spacing.unit * 40,
      right: theme.spacing.unit * 2
    },
    avatar: {
      margin: `0 ${theme.spacing.unit * 2}px 0 0`,
    },
    authorRow: {
      display: 'flex',
      alignItems: 'baseline'
    },
    categoryRow: {
      display: 'flex',
      justifyContent: 'center'
    },
    chip: {
      margin: `0 0 ${theme.spacing.unit * 2}px 0`
    },
    formControl: {
      width: '100%'
    },
    appBar: {
      position: 'relative',
      backgroundColor: theme.palette.common.black
    },
    progress: {
      margin: theme.spacing.unit * 4,
      textAlign: 'center'
    },
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export class PostDetails extends Component {

  state = {
    open: false,
    selectedPostComment: null,
    replyCommentId: null
  }

  componentDidMount() {
    const { match: { params }, onGetPost } = this.props

    this.setState({ isLoading: true })
    onGetPost(params.id)
  }

  handleCloseEditCommentDialog = (save) => {

    if (save) {
      const { onUpdatePostComment } = this.props
      const postComment = { ...this.state.selectedPostComment }

      postComment.body = this.editCommentInput.value
      postComment.timestamp = + new Date()

      onUpdatePostComment(postComment)
    }

    this.setState({ open: false, selectedPostComment: null })
  }

  handleBack = (e) => {
    e.preventDefault()

    this.props.history.goBack()
  }

  handleDelete = (e) => {
    e.preventDefault()

    const { post, onDeletePost } = this.props

    onDeletePost(post.id);

    this.props.history.goBack()

  }

  handleAddComment = (e) => {
    e.preventDefault()

    const { replyCommentId } = this.state
    const { post, onAddPostComment } = this.props

    const comment = {
      id: generateId(),
      timestamp: + new Date(),
      body: this.commentInput.value,
      author: post.author, //não existe um "usuário" logado
      parentId: replyCommentId ? replyCommentId : post.id
    }

    this.setState({ replyCommentId: null });

    onAddPostComment(comment)
    this.commentInput.value = ''
  }

  handleCancelComment = (e) => {
    this.setState({ replyCommentId: null });
  }

  handleReplyComment = (e, id) => {
    e.preventDefault()
    this.setState({ replyCommentId: id })
    this.commentInput.focus()
  }

  handleOpenEditCommentDialog = (e, comment) => {
    e.preventDefault()

    this.setState({ open: true, selectedPostComment: comment });

  }

  handleDeleteComment = (e, id) => {
    e.preventDefault()

    const { onDeletePostComment } = this.props

    onDeletePostComment(id)
  }

  handleVotePost = (e, id, option) => {
    e.preventDefault()

    const { onVotePost } = this.props

    onVotePost(id, option)
  }

  handleVoteComment = (e, id, option) => {
    e.preventDefault()

    const { onVotePostComment } = this.props

    onVotePostComment(id, option)
  }

  getAcronym = (str) => {
    if (!str)
      return '';

    return str.match(/\b(\w)/g).join('').toUpperCase()

  }

  renderEmpty(classes) {
    return (
      <Redirect to="/404" />
    )
  }

  renderComments = (comments, classes) => {
    const { post } = this.props
    return (
      comments.map(comment => (
        <Card key={comment.id} className={classes.card}>
          <CardHeader className={classes.commentHeader}
            avatar={
              <Avatar className={classes.avatar}>
                {this.getAcronym(comment.author)}
              </Avatar>
            }
            title={comment.author}
            subheader={
              `Commented on ${new Date(comment.timestamp).toLocaleDateString()} 
              ${comment.parentId === post.id
                ? ''
                : `Replying to ${post.comments[comment.parentId].author}.`}`
            }
          />

          <CardContent className={classes.content}>
            <Typography>
              {comment.body}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'space-between' }}>
            <div>
              <IconButton
                className={classes.margin}
                title="Reply"
                aria-label="Reply Comment"
                onClick={(e) => this.handleReplyComment(e, comment.id)}>
                <ReplyOutlinedIcon />
              </IconButton>
              <IconButton
                className={classes.margin}
                title="Edit"
                aria-label="Edit Comment"
                onClick={(e) => this.handleOpenEditCommentDialog(e, comment)}>
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                className={classes.margin}
                title="Delete"
                aria-label="Delete Comment"
                onClick={(e) => this.handleDeleteComment(e, comment.id)}>
                <DeleteOutlinedIcon />
              </IconButton>
            </div>

            <div>
              <VoteScore
                id={comment.id}
                voteScore={comment.voteScore}
                handleVote={this.handleVoteComment} />
            </div>
          </CardActions>
        </Card>
      ))
    )
  }

  render() {
    const { open, selectedPostComment, replyCommentId } = this.state
    const { classes, post, postNotFound, isLoading } = this.props

    if (postNotFound) {
      return this.renderEmpty(classes)
    }

    if (isLoading) {
      return (
        <div className={classnames(classes.container, classes.progress)}>
          <CircularProgress className={classes.progress} />
        </div>
      )
    }

    if (!post)
      return null

    const comments = Object.values(post.comments)

    return (
      <Fragment>
        <div className={classes.container}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography variant="overline" gutterBottom paragraph align="center">
                {post.title}
              </Typography>
              <div className={classes.authorRow}>
                <Avatar className={classes.avatar}>
                  {this.getAcronym(post.author)}
                </Avatar>
                <Typography variant="caption" color="textSecondary" gutterBottom paragraph>
                  {post.author}. Posted on {new Date(post.timestamp).toLocaleDateString()}.
              </Typography>
              </div>

              <div className={classes.categoryRow}>
                <Chip label={`#${post.category}`} className={classes.chip} color="secondary" variant="outlined" />
              </div>
              <Typography variant="body2">
                {post.body}
              </Typography>
            </CardContent>
            <CardActions>
              <VoteScore
                id={post.id}
                voteScore={post.voteScore}
                handleVote={this.handleVotePost} />
            </CardActions>
          </Card>

          <Typography className={classes.margin} variant="h6" align="center" gutterBottom paragraph>
            Comments
        </Typography>

          <form autoComplete="off">
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <TextField
                  id="comment_input"
                  className={classes.formControl}
                  margin="normal"
                  variant="outlined"
                  required
                  multiline
                  rows={4}
                  inputRef={node => (this.commentInput = node)} />
              </CardContent>
              <CardActions style={{ display: 'flex', justifyContent: 'center' }}>

                {replyCommentId ?
                  <Fragment>
                    <Typography variant="caption" color="textSecondary">
                      Replying to {post.comments[replyCommentId].author}
                    </Typography>
                    <Button
                      className={classes.margin}
                      variant="outlined"
                      size="medium"
                      color="default"
                      onClick={(e) => this.handleCancelComment(e)}>
                      Cancel
                  </Button>
                  </Fragment>
                  : null}

                <Button
                  className={classes.margin}
                  variant="outlined"
                  size="medium"
                  color="primary"
                  onClick={(e) => this.handleAddComment(e)}>
                  Comment
              </Button>
              </CardActions>
            </Card>
          </form>

          {this.renderComments(comments, classes)}

          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleCloseEditCommentDialog}
            TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleCloseEditCommentDialog} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.flex}>
                  Comment
              </Typography>
              </Toolbar>
            </AppBar>

            <div className={classnames(classes.mainContent, classes.margin)}>
              <TextField
                id="comment_input"
                className={classes.formControl}
                margin="normal"
                variant="outlined"
                defaultValue={open && selectedPostComment ? selectedPostComment.body : ''}
                required
                multiline
                rows={4}
                inputRef={node => (this.editCommentInput = node)}
              />

              <Button
                variant="outlined"
                color="primary"
                size="medium"
                className={classes.fab}
                onClick={(e) => this.handleCloseEditCommentDialog(true)} >Save</Button>
            </div>
          </Dialog>

        </div>
        <Button
          variant="fab"
          color="default"
          className={classes.fabBack}
          onClick={(e) => this.handleBack(e)}>Back</Button>
        <Button
          variant="fab"
          color="secondary"
          className={classes.fabDelete}
          onClick={(e) => this.handleDelete(e)}> Del </Button>
        <Button
          variant="fab"
          color="primary"
          className={classes.fab}
          component={Link}
          to={{ pathname: `/post/${post.id}/edit` }} >Edit</Button>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.posts.post,
  postNotFound: state.posts.postNotFound,
  isLoading: state.posts.isLoading
})

const mapDispatchToProps = dispatch => {
  return {
    onGetPost: (id) => dispatch(getPostRequested(id)),
    onVotePost: (id, vote) => dispatch(votePostRequested(id, vote)),
    onDeletePost: (id) => (dispatch(deletePostRequested(id))),
    onAddPostComment: (comment) => dispatch(addPostCommentRequested(comment)),
    onUpdatePostComment: (comment) => dispatch(updatePostCommentRequested(comment)),
    onDeletePostComment: (comment) => dispatch(deletePostCommentRequested(comment)),
    onVotePostComment: (id, vote) => dispatch(votePostCommentRequested(id, vote))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostDetails))
