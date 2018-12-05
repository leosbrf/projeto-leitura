import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles, Typography } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { List, ListItem, ListItemText } from '@material-ui/core'

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerTitle: {
        textAlign: 'left'
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
})

const CategoriesDrawer = (props) => {

    const { classes, theme, open, categories, onHandleDrawerClose } = props

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}>
            <div className={classes.drawerHeader}>
                <Typography variant="overline" className={classes.drawerTitle}>Categories</Typography>
                <IconButton onClick={() => onHandleDrawerClose()}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem
                    button
                    key="all"
                    component={Link}
                    to={{ pathname: '/' }}
                    onClick={onHandleDrawerClose}>
                    <ListItemText primary="all" />
                </ListItem>
                {categories.map((category) => (
                    <ListItem
                        button
                        key={category.name}
                        component={Link}
                        to={{
                            pathname: `/${category.name}`
                        }}
                        onClick={onHandleDrawerClose}>
                        <ListItemText primary={category.name} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default withStyles(styles, { withTheme: true })(CategoriesDrawer)