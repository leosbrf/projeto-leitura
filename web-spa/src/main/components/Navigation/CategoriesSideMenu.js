import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => {
    const constrast = theme.palette.getContrastText(theme.palette.background.paper)
    return {
        root: {
            maxHeight: '50vh',
            width: '100%',
            overflow: 'hidden',
            overflowY: 'auto',
            maxWidth: 250,
            backgroundColor: theme.palette.background.paper,
            top: 120,
            position: 'sticky',
            left: '100%',
            borderRadius: '15px',
            borderTop: `1px solid ${constrast}`,
            borderBottom: `1px solid ${constrast}`,
            borderLeft: `1px solid ${constrast}`,
            borderRight: `1px solid ${constrast}`,
            borderColor: constrast,
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            }
        }
    }
};

const CategoriesSideMenu = (props) => {
    const { classes, categories } = props

    let listItems = null

    if (categories && categories.length > 0) {
        listItems = (
            categories.map((category, index) => (
                <Fragment key={category.name}>
                    <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem>
                    {/* <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem>                    <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem>                    <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem>                    <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem>                    <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem>                    <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem>                    <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem>                    <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem>                    <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem>                    <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem>                    <ListItem button>
                        <ListItemText primary={category.name} secondary="5 posts" />
                    </ListItem> */}
                    {index < (categories.length - 1) ? <Divider component="li" /> : null}
                </Fragment>)
            )
        )
    }

    return (
        <div id="categories_side_menu_parent" className={classes.root}>
            <List component="nav">
                <ListItem divider>
                    <ListItemText primary="categories" />
                </ListItem>
                <ListItem button divider={listItems ? true : false}>
                    <ListItemText primary="all" secondary="5 posts" />
                </ListItem>
                {listItems}
            </List>
        </div>
    )
}

CategoriesSideMenu.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoriesSideMenu)
