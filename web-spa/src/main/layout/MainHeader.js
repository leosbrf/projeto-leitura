import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles, AppBar, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import MenuIcon from '@material-ui/icons/Menu'
import CategoriesDrawer from '../components/Navigation/CategoriesDrawer'
import { fetchAllCategoriesRequested } from '../../store/modules/categories/actions'


const style = theme => ({
  root: {
    position: 'fixed',
    backgroundColor: theme.palette.common.black
  },
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    }
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
})

class MainHeader extends Component {

  state = {
    dark: false,
    openDrawer: false
  }

  componentDidMount() {
    const { onFetchCategories } = this.props

    onFetchCategories()
  }

  handleOnInvertColors = (callBack) => {
    this.setState((prevState) => {
      let type = prevState.dark ? 'light' : 'dark';

      callBack('type')({ attribute: { value: type } });
      return { dark: !prevState.dark }
    })
  }

  handleDrawerOpen = () => {
    this.setState({ openDrawer: true });
  };

  handleDrawerClose = () => {
    this.setState({ openDrawer: false });
  };

  render() {
    const { openDrawer } = this.state
    const { classes, onThemePropsChanged, title, categories } = this.props;
    return (
      <Fragment>
        <AppBar className={classes.root}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, openDrawer && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" color="inherit" className={classes.grow}>{title}</Typography>
            <div className={classes.sectionDesktop}>
              <Tooltip title="Invert Background Color">
                <IconButton color="inherit" onClick={() => this.handleOnInvertColors(onThemePropsChanged)}>
                  <InvertColorsIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
        <CategoriesDrawer categories={categories} open={openDrawer} onHandleDrawerClose={this.handleDrawerClose} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
})

const mapDispatchToProps = dispatch => ({
  onFetchCategories: () => dispatch(fetchAllCategoriesRequested()),
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(MainHeader));