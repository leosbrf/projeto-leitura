import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    background: {
        minHeight: '100vh',
        padding: theme.spacing.unit * 2,
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0
    }
})

class MainContent extends Component {
    render() {
        const { classes, children } = this.props;

        return (
            <div className={classes.background}>
                {children}
            </div>
        )
    }
}

export default withStyles(styles)(MainContent);
