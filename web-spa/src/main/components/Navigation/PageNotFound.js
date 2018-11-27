import React from 'react'
import { withStyles, Typography, Button } from '@material-ui/core';


const styles = theme => {
    return {
        container: {
            top: 64,
            position: 'relative',
            textAlign: 'center'
        }
    }
}

const PageNotFound = (props) => {
    const { classes } = props
    
    return (
        <div className={classes.container}>
            <Typography variant="h3" align="center" color="textSecondary" gutterBottom paragraph>
                Resource not found
            </Typography>
            <Button variant="outlined" color="primary" onClick={() => props.history.goBack()}>
                Back
            </Button>
        </div>
    )
}

export default withStyles(styles)(PageNotFound)