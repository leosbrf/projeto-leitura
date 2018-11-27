import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { fetchAllPostsRequested, votePostRequested } from '../../state/modules/posts/actions'
import PostSummary from '../components/Posts/PostSummary'
import { withStyles, AppBar, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Toolbar, Tooltip } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import SortIcon from '@material-ui/icons/Sort'

const styles = theme => {
    return {
        posts: {
            position: 'relative',
            marginTop: 54,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: theme.spacing.unit
        },
        toolbar: {
            position: 'sticky',
            top: 64
        },
        fab: {
            position: 'sticky',
            left: '100%',
            bottom: theme.spacing.unit * 8,
            right: theme.spacing.unit * 2
        },
        formControl: {
            margin: theme.spacing.unit,
            minWidth: 120,
        },
        rightIcons: {
            position: 'relative',
            margin: theme.spacing.unit * 2
        },
        progress: {
          margin: theme.spacing.unit * 4,
          textAlign: 'center'
        },
    }
}

class Posts extends Component {

    state = {
        selectedCategory: null,
        sortingAttribute: 'voteScore',
        sortingOrder: 'desc'
    }

    componentDidMount() {
        const { sortingAttribute, sortingOrder } = this.state
        const { onFetchPosts } = this.props

        onFetchPosts(null, sortingAttribute, sortingOrder)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const { sortingAttribute, sortingOrder } = this.state
        const { onFetchPosts } = this.props

        let selectedCategory = this.getSelectedCategory();

        if (prevState.selectedCategory !== selectedCategory) {
            this.setState({ selectedCategory });
            onFetchPosts(selectedCategory, sortingAttribute, sortingOrder)
        }
    }

    getSelectedCategory = () => {
        const { location: { search } } = this.props;

        const queryString = new URLSearchParams(search);
        let selectedCategory = null;
        for (const param of queryString.entries()) {
            if (param[0] === 'category') {
                selectedCategory = param[1];
            }
        }

        return selectedCategory;
    }

    handleSortingAttributeChanged = (event, { props: { value } }) => {
        const { onFetchPosts } = this.props
        const { selectedCategory, sortingOrder } = this.state

        this.setState({ sortingAttribute: value })
        onFetchPosts(selectedCategory, value, sortingOrder)
    }

    handleSortingOrderChanged = (event, sortingOrder) => {
        const { onFetchPosts } = this.props
        const { selectedCategory, sortingAttribute } = this.state

        this.setState({ sortingOrder: sortingOrder })
        onFetchPosts(selectedCategory, sortingAttribute, sortingOrder)
    }

    handleVotePost = (e, id, option) => {
        e.preventDefault()

        const { onVotePost } = this.props

        onVotePost(id, option)
    }

    render() {

        const { sortingAttribute, sortingOrder } = this.state
        const { classes, posts, isLoading } = this.props

        let listItems = 'No posts'

        if (isLoading) {
            return (
              <div className={classnames(classes.posts, classes.progress)}>
                <CircularProgress className={classes.progress} />
              </div>
            )
          }


        if (posts && posts.length > 0) {

            listItems = posts.map(post => (
                <PostSummary
                    key={post.id}
                    post={post}
                    handleVotePost={(e, id, option) => this.handleVotePost(e, id, option)} />
            ))
        }

        return (
            <Fragment>
                <div className={classes.posts}>
                    <AppBar className={classes.toolbar} color="default">
                        <Toolbar className={classes.toolbarFlex}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="sort-by-attribute">Sort by</InputLabel>
                                <Select
                                    value={sortingAttribute}
                                    onChange={this.handleSortingAttributeChanged}
                                    inputProps={{
                                        name: 'sortby',
                                        id: 'sort-by-attribute',
                                    }}>
                                    <MenuItem value={'voteScore'}>vote score</MenuItem>
                                    <MenuItem value={'timestamp'}>date</MenuItem>
                                </Select>
                            </FormControl>
                            <ToggleButtonGroup
                                value={sortingOrder}
                                exclusive
                                onChange={this.handleSortingOrderChanged}
                                className={classes.rightIcons}>
                                <ToggleButton value="asc">
                                    <Tooltip title="Sort Ascending">
                                        <SortIcon style={{ transform: 'rotate(180deg)' }} />
                                    </Tooltip>
                                </ToggleButton>
                                <ToggleButton value="desc">
                                    <Tooltip title="Sort Descending">
                                        <SortIcon />
                                    </Tooltip>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Toolbar>
                    </AppBar>

                    {listItems}
                </div>
                <Button
                    variant="fab"
                    color="primary"
                    className={classes.fab}
                    component={Link}
                    to={{ pathname: '/newpost' }}>ADD</Button>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts.posts,
    isLoading: state.posts.isLoading
})

const mapDispatchToProps = dispatch => ({
    onFetchPosts: (categoryName, sortingAttribute, sortingOrder) => dispatch(fetchAllPostsRequested(categoryName, { sortingAttribute, sortingOrder })),
    onVotePost: (id, vote) => dispatch(votePostRequested(id, vote)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withStyles(styles)(Posts)))
